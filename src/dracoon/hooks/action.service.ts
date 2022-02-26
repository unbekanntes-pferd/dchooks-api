import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message } from './dtos/action.models';
import { NodeWebhookDto } from './dtos/node-webhook.dto';
import { UserWebhookDto } from './dtos/user-webhook.dto';
import { HookEvent } from './event.entity';
import { EventService } from './event.service';
import { Hook } from './hook.entity';
import { ActionTypeNames } from './hook.enums';

@Injectable()
export class ActionService {

    logger = new Logger('ActionService');

    constructor(@Inject('EMAIL_SERVICE') private emailClient: ClientProxy, @Inject('ROOM_SERVICE') private roomClient: ClientProxy, private readonly eventService: EventService) { }

    async handleNodeHook(nodeHook: NodeWebhookDto, hook: Hook, event: HookEvent) { 

        this.logger.log(`Received node hook - event: ${hook.eventTypeName}`)
    
        await this.handleActions(hook.actionTypeNames, { msg: hook.eventTypeName }, nodeHook, event);
    };

    async handleUserHook(userHook: UserWebhookDto, hook: Hook, event: HookEvent) {

        this.logger.log(`Received user hook - event: ${hook.eventTypeName}`)
   
        return this.handleActions(hook.actionTypeNames, { msg: hook.eventTypeName }, userHook, event);
     }

    async handleShareHook(shareHook, hook: Hook, event: HookEvent) { 

        this.logger.log(`Received share hook - event: ${hook.eventTypeName}`)

        await this.handleActions(hook.actionTypeNames,  { msg: hook.eventTypeName }, shareHook, event);
    }

    async handleFileRequestHook(fileRequestHook, hook: Hook, event: HookEvent) { 

        this.logger.log(`Received user hook - event: ${hook.eventTypeName}`)
        
        await this.handleActions(hook.actionTypeNames, { msg: hook.eventTypeName }, fileRequestHook, event);
    }

    async handleActions(actionTypes: ActionTypeNames[], pattern: Message, payload: Record<any, any>, event: HookEvent) {
        for (let action of actionTypes) {

            if (action === ActionTypeNames.createRoom) {
                await this.eventService.updateActionsTriggered(event);
                this.logger.log(`Added create.room event to queue`);
                return this.roomClient.send(pattern, payload);
            }
            if (action === ActionTypeNames.sendEmail) { 
                await this.eventService.updateActionsTriggered(event);
                this.logger.log(`Added send.email event to queue`);
                return this.emailClient.send(pattern, payload);
            }
        }
    }

}
