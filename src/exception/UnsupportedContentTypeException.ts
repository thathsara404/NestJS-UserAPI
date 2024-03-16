import { HttpException, HttpStatus } from '@nestjs/common';

export class UnsupportedContentTypeException extends HttpException {
  constructor() {
    super(
      'Unsupported Content-Type. Please use application/json',
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    );
  }
}
