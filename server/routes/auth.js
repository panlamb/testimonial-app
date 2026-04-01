const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Resend } = require('resend');
const db = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

function generateReferralCode() {
  return crypto.randomBytes(4).toString('hex').toUpperCase(); // e.g. "A3F9B2C1"
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function notifyNewSignup({ name, email, slug }) {
  if (!resend) return;
  const date = new Date().toLocaleString('el-GR', { timeZone: 'Europe/Athens' });
  await resend.emails.send({
    from: 'Fimi <hello@get-fimi.com>',
    to: 'panos.lambrakis@gmail.com',
    subject: `Νέος χρήστης: ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f9fafb;border-radius:12px">
        <h2 style="margin:0 0 8px;color:#1e1b4b">Νέα εγγραφή 🎉</h2>
        <p style="color:#6b7280;margin:0 0 24px">Κάποιος έκανε sign up στο Fimi</p>
        <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:20px;margin-bottom:24px">
          <p style="margin:0 0 8px"><strong>Όνομα:</strong> ${name}</p>
          <p style="margin:0 0 8px"><strong>Email:</strong> ${email}</p>
          <p style="margin:0 0 8px"><strong>Slug:</strong> ${slug}</p>
          <p style="margin:0"><strong>Ημερομηνία:</strong> ${date}</p>
        </div>
        <a href="https://get-fimi.com/admin/dashboard" style="background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;display:inline-block">
          Admin Dashboard →
        </a>
      </div>
    `,
  }).catch((err) => console.error('Signup notification email error:', err));
}

const router = express.Router();

function generateSlug(name) {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'business';
  const suffix = Math.random().toString(36).substring(2, 7);
  return `${base}-${suffix}`;
}

router.post('/register', (req, res) => {
  const { name, email, password, referralCode } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const slug = generateSlug(name);
  const trialEndsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const myReferralCode = generateReferralCode();

  // Resolve referrer
  let referrerId = null;
  if (referralCode) {
    const referrer = db.prepare('SELECT id, trial_ends_at FROM businesses WHERE referral_code = ?').get(referralCode);
    if (referrer) {
      referrerId = referrer.id;
      // Extend referrer's trial by 30 days from today or from their current end (whichever is later)
      const base = referrer.trial_ends_at ? Math.max(Date.now(), new Date(referrer.trial_ends_at).getTime()) : Date.now();
      const newTrialEnd = new Date(base + 30 * 24 * 60 * 60 * 1000).toISOString();
      db.prepare('UPDATE businesses SET trial_ends_at = ? WHERE id = ?').run(newTrialEnd, referrer.id);
    }
  }

  try {
    const result = db.prepare(
      'INSERT INTO businesses (name, email, password_hash, slug, trial_ends_at, referral_code, referred_by) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(name, email, passwordHash, slug, trialEndsAt, myReferralCode, referrerId);

    const business = db.prepare(
      'SELECT id, name, email, slug, plan, created_at FROM businesses WHERE id = ?'
    ).get(result.lastInsertRowid);

    const token = jwt.sign({ businessId: business.id }, JWT_SECRET, { expiresIn: '7d' });
    notifyNewSignup({ name: business.name, email: business.email, slug: business.slug });
    res.json({ token, business });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed: businesses.email')) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const business = db.prepare('SELECT id, name, email FROM businesses WHERE email = ?').get(email);
  // Always respond with success to avoid email enumeration
  if (!business || !resend) return res.json({ success: true });

  const token = require('crypto').randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

  db.prepare('DELETE FROM password_resets WHERE business_id = ?').run(business.id);
  db.prepare('INSERT INTO password_resets (business_id, token, expires_at) VALUES (?, ?, ?)').run(business.id, token, expiresAt);

  const resetUrl = `${process.env.APP_URL || 'https://get-fimi.com'}/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'Fimi <hello@get-fimi.com>',
    to: business.email,
    subject: 'Reset your Fimi password',
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#f9fafb;border-radius:12px">
        <h2 style="margin:0 0 8px;color:#1e1b4b">Reset your password</h2>
        <p style="color:#6b7280;margin:0 0 24px">Hi ${business.name}, click the button below to set a new password. This link expires in 1 hour.</p>
        <a href="${resetUrl}" style="background:#4f46e5;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;display:inline-block">
          Reset password →
        </a>
        <p style="color:#9ca3af;font-size:12px;margin-top:24px">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  }).catch((err) => console.error('Password reset email error:', err));

  res.json({ success: true });
});

router.post('/reset-password', (req, res) => {
  const { token, password } = req.body || {};
  if (!token || !password) return res.status(400).json({ error: 'Token and password are required' });
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });

  const reset = db.prepare(
    'SELECT * FROM password_resets WHERE token = ? AND expires_at > CURRENT_TIMESTAMP'
  ).get(token);
  if (!reset) return res.status(400).json({ error: 'Invalid or expired reset link' });

  const passwordHash = require('bcryptjs').hashSync(password, 10);
  db.prepare('UPDATE businesses SET password_hash = ? WHERE id = ?').run(passwordHash, reset.business_id);
  db.prepare('DELETE FROM password_resets WHERE id = ?').run(reset.id);

  res.json({ success: true });
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
