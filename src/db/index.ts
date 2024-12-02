import Database from 'better-sqlite3';
const db = new Database('vilicus.db', { verbose: console.log });
db.pragma('journal_mode = WAL');
export type DB = typeof db;
export { db };          