import { URL } from 'node:url';
import type { RequestListener } from 'node:http';
import categoryRoutes from '~/routes/categories.js';
import { Routes } from '../types.js';
import { handlePreflight, routeHandler } from '../utils.js';
import { errorResponse } from '~/AppError.js';
const allRoutes = {
  ...categoryRoutes,
  default: {
    requestListener: (req, res) => {
      res.end("Hello. I'm the default route!");
    },
  },
} satisfies Routes;

const whiteList = ['http://localhost:5173']

const handler: RequestListener = (req, res) => {
  const { url = '', method = 'GET', headers } = req;
  const baseUrl = `http://${headers.host}/`;
  const { pathname } = new URL(url, baseUrl);
  
  res.setHeader('Access-Control-Allow-Origin', whiteList);
  if (method === 'OPTIONS') return handlePreflight(res);
  
  if (req.headers['content-type'] !== 'application/json')  
    return errorResponse(res, {type: 'Missing Header', description: 'Expected application/json Content-Type header'})

  const key = `${pathname}:${method.toLowerCase()}`;
  const chosen = allRoutes[key as keyof typeof allRoutes] || allRoutes.default; //TODO:
  return routeHandler({ req, res, ...chosen });
};

export { handler };
