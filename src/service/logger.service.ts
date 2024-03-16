import { Injectable } from '@nestjs/common';
import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

@Injectable()
export class LoggerService {
  private readonly logger: pino.Logger;

  constructor() {
    this.logger = logger.child({ service: 'User Service' });
  }

  info(message: string, context?: object) {
    this.logger.info(message, context);
  }

  error(message: string, context?: object) {
    this.logger.error(message, context);
  }

  debug(message: string, context?: object) {
    this.logger.debug(message, context);
  }
}
