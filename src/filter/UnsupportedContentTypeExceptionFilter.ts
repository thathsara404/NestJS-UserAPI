import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { UnsupportedContentTypeException } from 'src/exception/UnsupportedContentTypeException';

@Catch(UnsupportedContentTypeException)
export class UnsupportedContentTypeExceptionFilter implements ExceptionFilter {
  catch(exception: UnsupportedContentTypeException, host: ArgumentsHost) {
    console.log('Exception Found Unsupported Content Type Exception Filter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).json({
      message: 'Unsupported Content-Type. Please use application/json',
    });
  }
}
