import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpStatus, BadRequestException } from '@nestjs/common';

@Catch(BadRequestException) // Only catch BadRequestException
export class RequestValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    console.log('Exception Found Req Validation Exception Filter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.getResponse();
    // Construct a custom response based on your needs
    const responseBody = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors: message as string,
    };

    response.status(HttpStatus.BAD_REQUEST).json(responseBody);
  }
}
