import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class DracoonAuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {}
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

    // reject if no user info delivered,
    if (!userInfo) throw new UnauthorizedException();
    
    return true;
  }
}

@Injectable()
export class DracoonAuthConfigManagerGuard implements CanActivate {

  constructor(private readonly authService: AuthService) {}
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

    // reject if no user info delivered
    if (!userInfo) throw new UnauthorizedException();

    // reject if not a config manager
    if (userInfo.userRoles.items.length < 1 || (userInfo.userRoles.items.find(role => role.id === 1) === undefined)) throw new ForbiddenException();
    
    return true;
  }
}
