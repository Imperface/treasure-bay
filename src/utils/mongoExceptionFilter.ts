import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { MongoServerError } from 'mongodb';

@Catch()
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    //   this.logErrorToFile(exception, 'critical-errors.log');
    // }

    // hide internal server error
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      });
    }

    // other errors
    return response.status(status).json({
      statusCode: exception.status,
      message: exception.message,
      details: exception.errors,
    });
  }

  private logErrorToFile(error: any, fileName: string) {
    console.log(path.join(__dirname, '../../logs', fileName));
    const logFilePath = path.join(__dirname, '../../logs', fileName);

    const logEntry = {
      timestamp: new Date().toISOString(),
      error,
    };
    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + '\n');
  }
}
