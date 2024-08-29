import { MiddleWare } from './types.js';

export const hasJsonContent: MiddleWare = (req, res) => {
  if (req.headers['content-type'] !== 'application/json') {
    res
      .writeHead(400, { 'Content-Type': 'application/json' })
      .end(JSON.stringify({ error: 'Bad Request: Expected application/json Content-Type header' }));
    return;
  // } else next();
  } else return Promise.resolve();
};
