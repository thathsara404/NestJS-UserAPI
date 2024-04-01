import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerService } from 'src/service/logger.service';
@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggerModule,
    };
  }
}
