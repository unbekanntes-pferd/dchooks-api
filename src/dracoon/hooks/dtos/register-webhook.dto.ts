import { IsNotEmpty, IsOptional } from "class-validator"


export class RegisterWebhookDto {

    @IsNotEmpty()
    name: string

    @IsNotEmpty({ each: true })
    eventTypeNames: string[]

    @IsNotEmpty({ each: true })
    actionTypeNames: string[]

    @IsOptional()
    secret: string

    @IsOptional()
    isEnabled: boolean

    @IsOptional()
    triggerExampleEvent: boolean

}