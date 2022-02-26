import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { UserAccount } from './auth.models';

@Injectable()
export class AuthService {

    constructor(private readonly httpService: HttpService) {}

  // get user account information as authenticated user (token)
  getUserInfo(accessToken: string): Observable<UserAccount> {

    if (!accessToken) throw new UnauthorizedException();

    console.log(accessToken)
    
    const userInfoUrl = '/api/v4/user/account';
    // axios request config
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    return this.httpService.get(userInfoUrl, options).pipe(
        catchError((e) => {

            // forward DRACOON error 
            throw new HttpException(e.response.data, e.response.status);
        }),
        map((response) => response.data),
    );

}
}