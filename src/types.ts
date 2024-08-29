import type { IncomingMessage, RequestListener, ServerResponse } from 'node:http';

export interface IBaseRepository<TResource> {
  getById(id: number): TResource | null;
  getAll(): TResource[];
  save(resource: TResource): TResource;
  update(resource: TResource): TResource;
  delete(id: number): void;
}

export type MiddleWare = (req: IncomingMessage, res: ServerResponse) => Promise<void> | void;
// export type MiddleWare = (req: IncomingMessage, res: ServerResponse, next: () => void) => void;
export type RouteHandlersCaller = ({}: RouteHandlersCallerArgs) => void;
export type Routes = {
  [key: string]: {
    requestListener: RequestListener;
    middlewares?: MiddleWare[];
  };
};
export type RouteHandlers = {
  requestListener: RequestListener;
  middlewares?: MiddleWare[];
};
export type RouteHandlersCallerArgs = {
  req: IncomingMessage;
  res: ServerResponse;
} & RouteHandlers;
