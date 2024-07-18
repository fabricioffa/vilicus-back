import { URL } from 'node:url';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { db } from './db/index.js';

const allRoutes = {
  '/categories:get': async (req: IncomingMessage, res: ServerResponse) => {
    const categories = await db.selectFrom('category').selectAll('category').execute();
    res.end(JSON.stringify(categories));
  },
  '/categories:post': async (req: IncomingMessage, res: ServerResponse) => {
    for await (const data of req) {
      console.log('%c data', 'color: green', JSON.parse(data));
    }
    res.end();
  },
  '/products:get': async (req: IncomingMessage, res: ServerResponse) => {
    const products = await db.selectFrom('product').selectAll('product').execute();
    res.end(JSON.stringify(products));
  },
  '/products:post': async (req: IncomingMessage, res: ServerResponse) => {
    if (req.headers['content-type'] !== 'application/json') {
      res
        .writeHead(400, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ error: 'Bad Request: Expected application/json content type' }));
      return;
    }
    for await (const data of req) {
      console.log('%c data', 'color: green', JSON.parse(data));
    }
  },
  default: (req: IncomingMessage, res: ServerResponse) => {
    res.end("Hello. I'm the default route!");
  },
};

const handler = (req: IncomingMessage, res: ServerResponse) => {
  const { url = '', method = 'GET', headers } = req;
  const baseUrl = `http://${headers.host}/`;
  const { pathname } = new URL(url, baseUrl);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  if (method === 'OPTIONS') {
    console.log('%c req', 'color: green', req.url);
    console.log('%c req de preflight', 'color: green');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.writeHead(204);
    res.end();
    return;
  }
  const key = `${pathname}:${method.toLowerCase()}`;
  console.log('%c key', 'color: green', key);
  const chosen = allRoutes[key as keyof typeof allRoutes] || allRoutes.default; //TODO:
  return chosen(req, res);
};

export { handler };
