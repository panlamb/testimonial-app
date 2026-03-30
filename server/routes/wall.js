const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:slug', (req, res) => {
  const business = db.prepare(
    'SELECT id, name, slug, plan, brand_name, brand_logo_url FROM businesses WHERE slug = ?'
  ).get(req.params.slug);
  if (!business) return res.status(404).json({ error: 'Page not found' });
  db.prepare('INSERT INTO page_views (business_id, page_type) VALUES (?, ?)').run(business.id, 'wall');

  let testimonials = db.prepare(
    `SELECT id, customer_name, review_text, rating, screenshot_url, created_at
     FROM testimonials WHERE business_id = ? AND status = 'approved'
     ORDER BY created_at DESC`
  ).all(business.id);

  if (business.plan === 'free') {
    testimonials = testimonials.slice(0, 3);
  }

  res.json({
    business: { name: business.name, slug: business.slug, plan: business.plan, brand_name: business.brand_name, brand_logo_url: business.brand_logo_url },
    testimonials,
  });
});

module.exports = router;
