import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UnAuthorizedException } from '../exception/UnAuthorizedException';
import { AuthGuard } from '@nestjs/passport';
import { LoggerService } from '../service/logger.service';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly logger: LoggerService) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Observable<boolean> | Promise<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    this.logger.debug(`Extracted user info: ${JSON.stringify(user)}`);
    this.logger.debug(`Extracted info: ${JSON.stringify(info)}`);
    if (err || !user) {
      throw err || new UnAuthorizedException();
    }
    return user;
  }
}
