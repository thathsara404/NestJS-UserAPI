import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health.module';
import { UserModule } from './user.module';
import { ContentTypeValidationMiddleware } from 'src/middleware/ContentTypeValidationMiddleware';
import { MongooseConnectionModule } from './mongoose.module';
import { LoggerModule } from './logger.module';
import { JwtStrategy } from 'src/strategy/JwtStrategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(),
    MongooseConnectionModule,
    HealthModule,
    UserModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContentTypeValidationMiddleware).forRoutes('*'); // For all routes we expect A/J
  }
}
