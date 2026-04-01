const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Resend } = require('resend');
const db = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const router = express.Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin-change-me';

function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ error: 'Forbidden' });
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.post('/login', (req, res) => {
  const { password } = req.body || {};
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

router.get('/businesses', adminAuth, (req, res) => {
  const businesses = db.prepare(`
    SELECT
      b.id, b.name, b.email, b.slug, b.plan, b.created_at,
      COUNT(t.id) AS total_testimonials,
      SUM(CASE WHEN t.status = 'approved' THEN 1 ELSE 0 END) AS approved,
      SUM(CASE WHEN t.status = 'pending' THEN 1 ELSE 0 END) AS pending
    FROM businesses b
    LEFT JOIN testimonials t ON t.business_id = b.id
    GROUP BY b.id
    ORDER BY b.created_at DESC
  `).all();
  res.json(businesses);
});

router.put('/businesses/:id/plan', adminAuth, (req, res) => {
  const { plan } = req.body || {};
  if (!['free', 'paid'].includes(plan)) {
    return res.status(400).json({ error: 'Plan must be free or paid' });
  }
  const b = db.prepare('SELECT id FROM businesses WHERE id = ?').get(req.params.id);
  if (!b) return res.status(404).json({ error: 'Business not found' });
  db.prepare('UPDATE businesses SET plan = ? WHERE id = ?').run(plan, req.params.id);
  res.json({ success: true });
});

// Outreach: get stats
router.get('/outreach', adminAuth, (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as count FROM outreach_emails').get().count;
  const unsubscribed = db.prepare('SELECT COUNT(*) as count FROM outreach_emails WHERE unsubscribed = 1').get().count;
  const recent = db.prepare('SELECT email, business_name, sent_at, unsubscribed FROM outreach_emails ORDER BY sent_at DESC LIMIT 50').all();
  res.json({ total, unsubscribed, recent });
});

// Outreach: send bulk emails from JSON array [{ email, business_name }]
router.post('/outreach/send', adminAuth, async (req, res) => {
  if (!resend) return res.status(503).json({ error: 'Email service not configured' });

  const { contacts, subject, body } = req.body || {};
  if (!contacts?.length) return res.status(400).json({ error: 'No contacts provided' });
  if (!subject || !body) return res.status(400).json({ error: 'Subject and body are required' });

  const appUrl = process.env.APP_URL || 'https://get-fimi.com';
  let sent = 0;
  let skipped = 0;

  for (const contact of contacts) {
    const email = contact.email?.trim().toLowerCase();
    if (!email) continue;

    // Skip already contacted or unsubscribed
    const existing = db.prepare('SELECT unsubscribed FROM outreach_emails WHERE email = ?').get(email);
    if (existing) { skipped++; continue; }

    const token = crypto.randomBytes(24).toString('hex');
    const unsubscribeUrl = `${appUrl}/unsubscribe/${token}`;
    const personalizedBody = body.replace(/\{\{name\}\}/g, contact.business_name || 'there');

    try {
      await resend.emails.send({
        from: 'Panos from Fimi <onboarding@resend.dev>',
        to: email,
        subject,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
            <div style="white-space:pre-wrap;color:#374151;font-size:15px;line-height:1.7">${personalizedBody}</div>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0" />
            <p style="color:#9ca3af;font-size:11px">
              You're receiving this because you run a business that could benefit from customer reviews.
              <a href="${unsubscribeUrl}" style="color:#9ca3af">Unsubscribe</a>
            </p>
          </div>
        `,
      });
      db.prepare('INSERT INTO outreach_emails (email, business_name, unsubscribe_token) VALUES (?, ?, ?)').run(email, contact.business_name || null, token);
      sent++;
    } catch (err) {
      console.error(`Outreach email error for ${email}:`, err.message);
    }

    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  res.json({ sent, skipped });
});

module.exports = { router, adminAuth };
