import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Injectable,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { NotFoundException } from '../exception/NotFoundException';

@Injectable()
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.getResponse();
    // Construct a custom response based on your needs
    const responseBody = {
      statusCode: HttpStatus.CONFLICT,
      message: 'Not found',
      errors: message as string,
    };

    response.status(HttpStatus.CONFLICT).json(responseBody);
  }
}
