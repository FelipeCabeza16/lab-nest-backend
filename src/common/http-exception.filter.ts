import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface ExceptionResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    console.error('[Exception]', exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const responseContent = exception.getResponse();

      // Manejar diferentes tipos de contenido en getResponse()
      if (typeof responseContent === 'string') {
        message = responseContent;
      } else if (
        typeof responseContent === 'object' &&
        responseContent !== null
      ) {
        const res = responseContent as ExceptionResponse;

        if (typeof res.message === 'string') {
          message = res.message;
        } else if (Array.isArray(res.message)) {
          message = res.message.join(', ');
        } else {
          message = res;
        }
      }
    } else if (exception instanceof QueryFailedError) {
      const err = exception as QueryFailedError & { code: string };

      switch (err.code) {
        case '23505':
          status = HttpStatus.CONFLICT;
          message = 'Registro duplicado';
          break;
        case '23502':
          status = HttpStatus.BAD_REQUEST;
          message = 'Faltan campos requeridos o nulos';
          break;
        case '22P02':
          status = HttpStatus.BAD_REQUEST;
          message = 'Formato de identificador no válido';
          break;
        default:
          message = 'Error de base de datos';
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
