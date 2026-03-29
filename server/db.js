const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DB_DIR, 'testimonials.db');

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

// Safe migrations for existing databases
for (const col of [
  'ALTER TABLE testimonials ADD COLUMN customer_email TEXT',
  'ALTER TABLE testimonials ADD COLUMN consent_given_at DATETIME',
  'ALTER TABLE testimonials ADD COLUMN delete_token TEXT UNIQUE',
]) {
  try { db.exec(col) } catch {}
}

module.exports = db;
