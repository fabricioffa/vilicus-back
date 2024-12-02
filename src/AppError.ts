import type { ServerResponse } from 'node:http';
import { ErrorData } from './types.js';

const errorsCodeTable: { [key in ErrorData['type']]: number } = {
  'Mal Formatted Json': 400,
  'Missing Header': 400,
  'Resource Not Found': 404,
  'Validation Error': 422,
  'Server Error': 500,
} as const

export const errorResponse = (res: ServerResponse, errorData: ErrorData) => {
  res.writeHead(errorsCodeTable[errorData.type], { 'Content-Type': 'application/json' }).end(JSON.stringify(errorData));
};
