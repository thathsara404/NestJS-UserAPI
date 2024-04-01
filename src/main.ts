import { NestFactory } from '@nestjs/core';
import * as DotEnv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { UnsupportedContentTypeExceptionFilter } from './filter/UnsupportedContentTypeExceptionFilter';
import { RequestValidationExceptionFilter } from './filter/RequestValidationExceptionFilter';
import { UnAuthorizedExceptionFilter } from './filter/UnAuthorizedExceptionFilter';
import { NotFoundExceptionFilter } from './filter/NotFoundExceptionFilter';
import { ConflictExceptionFilter } from './filter/ConflictExceptionFilter';

async function bootstrap() {
  DotEnv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // This is for accessing data from DTO
  app.useGlobalFilters(new RequestValidationExceptionFilter());
  app.useGlobalFilters(new UnAuthorizedExceptionFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalFilters(new ConflictExceptionFilter());
  app.useGlobalFilters(new UnsupportedContentTypeExceptionFilter()); // Catch thrown exception from ContentTypeValidationMiddleware
  const configService = app.get(ConfigService);
  console.log(`DB URI: ${configService.get('MONGO_URI')}`);
  await app.listen(8080);
}
bootstrap();
