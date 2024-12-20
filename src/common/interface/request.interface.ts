import { Request as ExpressRequest } from 'express';
export interface RequestInfo extends ExpressRequest {
  user: { id: string; email: string; avatar?: string };
}
