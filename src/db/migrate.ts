import { db } from '~/db/index.js';
import { readFile } from 'node:fs/promises';

readFile('./migrations/create-tables.sql', 'utf-8')
  .then(db.exec)
  .catch((err) => console.error('Error executing migration:', err));
