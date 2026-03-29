const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

function generateSlug(name) {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'business';
  const suffix = Math.random().toString(36).substring(2, 7);
  return `${base}-${suffix}`;
}

router.post('/register', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const slug = generateSlug(name);

  try {
    const result = db.prepare(
      'INSERT INTO businesses (name, email, password_hash, slug) VALUES (?, ?, ?, ?)'
    ).run(name, email, passwordHash, slug);

    const business = db.prepare(
      'SELECT id, name, email, slug, plan, created_at FROM businesses WHERE id = ?'
    ).get(result.lastInsertRowid);

    const token = jwt.sign({ businessId: business.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, business });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed: businesses.email')) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const business = db.prepare('SELECT * FROM businesses WHERE email = ?').get(email);
  if (!business || !bcrypt.compareSync(password, business.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ businessId: business.id }, JWT_SECRET, { expiresIn: '7d' });
  const { password_hash, ...safe } = business;
  res.json({ token, business: safe });
});

module.exports = router;
