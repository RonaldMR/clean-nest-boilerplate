import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import RequestIdAdapter from 'src/infrastructure/adapters/request-id.adapter';

@Catch()
@Injectable({ scope: Scope.REQUEST })
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly requestIdAdapter: RequestIdAdapter,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      const responseBody = {
        statusCode: httpStatus,
        message:
          'An internal server error has ocurred. Please send the request id to our help desk area in order to help you',
        id: this.requestIdAdapter.id,
      };

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    } else {
      const httpException = exception as HttpException;

      httpAdapter.reply(
        ctx.getResponse(),
        httpException.getResponse(),
        httpStatus,
      );
    }
  }
}
