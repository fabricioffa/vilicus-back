import { z } from 'zod';
import { Routes } from '~/types.js';
import { commonHeaders, getJsonDataParsed } from '~/utils.js';
import { db } from '~/db/index.js';
import { errorResponse } from '~/AppError.js';

const categorySchema = z.object({
  id: z.coerce.number().positive().nullish(),
  name: z.string().trim().min(2).max(100),
  createdAt: z.coerce.date().nullish(),
  updatedAt: z.coerce.date().nullish(),
});

const getAllCategories = db.prepare('SELECT * FROM category');
const insertCategory = db.prepare<Category>('INSERT INTO category (name) VALUES (@name)');
type Category = z.infer<typeof categorySchema>;

export default {
  '/categories:post': {
    requestListener: async (req, res) => {
      const parsedBody = await getJsonDataParsed(req);

      if (!parsedBody) return errorResponse(res, { type: 'Mal Formatted Json' });

      const { data: categoryData, error } = categorySchema.safeParse(parsedBody);

      if (error) return errorResponse(res, { type: 'Validation Error', fieldErrors: error.formErrors.fieldErrors });

      const result = insertCategory.run(categoryData);
      res.writeHead(200, commonHeaders.jsonContentType).end(JSON.stringify({ id: result.lastInsertRowid }));
    },
  },
  '/categories:get': {
    requestListener: (_req, res) => {
      res.writeHead(200, commonHeaders.jsonContentType).end(JSON.stringify(getAllCategories.all()));
    },
  },
} as Routes;
