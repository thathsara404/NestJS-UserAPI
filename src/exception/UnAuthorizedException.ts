import { HttpException, HttpStatus } from '@nestjs/common';
import { UN_AUTHORIZED_EXCEPTION } from '../const/ErrorMessage';

export class UnAuthorizedException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(
      message || UN_AUTHORIZED_EXCEPTION,
      status || HttpStatus.UNAUTHORIZED,
    );
  }
}
