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

// Serve built React app in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(distPath));
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
        <a href="https://testimonial-app-production.up.railway.app/admin/dashboard" style="display:inline-block;margin-top:24px;background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">
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

app.listen(PORT, () => {
  console.log(`\n  TestimonialApp server running at http://localhost:${PORT}\n`);
});
