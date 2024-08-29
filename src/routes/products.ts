import { Routes } from '~/types.js';

export default {
  '/products:get': { requestListener: async (req, res) => {}, middlewares: [] },
  // '/products:post': async (req, res) => {
  //   if (req.headers['content-type'] !== 'application/json') {
  //     res
  //       .writeHead(400, { 'Content-Type': 'application/json' })
  //       .end(JSON.stringify({ error: 'Bad Request: Expected application/json content type' }));
  //     return;
  //   }
  //   for await (const data of req) {
  //     console.log('%c data', 'color: green', JSON.parse(data));
  //   }
  // },
} as Routes;
