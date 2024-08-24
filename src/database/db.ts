import sqlite3 from 'sqlite3';

sqlite3.verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
		db.run(`CREATE TABLE IF NOT EXISTS users (
			identifier TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			lastName TEXT NOT NULL,
			gender TEXT NOT NULL,
			birthdate TEXT NOT NULL,
			birthplace TEXT NOT NULL,
			phone INTEGER NOT NULL,
			email TEXT NOT NULL,
			abilities TEXT
		)`);

		db.run(`CREATE TABLE IF NOT EXISTS activities (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			instructor TEXT NOT NULL,
			place TEXT,
			day TEXT NOT NULL,
			hour TEXT NOT NULL,
			description TEXT
		)`);

		db.run(`CREATE TABLE IF NOT EXISTS inscriptions (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			user TEXT,
			activity1 INTEGER,
			activity2 INTEGER,
			activity3 INTEGER,
			activity4 INTEGER,
			activity5 INTEGER,
			FOREIGN KEY(user) REFERENCES users(identifier),
			FOREIGN KEY(activity1) REFERENCES activities(id),
			FOREIGN KEY(activity2) REFERENCES activities(id),
			FOREIGN KEY(activity3) REFERENCES activities(id),
			FOREIGN KEY(activity4) REFERENCES activities(id),
			FOREIGN KEY(activity5) REFERENCES activities(id)
		)`);
});

export default db;
