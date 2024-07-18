import * as path from 'path';
import { promises as fs } from 'fs';
import { Kysely, Migrator, FileMigrationProvider } from 'kysely';
import { Database } from './types.js';
import { LibsqlDialect } from '@libsql/kysely-libsql';
import { env } from '~/env.js';

const db = new Kysely<Database>({
  dialect: new LibsqlDialect({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  }),
});

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(import.meta.dirname, 'migrations'),
  }),
});

const { error, results } = await migrator.migrateToLatest();

results?.forEach((it) => {
  if (it.status === 'Success') {
    console.log(`migration "${it.migrationName}" was executed successfully`);
  } else if (it.status === 'Error') {
    console.error(`failed to execute migration "${it.migrationName}"`);
  }
});

if (error) {
  console.error('failed to migrate');
  console.error(error);
  process.exit(1);
}

await db.destroy();
