import { Injectable, NestMiddleware } from '@nestjs/common';
import RequestIdAdapter from 'src/infrastructure/adapters/request-id.adapter';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class RequestIdMiddleware implements NestMiddleware {
  constructor(private readonly requestIdAdapter: RequestIdAdapter) {}

  use(req: any, res: any, next: (error?: any) => void) {
    const parentRequestId = req?.headers['parent-requestid'];
    const requestId = uuidv4();

    this.requestIdAdapter.id = parentRequestId
      ? `${parentRequestId}@${requestId}`
      : requestId;

    next();
  }
}
