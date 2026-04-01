const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'testimonials.db');
const DB_DIR = path.dirname(DB_PATH);

fs.mkdirSync(DB_DIR, { recursive: true });

const db = new DatabaseSync(DB_PATH);

db.exec(`PRAGMA journal_mode = WAL`);
db.exec(`PRAGMA foreign_keys = ON`);

db.exec(`
  CREATE TABLE IF NOT EXISTS businesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    plan TEXT NOT NULL DEFAULT 'free',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_id INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    review_text TEXT NOT NULL,
    rating INTEGER NOT NULL,
    screenshot_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    consent_given_at DATETIME,
    delete_token TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_id INTEGER NOT NULL,
    page_type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
  );
`);

// Safe migrations for existing databases
for (const col of [
  'ALTER TABLE testimonials ADD COLUMN customer_email TEXT',
  'ALTER TABLE testimonials ADD COLUMN consent_given_at DATETIME',
  'ALTER TABLE testimonials ADD COLUMN delete_token TEXT UNIQUE',
  'ALTER TABLE businesses ADD COLUMN brand_name TEXT',
  'ALTER TABLE businesses ADD COLUMN brand_logo_url TEXT',
  'ALTER TABLE businesses ADD COLUMN widget_settings TEXT',
  'ALTER TABLE businesses ADD COLUMN trial_ends_at DATETIME',
  'ALTER TABLE businesses ADD COLUMN trial_notified INTEGER DEFAULT 0',
  'ALTER TABLE testimonials ADD COLUMN verified INTEGER DEFAULT 0',
  'ALTER TABLE businesses ADD COLUMN google_review_url TEXT',
  'ALTER TABLE businesses ADD COLUMN referral_code TEXT UNIQUE',
  'ALTER TABLE businesses ADD COLUMN referred_by INTEGER',
  'ALTER TABLE businesses ADD COLUMN webhook_url TEXT',
  'ALTER TABLE businesses ADD COLUMN trial_user_notified INTEGER DEFAULT 0',
]) {
  try { db.exec(col) } catch {}
}

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS outreach_emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      business_name TEXT,
      unsubscribe_token TEXT UNIQUE NOT NULL,
      unsubscribed INTEGER DEFAULT 0,
      sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
} catch {}

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS password_resets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      business_id INTEGER NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
    )
  `);
} catch {}

module.exports = db;
