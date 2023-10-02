import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express'; // Import Request type

export interface ApiResponse<T> {
  Result: T;
  errors: any;
}

@Injectable()
@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>(); // Use the Request type

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = this.getErrorDetails(exception);

    httpAdapter.reply(response, errorResponse, status);
  }

  private getErrorDetails(exception: any): ApiResponse<any> {
    let status_code: number;
    let errors: string[];

    if (exception instanceof HttpException) {
      if (exception.getResponse() && exception.getResponse()['message']) {
        // If it's a validation error or custom exception with a message
        if (exception.getResponse()['message'] instanceof Array) {
          errors = exception.getResponse()['message'];
        }
      } else {
        // For other HttpExceptions

        errors = [exception.getResponse()['message']];
        if (exception.getResponse()['message'] instanceof Array) {
          errors = exception.getResponse()['message'];
        }
      }
      status_code = exception.getStatus();
    } else {
      errors =
        exception.response && exception.response.error_message
          ? exception.response.error_message
          : ['Internal Server Error'];
      status_code = exception.code || HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return {
      Result: [],
      errors: errors,
    };
  }
}
