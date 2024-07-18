import { Kysely } from 'kysely'
import { LibsqlDialect } from '@libsql/kysely-libsql'

import { Database } from './types.js'
import { env } from '~/env.js'

export const db = new Kysely<Database>({
  dialect: new LibsqlDialect({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN
  })
})
