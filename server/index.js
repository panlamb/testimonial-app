const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
const { Resend } = require('resend');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/collect', require('./routes/collect'));
app.use('/api/wall', require('./routes/wall'));
app.use('/widget', require('./routes/widget'));
app.use('/badge', require('./routes/badge'));
app.use('/api/admin', require('./routes/admin').router);
app.use('/api/tools', require('./routes/tools'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

// Unsubscribe from outreach emails
app.get('/unsubscribe/:token', (req, res) => {
  const row = db.prepare('SELECT id FROM outreach_emails WHERE unsubscribe_token = ?').get(req.params.token);
  if (row) db.prepare('UPDATE outreach_emails SET unsubscribed = 1 WHERE id = ?').run(row.id);
  res.send(`
    <html><body style="font-family:sans-serif;text-align:center;padding:80px 24px;background:#f9fafb">
      <h2 style="color:#1e1b4b">You've been unsubscribed</h2>
      <p style="color:#6b7280">You won't receive any more emails from Fimi.</p>
    </body></html>
  `);
});

// Serve built React app in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'client', 'dist');
  const fs = require('fs');
  app.use(express.static(distPath));

  // Dynamic OG meta tags for wall pages
  app.get('/wall/:slug', (req, res) => {
    const business = db.prepare(
      'SELECT name, brand_name, brand_logo_url, slug FROM businesses WHERE slug = ?'
    ).get(req.params.slug);

    if (!business) return res.sendFile(path.join(distPath, 'index.html'));

    const displayName = business.brand_name || business.name;
    const appUrl = process.env.APP_URL || 'https://get-fimi.com';
    const wallUrl = `${appUrl}/wall/${business.slug}`;
    const ogImage = business.brand_logo_url || `${appUrl}/OG.png`;

    let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
    html = html.replace(
      '<title>Fimi — Collect Customer Reviews & Build Social Proof</title>',
      `<title>${displayName} — Wall of Love</title>`
    ).replace(
      '<meta property="og:title" content="Fimi — Collect Customer Reviews & Build Social Proof" />',
      `<meta property="og:title" content="${displayName} — Wall of Love" />`
    ).replace(
      '<meta property="og:description" content="Collect testimonials, display them on your website, and handle negative reviews privately — before any damage is done. Free plan available." />',
      `<meta property="og:description" content="See what customers are saying about ${displayName}." />`
    ).replace(
      `<meta property="og:url" content="${appUrl}" />`,
      `<meta property="og:url" content="${wallUrl}" />`
    ).replace(
      `<meta property="og:image" content="${appUrl}/OG.png" />`,
      `<meta property="og:image" content="${ogImage}" />`
    );

    res.send(html);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Daily check at 09:00 for trials expiring in 10 days
cron.schedule('0 9 * * *', async () => {
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  if (!resend) return;

  const now = new Date();
  const in10Days = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);

  const expiring = db.prepare(`
    SELECT id, name, email, trial_ends_at FROM businesses
    WHERE trial_notified = 0
      AND trial_ends_at IS NOT NULL
      AND trial_ends_at <= ?
      AND trial_ends_at >= ?
  `).all(in10Days.toISOString(), now.toISOString());

  if (expiring.length === 0) return;

  const rows = expiring.map((b) => {
    const daysLeft = Math.ceil((new Date(b.trial_ends_at) - now) / (1000 * 60 * 60 * 24));
    return `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${b.name}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${b.email}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${daysLeft}</td>
    </tr>`;
  }).join('');

  await resend.emails.send({
    from: 'Fimi <onboarding@resend.dev>',
    to: 'panos.lambrakis@gmail.com',
    subject: `${expiring.length} trial(s) expiring in 10 days`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#f9fafb;border-radius:12px">
        <h2 style="margin:0 0 8px;color:#1e1b4b">Trials expiring soon</h2>
        <p style="color:#6b7280;margin:0 0 24px">The following users have 10 or fewer days left on their free trial:</p>
        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb">
          <thead>
            <tr style="background:#f3f4f6">
              <th style="padding:10px 12px;text-align:left;font-size:13px;color:#374151">Business</th>
              <th style="padding:10px 12px;text-align:left;font-size:13px;color:#374151">Email</th>
              <th style="padding:10px 12px;text-align:center;font-size:13px;color:#374151">Days left</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <a href="https://get-fimi.com/admin/dashboard" style="display:inline-block;margin-top:24px;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">
          Admin Dashboard →
        </a>
      </div>
    `,
  }).catch((err) => console.error('Trial notification error:', err));

  // Mark as notified
  const ids = expiring.map((b) => b.id);
  db.prepare(`UPDATE businesses SET trial_notified = 1 WHERE id IN (${ids.map(() => '?').join(',')})`).run(...ids);

  console.log(`Trial expiry notification sent for ${expiring.length} user(s)`);
});

// Weekly digest — every Monday at 9:00
cron.schedule('0 9 * * 1', async () => {
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  if (!resend) return;

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const businesses = db.prepare('SELECT id, name, email, slug FROM businesses').all();

  for (const biz of businesses) {
    const newTestimonials = db.prepare(
      "SELECT COUNT(*) as count FROM testimonials WHERE business_id = ? AND created_at >= ?"
    ).get(biz.id, since).count;

    const newApproved = db.prepare(
      "SELECT COUNT(*) as count FROM testimonials WHERE business_id = ? AND status = 'approved' AND created_at >= ?"
    ).get(biz.id, since).count;

    const privateComplaints = db.prepare(
      "SELECT COUNT(*) as count FROM testimonials WHERE business_id = ? AND status = 'pending' AND rating <= 2 AND created_at >= ?"
    ).get(biz.id, since).count;

    const totalApproved = db.prepare(
      "SELECT COUNT(*) as count FROM testimonials WHERE business_id = ? AND status = 'approved'"
    ).get(biz.id).count;

    const widgetViews = db.prepare(
      "SELECT COUNT(*) as count FROM page_views WHERE business_id = ? AND page_type = 'widget' AND created_at >= ?"
    ).get(biz.id, since).count;

    // Only send if there was activity
    if (newTestimonials === 0 && widgetViews === 0) continue;

    const appUrl = process.env.APP_URL || 'https://get-fimi.com';

    await resend.emails.send({
      from: 'Fimi <onboarding@resend.dev>',
      to: biz.email,
      subject: `Your Fimi week${newTestimonials > 0 ? ` — ${newTestimonials} new review${newTestimonials !== 1 ? 's' : ''}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f9fafb;border-radius:12px">
          <h2 style="margin:0 0 4px;color:#1e1b4b">Your week on Fimi</h2>
          <p style="color:#6b7280;margin:0 0 24px;font-size:14px">Here's what happened in the last 7 days for ${biz.name}</p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px">
            ${[
              { label: 'New reviews', value: newTestimonials, color: '#4f46e5' },
              { label: 'Newly approved', value: newApproved, color: '#059669' },
              { label: 'Total approved', value: totalApproved, color: '#111827' },
              { label: 'Private complaints', value: privateComplaints, color: privateComplaints > 0 ? '#dc2626' : '#6b7280' },
            ].map(s => `
              <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;text-align:center">
                <div style="font-size:28px;font-weight:700;color:${s.color}">${s.value}</div>
                <div style="font-size:12px;color:#6b7280;margin-top:4px">${s.label}</div>
              </div>
            `).join('')}
          </div>

          ${privateComplaints > 0 ? `
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin-bottom:24px">
            <p style="margin:0;color:#dc2626;font-size:14px;font-weight:600">
              ⚠️ You have ${privateComplaints} private complaint${privateComplaints !== 1 ? 's' : ''} waiting for your response.
            </p>
          </div>` : ''}

          <a href="${appUrl}/dashboard" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
            Open Dashboard →
          </a>

          <p style="color:#9ca3af;font-size:11px;margin-top:24px">
            You're receiving this because you have a Fimi account.
            <a href="${appUrl}/dashboard" style="color:#9ca3af">Manage email preferences</a>
          </p>
        </div>
      `,
    }).catch((err) => console.error(`Weekly digest error for ${biz.email}:`, err));
  }

  console.log(`Weekly digest sent`);
});

app.listen(PORT, () => {
  console.log(`\n  TestimonialApp server running at http://localhost:${PORT}\n`);
});
