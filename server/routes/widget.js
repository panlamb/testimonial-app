const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:slug.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'public, max-age=60');

  const business = db.prepare(
    'SELECT id, name, slug, plan FROM businesses WHERE slug = ?'
  ).get(req.params.slug);

  if (!business) {
    return res.send('console.error("[TestimonialApp] Widget: business not found");');
  }

  let testimonials = db.prepare(
    `SELECT customer_name, review_text, rating, screenshot_url, created_at
     FROM testimonials WHERE business_id = ? AND status = 'approved'
     ORDER BY created_at DESC`
  ).all(business.id);

  if (business.plan === 'free') {
    testimonials = testimonials.slice(0, 3);
  }

  const showBadge = business.plan === 'free';
  const origin = `${req.protocol}://${req.get('host')}`;

  // Resolve screenshot URLs to absolute
  testimonials = testimonials.map(t => ({
    ...t,
    screenshot_url: t.screenshot_url ? `${origin}${t.screenshot_url}` : null,
  }));

  const payload = JSON.stringify({ business: { name: business.name, slug: business.slug }, testimonials, showBadge });

  res.send(`
(function () {
  var _tw = ${payload};

  var style = document.createElement('style');
  style.textContent = [
    '.tw-wrap{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:20px;box-sizing:border-box}',
    '.tw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}',
    '.tw-card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.06)}',
    '.tw-stars{color:#f59e0b;font-size:18px;letter-spacing:2px;margin-bottom:8px}',
    '.tw-text{color:#374151;font-size:14px;line-height:1.6;margin:0 0 12px}',
    '.tw-name{font-weight:600;color:#111827;font-size:14px}',
    '.tw-img{width:100%;border-radius:8px;margin-bottom:12px;max-height:200px;object-fit:cover}',
    '.tw-badge{text-align:center;margin-top:16px;font-size:11px;color:#9ca3af}',
    '.tw-badge a{color:#6b7280;text-decoration:none}',
    '.tw-empty{text-align:center;color:#9ca3af;padding:40px 20px}',
  ].join('');
  document.head.appendChild(style);

  function esc(s) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(s));
    return d.innerHTML;
  }

  function stars(n) {
    var s = '';
    for (var i = 1; i <= 5; i++) s += i <= n ? '★' : '☆';
    return s;
  }

  var target = document.querySelector('[data-testimonial-widget="${req.params.slug}"]')
    || document.getElementById('testimonial-widget');
  if (!target) { target = document.createElement('div'); document.body.appendChild(target); }

  var html = '<div class="tw-wrap">';
  if (!_tw.testimonials.length) {
    html += '<div class="tw-empty">No testimonials yet.</div>';
  } else {
    html += '<div class="tw-grid">';
    _tw.testimonials.forEach(function (t) {
      html += '<div class="tw-card">';
      if (t.screenshot_url) html += '<img class="tw-img" src="' + esc(t.screenshot_url) + '" alt="" />';
      html += '<div class="tw-stars">' + stars(t.rating) + '</div>';
      html += '<p class="tw-text">&ldquo;' + esc(t.review_text) + '&rdquo;</p>';
      html += '<div class="tw-name">&mdash; ' + esc(t.customer_name) + '</div>';
      html += '</div>';
    });
    html += '</div>';
  }
  if (_tw.showBadge) {
    html += '<div class="tw-badge">Powered by <a href="#" target="_blank">TestimonialApp</a></div>';
  }
  html += '</div>';
  target.innerHTML = html;
})();
`);
});

module.exports = router;
