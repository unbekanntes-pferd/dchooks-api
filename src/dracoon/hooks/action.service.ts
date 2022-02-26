import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Message, MessageType } from './dtos/action.models';
import { NodeWebhookDto } from './dtos/node-webhook.dto';
import { UserWebhookDto } from './dtos/user-webhook.dto';
import { Hook } from './hook.entity';
import { ActionTypeNames } from './hook.enums';

@Injectable()
export class ActionService {

    logger = new Logger('ActionService');

    constructor(@Inject('EMAIL_SERVICE') private emailClient: ClientProxy, @Inject('ROOM_SERVICE') private roomClient: ClientProxy) { }

    async handleNodeHook(nodeHook: NodeWebhookDto, hook: Hook) { 

        this.logger.log(`Received node hook - event: ${hook.eventTypeName}`)
    
        await this.handleActions(hook.actionTypeNames, { msg: hook.eventTypeName }, nodeHook);
    };

    async handleUserHook(userHook: UserWebhookDto, hook: Hook) {

        this.logger.log(`Received user hook - event: ${hook.eventTypeName}`)
   
        return this.handleActions(hook.actionTypeNames, { msg: hook.eventTypeName }, userHook);
     }

    async handleShareHook(shareHook, hook: Hook) { 

        this.logger.log(`Received share hook - event: ${hook.eventTypeName}`)

        await this.handleActions(hook.actionTypeNames,  { msg: hook.eventTypeName }, shareHook);
    }

    async handleFileRequestHook(fileRequestHook, hook: Hook) { 

        this.logger.log(`Received user hook - event: ${hook.eventTypeName}`)
        
        await this.handleActions(hook.actionTypeNames, { msg: hook.eventTypeName }, fileRequestHook);
    }

    async handleActions(actionTypes: ActionTypeNames[], pattern: Message, payload: Record<any, any>) {
        for (let action of actionTypes) {

            if (action === ActionTypeNames.createRoom) {
                this.logger.log(`Added create.room event to queue`);
                return this.roomClient.send(pattern, payload);
            }
            if (action === ActionTypeNames.sendEmail) { 
                this.logger.log(`Added send.email event to queue`);
                return this.emailClient.send(pattern, payload);
            }
        }
    }

}
