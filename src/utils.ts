import { IncomingMessage, RequestListener, ServerResponse } from 'node:http';
import { RouteHandlersCaller } from './types.js';

export const getDateFromString = (str: string) => {
  const date = new Date(str);
  if (isNaN(date.getDate())) throw new Error('Invalide date');
  return date;
};

export const commonHeaders = {
  preflight: {
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept, Content-Type',
    'Access-Control-Max-Age': '86400',
  },
  jsonContentType: {'Content-Type': 'application/json'},
} as const;
// export const routeHandler: RouteHandlersCaller = async ({ req, res, requestListener, middlewares = [] }) => {
//   for (const middleware of middlewares) {
//     await middleware(req, res);
//   }

//   requestListener(req, res);
// };
export const routeHandler: RouteHandlersCaller = async ({ req, res, requestListener, middlewares = [] }) => {
  const preFilledMiddleware: RequestListener[] = [];
  for (let i = middlewares.length - 1; i >= 0; i--) {
    if (i === middlewares.length - 1) {
      preFilledMiddleware[i] = (request, response) => middlewares[i]!(request, response, requestListener);
    } else {
      preFilledMiddleware[i] = (request, response) => middlewares[i]!(request, response, preFilledMiddleware[i + 1]!);
    }
  }

  preFilledMiddleware.length ? preFilledMiddleware[0]!(req, res) : requestListener(req, res);
};

export const safeJSONParse = (data: string) => {
  try {
    return typeof data === 'string' ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export const getJsonDataParsed = async (req: IncomingMessage) => {
  let body: Buffer[] = [];
  for await (const chunk of req) body.push(chunk);
  return safeJSONParse(Buffer.concat(body).toString());
};

export const handlePreflight = (res: ServerResponse) => 
  res.writeHead(204, commonHeaders.preflight ).end();

