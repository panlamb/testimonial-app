const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const { v2: cloudinary } = require('cloudinary');
const db = require('../db');

const router = express.Router();

// Cloudinary is configured via env vars:
// CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
const useCloudinary = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

// Keep files in memory so we can stream to Cloudinary or fall back to local
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

async function saveFile(file) {
  if (!file) return null;

  if (useCloudinary) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'testimonials', resource_type: 'image' },
        (err, res) => (err ? reject(err) : resolve(res))
      );
      stream.end(file.buffer);
    });
    return result.secure_url;
  }

  // Local fallback for development
  const fs = require('fs');
  const path = require('path');
  const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
  fs.mkdirSync(uploadsDir, { recursive: true });
  const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) +
    require('path').extname(file.originalname);
  fs.writeFileSync(path.join(uploadsDir, filename), file.buffer);
  return `/uploads/${filename}`;
}

router.get('/:slug', (req, res) => {
  const business = db.prepare(
    'SELECT id, name, slug, brand_name, brand_logo_url FROM businesses WHERE slug = ?'
  ).get(req.params.slug);
  if (!business) return res.status(404).json({ error: 'Page not found' });
  res.json(business);
});

router.post('/:slug', upload.single('screenshot'), async (req, res) => {
  const business = db.prepare('SELECT id FROM businesses WHERE slug = ?').get(req.params.slug);
  if (!business) return res.status(404).json({ error: 'Page not found' });

  const { customer_name, customer_email, review_text, rating, consent } = req.body || {};

  if (!customer_name || !review_text || !rating) {
    return res.status(400).json({ error: 'Name, review, and rating are required' });
  }
  if (!consent || consent !== 'true') {
    return res.status(400).json({ error: 'You must accept the privacy terms to submit a review' });
  }

  const ratingNum = parseInt(rating, 10);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const screenshotUrl = await saveFile(req.file);
    const deleteToken = crypto.randomBytes(32).toString('hex');

    db.prepare(
      `INSERT INTO testimonials
         (business_id, customer_name, customer_email, review_text, rating, screenshot_url, consent_given_at, delete_token)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      business.id,
      customer_name.trim(),
      customer_email?.trim() || null,
      review_text.trim(),
      ratingNum,
      screenshotUrl,
      new Date().toISOString(),
      deleteToken
    );

    res.json({ success: true, deleteToken });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// GDPR right to erasure
router.delete('/delete/:token', (req, res) => {
  const t = db.prepare('SELECT id FROM testimonials WHERE delete_token = ?').get(req.params.token);
  if (!t) return res.status(404).json({ error: 'Invalid or already used deletion link' });
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(t.id);
  res.json({ success: true });
});

module.exports = router;
