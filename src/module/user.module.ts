import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { UserSchemaModule } from './user.schema.module';
import { PasswordService } from '../service/password.service';
import { JwtModule } from '@nestjs/jwt';
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
  ],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
