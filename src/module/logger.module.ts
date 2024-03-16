import { Module } from '@nestjs/common';
import { LoggerService } from 'src/service/logger.service';
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
