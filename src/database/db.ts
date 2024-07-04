import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database(':memory:');

db.serialize((): void => {
	db.run(`CREATE TABLE vm (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    status TEXT NOT NULL
	)`);
});

export default db;
