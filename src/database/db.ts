import path from 'path';
import sqlite3 from 'sqlite3';
import fs from 'fs';

sqlite3.verbose();

const dbFilePath = path.resolve(__dirname, '../../database.db');

if (fs.existsSync(dbFilePath)) {
	fs.chmodSync(dbFilePath, 0o664); // Permisos de lectura y escritura para el propietario y el grupo
  }

const db = new sqlite3.Database(dbFilePath, (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the database.');
});

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS users (
			user_id TEXT PRIMARY KEY,
			user_name TEXT NOT NULL,
			last_name TEXT NOT NULL,
			gender TEXT NOT NULL,
			birthdate TEXT NOT NULL,
			birthplace TEXT NOT NULL,
			phone INTEGER NOT NULL,
			email TEXT NOT NULL,
			abilities TEXT,
			role TEXT
		)`);

	db.run(`CREATE TABLE IF NOT EXISTS activities (
			activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
			activity_name TEXT NOT NULL,
			instructor TEXT NOT NULL,
			place TEXT,
			day TEXT NOT NULL,
			hour TEXT NOT NULL,
			description TEXT
		)`);

	db.run(`CREATE TABLE IF NOT EXISTS inscriptions (
			inscription_id INTEGER PRIMARY KEY AUTOINCREMENT,
			user_id TEXT NOT NULL,
			activity1_id INTEGER NOT NULL,
			activity2_id INTEGER,
			activity3_id INTEGER,
			activity4_id INTEGER,
			activity5_id INTEGER,
			fee INTEGER NOT NULL,
			referred TEXT NOT NULL,
			created_at TEXT DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY(user_id) REFERENCES users(user_id),
			FOREIGN KEY(activity1_id) REFERENCES activities(activity_id),
			FOREIGN KEY(activity2_id) REFERENCES activities(activity_id),
			FOREIGN KEY(activity3_id) REFERENCES activities(activity_id),
			FOREIGN KEY(activity4_id) REFERENCES activities(activity_id),
			FOREIGN KEY(activity5_id) REFERENCES activities(activity_id)
		)`);
});

export default db;
