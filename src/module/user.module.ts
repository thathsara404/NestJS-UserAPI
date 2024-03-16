import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { UserSchemaModule } from './user.schema.module';
import { ConflictExceptionFilter } from '../filter/ConflictExceptionFilter';
import { LoggerModule } from './logger.module';
import { PasswordService } from '../service/password.service';
import { NotFoundExceptionFilter } from '../filter/NotFoundExceptionFilter';
import { UnAuthorizedExceptionFilter } from '../filter/UnAuthorizedExceptionFilter';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/JwtStrategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '300s' },
        };
      },
    }),
    UserSchemaModule,
    LoggerModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PasswordService,
    ConflictExceptionFilter,
    NotFoundExceptionFilter,
    UnAuthorizedExceptionFilter,
    JwtStrategy,
  ],
})
export class UserModule {}
