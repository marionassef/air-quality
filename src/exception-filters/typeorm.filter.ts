import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiResponse } from './generic.exception';

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status_code = HttpStatus.BAD_REQUEST;
    const message = exception.message;
    const Result = null;
    let errors = [exception.message];

    if (exception instanceof EntityNotFoundError) {
      status_code = HttpStatus.NOT_FOUND;
      errors = ['Data not found'];
    }

    const jsonResponse: ApiResponse<null> = {
      Result,
      errors,
    };

    response.status(status_code).json(jsonResponse);
  }
}
