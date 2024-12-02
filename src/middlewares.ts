import { errorResponse } from './AppError.js';
import { MiddleWare } from './types.js';

export const hasJsonContent: MiddleWare = (req, res, next) => {
  if (req.headers['content-type'] !== 'application/json')  
      return errorResponse(res, {type: 'Missing Header', description: 'Expected application/json Content-Type header'})
  else next(req, res);
};
