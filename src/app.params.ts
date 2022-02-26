import { IsEnum, IsNumberString, IsUUID } from "class-validator";
import { WebhookType } from "./dracoon/hooks/hooks.models";


export class FindOneParams {

 @IsUUID()
 id: string

}


