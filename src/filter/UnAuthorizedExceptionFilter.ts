import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Injectable,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { UnAuthorizedException } from '../exception/UnAuthorizedException';

@Injectable()
@Catch(UnAuthorizedException)
export class UnAuthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnAuthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.getResponse();
    // Construct a custom response based on your needs
    const responseBody = {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
      errors: message as string,
    };

    response.status(HttpStatus.UNAUTHORIZED).json(responseBody);
  }
}
