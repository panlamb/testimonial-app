const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT
      b.name, b.slug, b.brand_name,
      COUNT(CASE WHEN t.status = 'approved' THEN 1 END) AS approved_count,
      ROUND(AVG(CASE WHEN t.status = 'approved' THEN t.rating END), 1) AS avg_rating
    FROM businesses b
    LEFT JOIN testimonials t ON t.business_id = b.id
    GROUP BY b.id
    HAVING approved_count >= 1
    ORDER BY approved_count DESC, avg_rating DESC
    LIMIT 30
  `).all();
  res.json(rows);
});

module.exports = router;
