import { env } from './env.js';
import { createServer } from 'node:http';
import { handler } from './routes/index.js';
import { db } from './db/index.js';


const hostname = '127.0.0.1';

createServer(handler)
.listen(env.PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${env.PORT}/`);
});

process.on('exit', () => db.close());