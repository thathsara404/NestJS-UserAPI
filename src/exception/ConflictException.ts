import { HttpException, HttpStatus } from '@nestjs/common';
import { MONGO_DB_CONFLICT_ERROR } from '../const/ErrorMessage';

export class ConflictException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(message || MONGO_DB_CONFLICT_ERROR, status || HttpStatus.CONFLICT);
  }
}
