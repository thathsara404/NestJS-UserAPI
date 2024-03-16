import { HttpException, HttpStatus } from '@nestjs/common';
import { NOT_FOUND_EXCEPTION } from '../const/ErrorMessage';

export class NotFoundException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(message || NOT_FOUND_EXCEPTION, status || HttpStatus.NOT_FOUND);
  }
}
