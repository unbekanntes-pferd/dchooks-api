import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import RequestWithUserAccount from './request-with-user.interface';

@Injectable()
export class DracoonAuthGuard implements CanActivate {

  constructor(protected readonly authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request: Request = context.switchToHttp().getRequest();
    
    // check bearer token
    const bearerTokenHeader = request.headers['authorization'];

    // reject invalid authorization header
    if (!bearerTokenHeader || bearerTokenHeader.split(' ').length <= 1 || bearerTokenHeader.split(' ')[0] !== 'Bearer') throw new UnauthorizedException();
    
    // get bearer token
    const token = bearerTokenHeader.split(' ')[1];

    // fetch user info 
    const userInfo = await lastValueFrom(this.authService.getUserInfo(token));

    request["user"] = userInfo;
    request["token"] = token;

    // reject if no user info delivered
    if (!userInfo) throw new UnauthorizedException();
    
    return true;
  }
}

@Injectable()
export class DracoonAuthConfigManagerGuard extends DracoonAuthGuard {

  constructor(protected readonly authService: AuthService) {
    super(authService)
  }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      
      const request: RequestWithUserAccount = context.switchToHttp().getRequest();
  
      if (request.user.userRoles.items.find(role => role.id === 1) === undefined) {
        throw new ForbiddenException(`Forbidden: config manager role required.`)
      };
  
      return true;
    }
}
