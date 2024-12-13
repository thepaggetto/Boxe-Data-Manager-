// backend/db.js
import { Low, JSONFile } from 'lowdb';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Ottieni il percorso del file corrente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configura il percorso del database JSON
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Inizializza il database con dati vuoti se non esistono
await db.read();
db.data ||= { competitions: [] };
await db.write();

export default db;
