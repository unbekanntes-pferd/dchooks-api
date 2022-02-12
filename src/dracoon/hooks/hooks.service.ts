import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateWebhookDto } from './dtos/create-webhook.dto';
import { RegisterWebhookDto } from './dtos/register-webhook.dto';
import { Hook } from './hook.entity';
import { Webhook } from './hooks.models';

@Injectable()
export class HooksService {

    constructor(@InjectRepository(Hook) private hooksRepository: Repository<Hook>, private readonly httpService: HttpService, private readonly authService: AuthService, private readonly configService: ConfigService) { }

    // get webhook information by hook id as authenticated user & config manager (token)
    getHookInfo(accessToken: string, id: number): Observable<Webhook> {

        if (!accessToken) throw new UnauthorizedException();

        const hookInfoUrl = `/api/v4/settings/webhooks/${id.toString()}`;
        // axios request config
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        return this.httpService.get(hookInfoUrl, options).pipe(
            catchError((e) => {
                // forward DRACOON error 
                throw new HttpException(e.response.data, e.response.status);
            }),
            map((response) => response.data),
        );

    }

    // create a new webhook in DRACOON
    createWebhook(accessToken: string, payload: CreateWebhookDto): Observable<Webhook> {

        if (!accessToken) throw new UnauthorizedException();

        const hookCreateUrl = '/api/v4/settings/webhooks';
        // axios request config
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        };

        return this.httpService.post(hookCreateUrl, payload, options).pipe(
            catchError((e) => {
                // forward DRACOON error 
                throw new HttpException(e.response.data, e.response.status);
            }),
            map((response) => response.data),
        );
    }

    // create hook entry in DB
    createHook(eventTypeNames: string[], actionTypeNames: string[], creatorId: number): Promise<Hook> {
        const hook = this.hooksRepository.create({ eventTypeNames, actionTypeNames, creatorId });

        return this.hooksRepository.save(hook);
    }

    async registerHook(accessToken: string, registerHookDto: RegisterWebhookDto) {

        // fetch user info from DRACOON
        const userInfo = await (lastValueFrom(this.authService.getUserInfo(accessToken)));

        // create hook entity in service
        const hook = await this.createHook(registerHookDto.eventTypeNames, registerHookDto.actionTypeNames, userInfo.id);

        // register hook in DRACOON
        return this.createWebhook(accessToken, {
            name: registerHookDto.name,
            eventTypeNames: registerHookDto.eventTypeNames,
            url: `${this.configService.get('host')}/api/hooks/${hook.id}`,
            secret: registerHookDto.secret,
            isEnabled: registerHookDto.isEnabled,
            triggerExampleEvent: registerHookDto.triggerExampleEvent
        });

    }

}


