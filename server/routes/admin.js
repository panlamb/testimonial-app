const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

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

module.exports = { router, adminAuth };
