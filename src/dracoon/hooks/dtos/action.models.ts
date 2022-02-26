import { EventTypeNames } from "../hook.enums";

export enum MessageType {

    userHook = 'user_hook',
    nodeHook = 'node_hook',
    shareHook = 'share_hook',
    fileRequestHook = 'filerequest_hook'


}


export class Message { 
    msg: EventTypeNames
}