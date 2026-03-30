const express = require('express');
const { Resend } = require('resend');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const router = express.Router();
router.use(authMiddleware);

router.get('/me', (req, res) => {
  const business = db.prepare(
    'SELECT id, name, email, slug, plan, brand_name, brand_logo_url, widget_settings, created_at FROM businesses WHERE id = ?'
  ).get(req.businessId);
  if (!business) return res.status(404).json({ error: 'Not found' });
  business.widget_settings = business.widget_settings ? JSON.parse(business.widget_settings) : null;
  res.json(business);
});

router.put('/widget-settings', (req, res) => {
  const allowed = ['cardBg', 'textColor', 'nameColor', 'starsColor', 'borderColor'];
  const settings = {};
  for (const key of allowed) {
    if (req.body?.[key]) settings[key] = req.body[key];
  }
  db.prepare('UPDATE businesses SET widget_settings = ? WHERE id = ?')
    .run(JSON.stringify(settings), req.businessId);
  res.json({ success: true });
});

router.put('/branding', (req, res) => {
  const { brand_name, brand_logo_url } = req.body || {};
  db.prepare(
    'UPDATE businesses SET brand_name = ?, brand_logo_url = ? WHERE id = ?'
  ).run(brand_name?.trim() || null, brand_logo_url?.trim() || null, req.businessId);
  res.json({ success: true });
});

router.get('/testimonials', (req, res) => {
  const rows = db.prepare(
    'SELECT * FROM testimonials WHERE business_id = ? ORDER BY created_at DESC'
  ).all(req.businessId);
  res.json(rows);
});

router.put('/testimonials/:id/status', (req, res) => {
  const { status } = req.body || {};
  const valid = ['pending', 'approved', 'rejected', 'hidden'];
  if (!valid.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const t = db.prepare(
    'SELECT id FROM testimonials WHERE id = ? AND business_id = ?'
  ).get(req.params.id, req.businessId);
  if (!t) return res.status(404).json({ error: 'Testimonial not found' });

  db.prepare('UPDATE testimonials SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});

router.get('/analytics', (req, res) => {
  const views = db.prepare(`
    SELECT page_type, COUNT(*) as count FROM page_views
    WHERE business_id = ? GROUP BY page_type
  `).all(req.businessId);

  const viewMap = Object.fromEntries(views.map((v) => [v.page_type, v.count]));

  const submissions = db.prepare(
    'SELECT COUNT(*) as count FROM testimonials WHERE business_id = ?'
  ).get(req.businessId).count;

  const approved = db.prepare(
    "SELECT COUNT(*) as count FROM testimonials WHERE business_id = ? AND status = 'approved'"
  ).get(req.businessId).count;

  const collectViews = viewMap.collect || 0;

  res.json({
    collect_views: collectViews,
    wall_views: viewMap.wall || 0,
    widget_loads: viewMap.widget || 0,
    submissions,
    approved,
    conversion_rate: collectViews > 0 ? Math.round((submissions / collectViews) * 100) : 0,
  });
});

router.post('/request-review', async (req, res) => {
  if (!resend) return res.status(503).json({ error: 'Email service not configured' });

  const { customer_email, customer_name } = req.body || {};
  if (!customer_email) return res.status(400).json({ error: 'Customer email is required' });

  const business = db.prepare(
    'SELECT name, slug, brand_name FROM businesses WHERE id = ?'
  ).get(req.businessId);

  const brandName = business.brand_name || business.name;
  const collectUrl = `${req.protocol}://${req.get('host')}/collect/${business.slug}`;
  const greeting = customer_name ? `Hi ${customer_name},` : 'Hi,';

  try {
    await resend.emails.send({
      from: 'Fimi <onboarding@resend.dev>',
      to: customer_email,
      subject: `How was your experience with ${brandName}?`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f9fafb;border-radius:12px">
          <h2 style="margin:0 0 16px;color:#1e1b4b">${brandName}</h2>
          <p style="color:#374151;margin:0 0 12px">${greeting}</p>
          <p style="color:#374151;margin:0 0 24px">
            Thank you for choosing ${brandName}. We'd love to hear about your experience —
            it only takes 30 seconds and helps us a lot.
          </p>
          <a href="${collectUrl}" style="background:#4f46e5;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;display:inline-block;font-size:16px">
            Leave a review →
          </a>
          <p style="color:#9ca3af;font-size:12px;margin-top:32px">
            You received this email because you interacted with ${brandName}.<br/>
            If you don't want to leave a review, simply ignore this email.
          </p>
        </div>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Review request email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

router.delete('/testimonials/:id', (req, res) => {
  const t = db.prepare(
    'SELECT id FROM testimonials WHERE id = ? AND business_id = ?'
  ).get(req.params.id, req.businessId);
  if (!t) return res.status(404).json({ error: 'Testimonial not found' });

  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
