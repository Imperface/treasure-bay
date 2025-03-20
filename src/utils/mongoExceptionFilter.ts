import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Error } from 'mongoose';

@Catch(Error.ValidationError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // if (exception.name === 'ValidationError') {
    //   throw new HttpException('Bad request', 400);
    // }

    throw new HttpException('Bad request', 400);
  }
}
