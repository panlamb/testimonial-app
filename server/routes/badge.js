const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:slug.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'public, max-age=300');

  const business = db.prepare(
    'SELECT id, name, slug FROM businesses WHERE slug = ?'
  ).get(req.params.slug);

  if (!business) {
    return res.send('console.error("[Fimi] Badge: business not found");');
  }

  const stats = db.prepare(
    `SELECT COUNT(*) as count, ROUND(AVG(rating), 1) as avg_rating
     FROM testimonials WHERE business_id = ? AND status = 'approved'`
  ).get(business.id);

  const count = stats.count || 0;
  const avg = stats.avg_rating || 0;
  const stars = count > 0 ? avg.toFixed(1) : '—';
  const origin = `${req.protocol}://${req.get('host')}`;

  res.send(`
(function () {
  var data = ${JSON.stringify({ count, avg: stars, slug: business.slug, name: business.name, origin })};

  var style = document.createElement('style');
  style.textContent = [
    '.fimi-badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #e5e7eb;border-radius:999px;padding:8px 16px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-decoration:none;box-shadow:0 1px 4px rgba(0,0,0,.08);transition:box-shadow .2s}',
    '.fimi-badge:hover{box-shadow:0 2px 8px rgba(0,0,0,.14)}',
    '.fimi-badge__stars{color:#f59e0b;font-size:15px;letter-spacing:1px}',
    '.fimi-badge__avg{font-weight:700;font-size:15px;color:#111827}',
    '.fimi-badge__count{font-size:12px;color:#6b7280}',
    '.fimi-badge__divider{width:1px;height:16px;background:#e5e7eb}',
    '.fimi-badge__logo{font-size:11px;font-weight:700;background:linear-gradient(to right,#818cf8,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}',
  ].join('');
  document.head.appendChild(style);

  var starsDisplay = '';
  var avgNum = parseFloat(data.avg);
  if (!isNaN(avgNum)) {
    for (var i = 1; i <= 5; i++) starsDisplay += i <= Math.round(avgNum) ? '★' : '☆';
  }

  var badge = document.createElement('a');
  badge.href = data.origin + '/wall/' + data.slug;
  badge.target = '_blank';
  badge.rel = 'noopener';
  badge.className = 'fimi-badge';
  badge.innerHTML =
    '<span class="fimi-badge__stars">' + starsDisplay + '</span>' +
    '<span class="fimi-badge__avg">' + data.avg + '</span>' +
    '<span class="fimi-badge__count">' + data.count + ' review' + (data.count !== 1 ? 's' : '') + '</span>' +
    '<span class="fimi-badge__divider"></span>' +
    '<span class="fimi-badge__logo">Fimi</span>';

  var target = document.querySelector('[data-fimi-badge="${req.params.slug}"]')
    || document.getElementById('fimi-badge');
  if (!target) { document.body.appendChild(badge); }
  else { target.appendChild(badge); }
})();
`);
});

module.exports = router;
