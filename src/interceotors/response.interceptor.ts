import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../exception-filters/generic.exception';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next
      .handle()
      .pipe(map((data) => this.transformResponse(context, data)));
  }

  private transformResponse(
    context: ExecutionContext,
    data: any,
  ): ApiResponse<T> {
    const response: ApiResponse<T> = {
      Result: data,
      errors: [],
    };

    // Log the response
    this.logResponse(context, response);

    return response;
  }

  private logResponse(
    context: ExecutionContext,
    response: ApiResponse<T>,
  ): void {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl } = request;
    const logMessage = `Handled ${method} request to ${originalUrl}. Response: ${JSON.stringify(
      response,
    )}`;
    this.logger.log(logMessage);
  }
}
