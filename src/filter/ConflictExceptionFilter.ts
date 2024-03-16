import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Injectable,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ConflictException } from '../exception/ConflictException';

@Injectable()
@Catch(ConflictException) // Only catch ConflictException
export class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.getResponse();
    // Construct a custom response based on your needs
    const responseBody = {
      statusCode: HttpStatus.CONFLICT,
      message: 'Conflict found',
      errors: message as string,
    };

    response.status(HttpStatus.CONFLICT).json(responseBody);
  }
}
