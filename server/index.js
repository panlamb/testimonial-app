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

// Contact form — simple rate limit (5 per IP per hour, in-memory)
const contactHits = new Map();
app.post('/api/contact', async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const hits = (contactHits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  if (hits.length >= 5) return res.status(429).json({ error: 'Too many messages. Try again later.' });
  contactHits.set(ip, [...hits, now]);

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  if (!resend) return res.status(500).json({ error: 'Email not configured' });

  await resend.emails.send({
    from: 'Fimi <hello@get-fimi.com>',
    to: 'panos.lambrakis@gmail.com',
    replyTo: email,
    subject: `[Fimi Contact] ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f9fafb;border-radius:12px">
        <h2 style="margin:0 0 16px;color:#1e1b4b">New contact message</h2>
        <p style="margin:0 0 6px;color:#374151"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
        <p style="color:#374151;white-space:pre-wrap;line-height:1.7">${message}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
        <p style="color:#9ca3af;font-size:12px">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  }).catch((err) => console.error('Contact email error:', err));

  res.json({ ok: true });
});

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

// Daily check at 09:00 for trials
cron.schedule('0 9 * * *', async () => {
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  if (!resend) return;

  const appUrl = process.env.APP_URL || 'https://get-fimi.com';
  const now = new Date();
  const in10Days = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  // --- Admin notification: trials entering 10-day window ---
  const expiringAdmin = db.prepare(`
    SELECT id, name, email, trial_ends_at FROM businesses
    WHERE trial_notified = 0
      AND trial_ends_at IS NOT NULL
      AND trial_ends_at <= ?
      AND trial_ends_at >= ?
  `).all(in10Days.toISOString(), now.toISOString());

  if (expiringAdmin.length > 0) {
    const rows = expiringAdmin.map((b) => {
      const daysLeft = Math.ceil((new Date(b.trial_ends_at) - now) / (1000 * 60 * 60 * 24));
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${b.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${b.email}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${daysLeft}</td>
      </tr>`;
    }).join('');

    await resend.emails.send({
      from: 'Fimi <hello@get-fimi.com>',
      to: 'panos.lambrakis@gmail.com',
      subject: `${expiringAdmin.length} trial(s) expiring in ≤10 days`,
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
          <a href="${appUrl}/admin/dashboard" style="display:inline-block;margin-top:24px;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">
            Admin Dashboard →
          </a>
        </div>
      `,
    }).catch((err) => console.error('Admin trial notification error:', err));

    const ids = expiringAdmin.map((b) => b.id);
    db.prepare(`UPDATE businesses SET trial_notified = 1 WHERE id IN (${ids.map(() => '?').join(',')})`).run(...ids);
    console.log(`Admin trial expiry notification sent for ${expiringAdmin.length} user(s)`);
  }

  // --- User notification: 10-day warning (trial_user_notified = 0 → 1) ---
  const warn10 = db.prepare(`
    SELECT id, name, email, trial_ends_at FROM businesses
    WHERE trial_user_notified = 0
      AND trial_ends_at IS NOT NULL
      AND trial_ends_at <= ?
      AND trial_ends_at > ?
  `).all(in10Days.toISOString(), in3Days.toISOString());

  for (const b of warn10) {
    const daysLeft = Math.ceil((new Date(b.trial_ends_at) - now) / (1000 * 60 * 60 * 24));
    await resend.emails.send({
      from: 'Fimi <hello@get-fimi.com>',
      to: b.email,
      subject: `Your Fimi trial ends in ${daysLeft} days`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f9fafb;border-radius:12px">
          <h2 style="margin:0 0 8px;color:#1e1b4b">Your trial is ending soon</h2>
          <p style="color:#374151;margin:0 0 16px">Hi ${b.name},</p>
          <p style="color:#374151;margin:0 0 16px">
            Your Fimi Pro trial ends in <strong>${daysLeft} days</strong>. After that, your account will move to the free plan — you won't lose your reviews, but some Pro features will be paused.
          </p>
          <p style="color:#374151;margin:0 0 24px">
            To keep collecting testimonials without interruption, upgrade before your trial ends.
          </p>
          <a href="${appUrl}/pricing" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
            Upgrade to Pro →
          </a>
          <p style="color:#9ca3af;font-size:12px;margin-top:32px">
            You're receiving this because you have a Fimi account at ${b.email}.<br>
            <a href="${appUrl}/dashboard" style="color:#9ca3af">Manage your account</a>
          </p>
        </div>
      `,
    }).catch((err) => console.error(`10-day trial email error for ${b.email}:`, err));
    db.prepare('UPDATE businesses SET trial_user_notified = 1 WHERE id = ?').run(b.id);
  }
  if (warn10.length) console.log(`10-day trial warning sent to ${warn10.length} user(s)`);

  // --- User notification: 3-day warning (trial_user_notified = 1 → 2) ---
  const warn3 = db.prepare(`
    SELECT id, name, email, trial_ends_at FROM businesses
    WHERE trial_user_notified = 1
      AND trial_ends_at IS NOT NULL
      AND trial_ends_at <= ?
      AND trial_ends_at > ?
  `).all(in3Days.toISOString(), now.toISOString());

  for (const b of warn3) {
    const daysLeft = Math.ceil((new Date(b.trial_ends_at) - now) / (1000 * 60 * 60 * 24));
    await resend.emails.send({
      from: 'Fimi <hello@get-fimi.com>',
      to: b.email,
      subject: `Only ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left on your Fimi trial`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f9fafb;border-radius:12px">
          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:14px 16px;margin-bottom:24px">
            <p style="margin:0;color:#92400e;font-weight:600;font-size:14px">⏰ ${daysLeft} day${daysLeft !== 1 ? 's' : ''} remaining on your trial</p>
          </div>
          <h2 style="margin:0 0 8px;color:#1e1b4b">Last chance to upgrade</h2>
          <p style="color:#374151;margin:0 0 16px">Hi ${b.name},</p>
          <p style="color:#374151;margin:0 0 16px">
            Your Fimi Pro trial expires in <strong>${daysLeft} day${daysLeft !== 1 ? 's' : ''}</strong>. Don't lose access to:
          </p>
          <ul style="color:#374151;margin:0 0 24px;padding-left:20px;line-height:1.8">
            <li>Unlimited review collection</li>
            <li>Embeddable widget for your website</li>
            <li>Private handling of negative reviews</li>
            <li>AI-powered replies and summaries</li>
            <li>Webhook integrations (Zapier, Make, n8n)</li>
          </ul>
          <a href="${appUrl}/pricing" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
            Upgrade now →
          </a>
          <p style="color:#9ca3af;font-size:12px;margin-top:32px">
            You're receiving this because you have a Fimi account at ${b.email}.<br>
            <a href="${appUrl}/dashboard" style="color:#9ca3af">Manage your account</a>
          </p>
        </div>
      `,
    }).catch((err) => console.error(`3-day trial email error for ${b.email}:`, err));
    db.prepare('UPDATE businesses SET trial_user_notified = 2 WHERE id = ?').run(b.id);
  }
  if (warn3.length) console.log(`3-day trial warning sent to ${warn3.length} user(s)`);

  // --- User notification: expired (trial_user_notified = 2 → 3) ---
  const expired = db.prepare(`
    SELECT id, name, email, trial_ends_at FROM businesses
    WHERE trial_user_notified = 2
      AND trial_ends_at IS NOT NULL
      AND trial_ends_at < ?
  `).all(now.toISOString());

  for (const b of expired) {
    await resend.emails.send({
      from: 'Fimi <hello@get-fimi.com>',
      to: b.email,
      subject: 'Your Fimi trial has ended',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f9fafb;border-radius:12px">
          <h2 style="margin:0 0 8px;color:#1e1b4b">Your trial has ended</h2>
          <p style="color:#374151;margin:0 0 16px">Hi ${b.name},</p>
          <p style="color:#374151;margin:0 0 16px">
            Your Fimi Pro trial has expired. Your account is now on the free plan — your existing reviews are safe and your Wall of Love page is still live.
          </p>
          <p style="color:#374151;margin:0 0 24px">
            Upgrade to Pro any time to resume full access to widgets, AI features, and integrations.
          </p>
          <a href="${appUrl}/pricing" style="display:inline-block;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px">
            See pricing →
          </a>
          <p style="color:#9ca3af;font-size:12px;margin-top:32px">
            You're receiving this because you have a Fimi account at ${b.email}.<br>
            <a href="${appUrl}/dashboard" style="color:#9ca3af">Manage your account</a>
          </p>
        </div>
      `,
    }).catch((err) => console.error(`Expired trial email error for ${b.email}:`, err));
    db.prepare('UPDATE businesses SET trial_user_notified = 3 WHERE id = ?').run(b.id);
  }
  if (expired.length) console.log(`Trial expired email sent to ${expired.length} user(s)`);
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
      from: 'Fimi <hello@get-fimi.com>',
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
