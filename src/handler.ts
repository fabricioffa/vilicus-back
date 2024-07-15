import { URL } from 'node:url';
import type { IncomingMessage, ServerResponse } from 'node:http';

const allRoutes = {
  '/products:get': (req: IncomingMessage, res: ServerResponse) => {
    res.end(JSON.stringify(['foo', 'bar', 'baz']));
  },
  default: (req: IncomingMessage, res: ServerResponse) => {
    res.end("Hello. I'm the default route!");
  },
};

const handler = (req: IncomingMessage, res: ServerResponse) => {
  const { url = '', method = 'GET', headers } = req;
  const baseUrl = `http://${headers.host}/`;
  const { pathname } = new URL(url, baseUrl);
  const key = `${pathname}:${method.toLowerCase()}`;
  console.log('%c key', 'color: green', key);
  const chosen = allRoutes[key as keyof typeof allRoutes] || allRoutes.default; //TODO:
  return chosen(req, res);
};

export { handler };
