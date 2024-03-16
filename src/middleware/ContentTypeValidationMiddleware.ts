import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UnsupportedContentTypeException } from 'src/exception/UnsupportedContentTypeException';

@Injectable()
export class ContentTypeValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['content-type'] !== 'application/json') {
      console.log('Error Found');
      throw new UnsupportedContentTypeException();
    }
    next();
  }
}
