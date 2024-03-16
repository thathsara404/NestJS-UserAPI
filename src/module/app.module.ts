import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health.module';
import { UserModule } from './user.module';
import { ContentTypeValidationMiddleware } from 'src/middleware/ContentTypeValidationMiddleware';
import { MongooseConnectionModule } from './mongoose.module';
import { LoggerModule } from './logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseConnectionModule,
    LoggerModule,
    HealthModule,
    UserModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContentTypeValidationMiddleware).forRoutes('*'); // For all routes we expect A/J
  }
}
