import { IncomingMessage } from 'node:http';
import { MiddleWare, RouteHandlersCaller } from './types.js';

export const getDateFromString = (str: string) => {
  const date = new Date(str);
  if (isNaN(date.getDate())) throw new Error('Invalide date');
  return date;
};

export const routeHandler: RouteHandlersCaller = async ({ req, res, requestListener, middlewares = [] }) => {
const bindedHandlers: (() => void)[] = [];
for (let i = middlewares.length - 1; i >= 0; i--) {
  const curMiddleware = middlewares[i];
  if (i === middlewares.length - 1) {
    bindedHandlers[i] = () => {
      curMiddleware(req, res, () => requestListener(req, res));
    };
  } else {
    bindedHandlers[i] = () => {
      curMiddleware(req, res, bindedHandlers[i + 1]);
    };
  }
}
bindedHandlers.length ? bindedHandlers[0]() : requestListener(req, res);



  for (const middleware of middlewares) {
    await middleware(req, res);
  }

  requestListener(req, res);
};

export const safeJSONParse = (data: string) => {
  try {
    console.log('%c data', 'color: green', data)
    return typeof data === 'string' ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export const getJsonDataParsed = async (req: IncomingMessage) => {
  let body: Buffer[] = [];
  let stringifiedData: string = '';

  for await (const chunk of req) {
    body.push(chunk)
  }
  
  stringifiedData = Buffer.concat(body).toString();

  // req
  //   .on('data', (chunk: Buffer) => {
  //     console.log('%c chunk', 'color: green', chunk)
  //     body.push(chunk);
  //   })
  //   .on('end', () => {
  //     stringifiedData = Buffer.concat(body).toString();
  //     console.log('%c stringifiedData', 'color: green', stringifiedData)
  //   });
  return safeJSONParse(stringifiedData);
};
