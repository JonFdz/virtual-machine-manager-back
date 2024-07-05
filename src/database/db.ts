import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./vmmanager.db');

db.serialize((): void => {
    db.run(`CREATE TABLE IF NOT EXISTS vm (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vmName TEXT NOT NULL,
        ip TEXT NOT NULL,
        dnsName TEXT NOT NULL,
        project TEXT,
        environment TEXT,
        status TEXT NOT NULL,
        comment TEXT,
        reservedFrom TEXT, -- SQLite no tiene un tipo específico de fecha, por lo que se usa TEXT
        reservedTo TEXT, -- y se recomienda almacenar las fechas en formato ISO8601 (YYYY-MM-DD HH:MM:SS.SSS)
        operatingSystem TEXT,
        cpuCores INTEGER,
        ram INTEGER,
        disk INTEGER,
        createdAt TEXT,
        updatedAt TEXT
    )`);
});

export default db;
