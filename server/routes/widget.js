const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:slug.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'public, max-age=60');

  const business = db.prepare(
    'SELECT id, name, slug, plan, widget_settings FROM businesses WHERE slug = ?'
  ).get(req.params.slug);

  if (!business) {
    return res.send('console.error("[TestimonialApp] Widget: business not found");');
  }
  db.prepare('INSERT INTO page_views (business_id, page_type) VALUES (?, ?)').run(business.id, 'widget');

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

  const ws = business.widget_settings ? JSON.parse(business.widget_settings) : {};
  const colors = {
    cardBg: ws.cardBg || '#ffffff',
    textColor: ws.textColor || '#374151',
    nameColor: ws.nameColor || '#111827',
    starsColor: ws.starsColor || '#f59e0b',
    borderColor: ws.borderColor || '#e5e7eb',
  };

  const payload = JSON.stringify({ business: { name: business.name, slug: business.slug }, testimonials, showBadge, colors });

  res.send(`
(function () {
  var _tw = ${payload};

  var c = _tw.colors;
  var style = document.createElement('style');
  style.textContent = [
    '.tw-wrap{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:20px;box-sizing:border-box}',
    '.tw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}',
    '.tw-card{background:' + c.cardBg + ';border:1px solid ' + c.borderColor + ';border-radius:12px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.06)}',
    '.tw-stars{color:' + c.starsColor + ';font-size:18px;letter-spacing:2px;margin-bottom:8px}',
    '.tw-text{color:' + c.textColor + ';font-size:14px;line-height:1.6;margin:0 0 12px}',
    '.tw-name{font-weight:600;color:' + c.nameColor + ';font-size:14px}',
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

  // Exit intent — show popup when cursor leaves top of page
  (function () {
    var _shown = false;
    var _collectUrl = '${origin}/collect/${req.params.slug}';

    var overlay = document.createElement('div');
    overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99998;align-items:center;justify-content:center';
    var box = document.createElement('div');
    box.style.cssText = 'background:#fff;border-radius:16px;padding:32px 28px;max-width:380px;width:90%;text-align:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;position:relative';

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'position:absolute;top:12px;right:14px;background:none;border:none;font-size:18px;cursor:pointer;color:#9ca3af';
    closeBtn.onclick = function () { overlay.style.display = 'none'; };

    var heading = document.createElement('p');
    heading.style.cssText = 'font-size:22px;font-weight:700;color:#111827;margin:0 0 8px';
    heading.textContent = 'Before you go…';

    var sub = document.createElement('p');
    sub.style.cssText = 'font-size:14px;color:#6b7280;margin:0 0 20px;line-height:1.5';
    sub.textContent = 'How was your experience with ' + esc(_tw.business.name) + '? It only takes 30 seconds.';

    var starsRow = document.createElement('div');
    starsRow.style.cssText = 'display:flex;justify-content:center;gap:8px;margin-bottom:8px';
    [1,2,3,4,5].forEach(function (n) {
      var s = document.createElement('span');
      s.textContent = '★';
      s.style.cssText = 'font-size:36px;cursor:pointer;color:#d1d5db;transition:color .15s';
      s.onmouseover = function () {
        starsRow.querySelectorAll('span').forEach(function (el, i) {
          el.style.color = i < n ? '#f59e0b' : '#d1d5db';
        });
      };
      s.onmouseout = function () {
        starsRow.querySelectorAll('span').forEach(function (el) { el.style.color = '#d1d5db'; });
      };
      s.onclick = function () {
        overlay.style.display = 'none';
        window.location.href = _collectUrl + '?rating=' + n;
      };
      starsRow.appendChild(s);
    });

    var hint = document.createElement('p');
    hint.style.cssText = 'font-size:12px;color:#9ca3af;margin:0';
    hint.textContent = 'Click a star to leave your review';

    box.appendChild(closeBtn);
    box.appendChild(heading);
    box.appendChild(sub);
    box.appendChild(starsRow);
    box.appendChild(hint);
    overlay.appendChild(box);
    overlay.style.display = 'flex';
    overlay.style.display = 'none';
    document.body.appendChild(overlay);

    document.addEventListener('mouseleave', function (e) {
      if (_shown) return;
      if (e.clientY < 0) {
        _shown = true;
        overlay.style.display = 'flex';
      }
    });
  })();
})();
`);
});

module.exports = router;
