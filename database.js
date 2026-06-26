import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'daylight.db');

let db = null;

export function initDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      
      db.run('PRAGMA foreign_keys = ON', (err) => {
        if (err) {
          reject(err);
          return;
        }

        const tables = [
          `CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )`,
          
          `CREATE TABLE IF NOT EXISTS contact_submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerId INTEGER,
            service TEXT NOT NULL,
            vehicle TEXT,
            message TEXT,
            submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customerId) REFERENCES customers(id)
          )`,
          
          `CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerId INTEGER,
            userName TEXT NOT NULL,
            service TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
            text TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customerId) REFERENCES customers(id)
          )`,
          
          `CREATE TABLE IF NOT EXISTS loyalty_cards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerId INTEGER NOT NULL,
            cardNumber TEXT UNIQUE NOT NULL,
            stamps INTEGER DEFAULT 0,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customerId) REFERENCES customers(id)
          )`,
          
          `CREATE TABLE IF NOT EXISTS loyalty_visits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            loyaltyCardId INTEGER NOT NULL,
            visitDate DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (loyaltyCardId) REFERENCES loyalty_cards(id)
          )`
        ];

        let completed = 0;
        tables.forEach(sql => {
          db.run(sql, (err) => {
            if (err) {
              reject(err);
              return;
            }
            completed++;
            if (completed === tables.length) {
              console.log('✓ Database initialized with all tables');
              resolve(db);
            }
          });
        });
      });
    });
  });
}

export function getDatabase() {
  if (!db) throw new Error('Database not initialized');
  return db;
}

export function queryDatabase(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export function runDatabase(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}
