const express = require('express');
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

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

router.delete('/testimonials/:id', (req, res) => {
  const t = db.prepare(
    'SELECT id FROM testimonials WHERE id = ? AND business_id = ?'
  ).get(req.params.id, req.businessId);
  if (!t) return res.status(404).json({ error: 'Testimonial not found' });

  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
