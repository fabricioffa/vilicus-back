import type { IncomingMessage, RequestListener, ServerResponse } from 'node:http';

export type FieldErrors = {
  [name: string]: string[];
};

export type ErrorData =
  | {
      type: 'Missing Header';
      description: string;
    }
  | { type: 'Mal Formatted Json' }
  | { type: 'Resource Not Found' }
  | {
      type: 'Validation Error';
      fieldErrors: FieldErrors;
    }
  | {
      type: 'Server Error';
      description: string;
    };

export interface IBaseRepository<TResource> {
  getById(id: number): TResource | null;
  getAll(): TResource[];
  save(resource: TResource): TResource;
  update(resource: TResource): TResource;
  delete(id: number): void;
}

// export type MiddleWare = (req: IncomingMessage, res: ServerResponse) => Promise<void> | void;
export type MiddleWare = (req: IncomingMessage, res: ServerResponse, next: RequestListener) => void;
export type RouteHandlers = {
  requestListener: RequestListener;
  middlewares?: MiddleWare[];
};
export type Routes = {
  [key: string]: RouteHandlers
};
export type RouteHandlersCallerArgs = {
  req: IncomingMessage;
  res: ServerResponse;
} & RouteHandlers;
export type RouteHandlersCaller = ({}: RouteHandlersCallerArgs) => void;
