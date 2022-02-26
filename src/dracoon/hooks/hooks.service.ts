import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { builtinModules } from 'module';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateWebhookDto } from './dtos/create-webhook.dto';
import { RegisterWebhookDto } from './dtos/register-webhook.dto';
import { UpdateDracoonWebhookDto, UpdateWebhookDto } from './dtos/update-webhook.dto';
import { Hook } from './hook.entity';
import { ActionTypeNames, EventTypeNames } from './hook.enums';
import { Webhook, WebhookType } from './hooks.models';

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

    };

    // delete webhook information by hook id as authenticated user & config manager (token)
    deleteWebhook(accessToken: string, hook: Hook): Observable<{}> {

        if (!accessToken) throw new UnauthorizedException();

        const hookInfoUrl = `/api/v4/settings/webhooks/${hook.dracoonWebhookId.toString()}`;
        // axios request config
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        };

        return this.httpService.delete(hookInfoUrl, options).pipe(
            catchError((e) => {

                console.log("here")
                // remove hook entry on error 
                this.hooksRepository.remove(hook);


                // forward DRACOON error 
                throw new HttpException(e.response.data, e.response.status);
            }),
            map((response) => response.data),
        );

    };

    // create a new webhook in DRACOON
    createWebhook(accessToken: string, payload: CreateWebhookDto, hook: Hook): Observable<Webhook> {

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

                // remove hook entry on error 
                this.hooksRepository.remove(hook);

                // forward DRACOON error 
                throw new HttpException(e.response.data, e.response.status);
            }),
            map((response) => response.data),
        );
    }

    // create a new webhook in DRACOON
    updateWebhook(accessToken: string, id: number, payload: UpdateDracoonWebhookDto): Observable<Webhook> {

        if (!accessToken) throw new UnauthorizedException();

        const hookUpdateUrl = `/api/v4/settings/webhooks/${id.toString()}`;
        // axios request config
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        };

        return this.httpService.put(hookUpdateUrl, payload, options).pipe(
            catchError((e) => {

                // forward DRACOON error 
                throw new HttpException(e.response.data, e.response.status);
            }),
            map((response) => response.data),
        );
    }


    // create hook entry in DB
    createHook(name: string, hookType: WebhookType, eventTypeName: EventTypeNames, actionTypeNames: ActionTypeNames[], creatorId: number): Promise<Hook> {
        const hook = this.hooksRepository.create({ name, hookType, eventTypeName, actionTypeNames, creatorId });

        return this.hooksRepository.save(hook);
    };

    listHooks() {

        return this.hooksRepository.find();

    };

    async updateHook(accessToken: string, id: string, updatePayload: UpdateWebhookDto) {

        const hook = await this.getHook(id);

        const updatedHook = await lastValueFrom(this.updateWebhook(accessToken, hook.dracoonWebhookId, { isEnabled: updatePayload.isEnabled, secret: updatePayload.secret, name: updatePayload.name }));

        Object.assign(hook, updatePayload);

        return this.hooksRepository.save(hook);
    }

    async getHook(id: string): Promise<Hook> {

        const hook = await this.hooksRepository.findOne(id);

        if (!hook) {
            throw new NotFoundException('Webhook not found');
        }

        return hook;
    };

    async registerHook(accessToken: string, registerHookDto: RegisterWebhookDto) {

        // handle bearer token format (Bearer $token)
        if (accessToken.split(' ').length > 1 && accessToken.split(' ')[0] === 'Bearer') accessToken = accessToken.split(' ')[1];

        // fetch user info from DRACOON
        const userInfo = await (lastValueFrom(this.authService.getUserInfo(accessToken)));

        // validate if events match with selected hook type 
        switch (registerHookDto.hookType) {

            case WebhookType.node:
                this.validateNodeHookEvents(registerHookDto.eventTypeName, registerHookDto.actionTypeNames);
                break;
            case WebhookType.user:
                this.validateUserHookEvents(registerHookDto.eventTypeName, registerHookDto.actionTypeNames);
                break;
            case WebhookType.share:
                this.validateShareHookEvents(registerHookDto.eventTypeName, registerHookDto.actionTypeNames);
                break;
            case WebhookType.filerequest:
                this.validateFileRequestHookEvents(registerHookDto.eventTypeName, registerHookDto.actionTypeNames);
                break;
            default:
                throw new BadRequestException("Invalid webhook type.")

        }

        // create hook entity in service
        const hook = await this.createHook(registerHookDto.name, registerHookDto.hookType, registerHookDto.eventTypeName, registerHookDto.actionTypeNames, userInfo.id);


        // register hook in DRACOON
        const webhook = await lastValueFrom(this.createWebhook(accessToken, {
            name: registerHookDto.name,
            eventTypeNames: [registerHookDto.eventTypeName],
            url: `${this.configService.get('host')}/api/hooks/${registerHookDto.hookType}/${hook.id}`,
            secret: registerHookDto.secret,
            isEnabled: registerHookDto.isEnabled,
            triggerExampleEvent: registerHookDto.triggerExampleEvent
        }, hook));

        // if webhook creation fails, delete entry 
        if (!webhook) {
            await this.hooksRepository.remove(hook);
        };

        hook.secret = webhook.secret;
        hook.dracoonWebhookId = webhook.id;

        await this.hooksRepository.save(hook);

        return webhook;

    };


    async unregisterWebhook(accessToken: string, hook: Hook) {

        // handle bearer token format (Bearer $token)
        if (accessToken.split(' ').length > 1 && accessToken.split(' ')[0] === 'Bearer') accessToken = accessToken.split(' ')[1];

        await lastValueFrom(this.deleteWebhook(accessToken, hook));

        return this.hooksRepository.remove(hook);

    };

    validateNodeHookEvents(eventTypeName: EventTypeNames, actionTypeNames: ActionTypeNames[]) {

        if (eventTypeName !== EventTypeNames.fileCreated && eventTypeName !== EventTypeNames.fileDeleted && eventTypeName !== EventTypeNames.folderCreated && eventTypeName !== EventTypeNames.folderDeleted && eventTypeName !== EventTypeNames.roomCreated && eventTypeName !== EventTypeNames.roomDeleted) {

            throw new BadRequestException("Invalid event type name for a node webhook.")

        }

        const hasCreateRoom = (actionTypeNames.find(action => action === ActionTypeNames.createRoom) !== undefined)

        if (hasCreateRoom) {
            throw new BadRequestException("Action 'create.room' only allowed for user.created hooks.")
        }

    };

    validateUserHookEvents(eventTypeName: EventTypeNames, actionTypeNames: ActionTypeNames[]) {

        if (eventTypeName !== EventTypeNames.userCreated && eventTypeName !== EventTypeNames.userDeleted && eventTypeName !== EventTypeNames.userLocked) {

            throw new BadRequestException("Invalid event type name for a user webhook.")

        }

        const isUserCreated = (eventTypeName == EventTypeNames.userCreated);
        const hasCreateRoom = (actionTypeNames.find(action => action === ActionTypeNames.createRoom) !== undefined);

        if (hasCreateRoom && !isUserCreated) {
            throw new BadRequestException("Action 'create.room' only allowed for user.created hooks.")
        }

    };

    validateShareHookEvents(eventTypeName: EventTypeNames, actionTypeNames: ActionTypeNames[]) {

        if (eventTypeName !== EventTypeNames.downloadShareCreated && eventTypeName !== EventTypeNames.downloadShareDeleted) {

            throw new BadRequestException("Invalid event type name for a share webhook.")

        }

        const hasCreateRoom = (actionTypeNames.find(action => action === ActionTypeNames.createRoom) !== undefined)

        if (hasCreateRoom) {
            throw new BadRequestException("Action 'create.room' only allowed for user.created hooks.")
        }

    };

    validateFileRequestHookEvents(eventTypeName: EventTypeNames, actionTypeNames: ActionTypeNames[]) {

        if (eventTypeName !== EventTypeNames.uploadShareCreated && eventTypeName !== EventTypeNames.uploadShareDeleted) {

            throw new BadRequestException("Invalid event type name for a share webhook.")

        }

        const hasCreateRoom = (actionTypeNames.find(action => action === ActionTypeNames.createRoom) !== undefined)

        if (hasCreateRoom) {
            throw new BadRequestException("Action 'create.room' only allowed for user.created hooks.")
        }

    };



}


