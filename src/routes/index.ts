import { URL } from 'node:url';
import type { RequestListener } from 'node:http';
import categoryRoutes from '~/routes/categories.js'
import { Routes } from '../types.js';
import { routeHandler } from '../utils.js';
const allRoutes: Routes = {
  ...categoryRoutes,
  default: {requestListener: (req, res) => {
    res.end("Hello. I'm the default route!");
  }},
};

const handler: RequestListener = (req, res) => {
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
  return routeHandler({req, res, ...chosen});
};

export { handler };
