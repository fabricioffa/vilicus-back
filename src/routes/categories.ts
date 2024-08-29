import { z } from 'zod';
import { hasJsonContent } from '~/middlewares.js';
import { Routes } from '~/types.js';
import { getJsonDataParsed, safeJSONParse } from '~/utils.js';

const categorySchema = z.object({
  id: z.coerce.number().positive().nullish(),
  name: z.string().trim().min(2).max(100),
  createdAt: z.coerce.date().nullish(),
  updatedAt: z.coerce.date().nullish(),
});

export default {
  '/categories:post': {
    requestListener: async (req, res) => {
      const categoryData = getJsonDataParsed(req);
      if (!categoryData) {
        res
          .writeHead(400, { 'Content-Type': 'application/json' })
          .end(JSON.stringify({ error: 'Bad Request: Mal formatted json' }));
        return;
      }
      
      // categoryService.createCategory()
      console.log('%c categoryData', 'color: green', categoryData);
      // res.writeHead(400, 'Deu ruim negada');
      res.end();
    },
    middlewares: [hasJsonContent],
  },
  // '/products:post': async (req, res) => {

  // },
} as Routes;
