import { IsNotEmpty, IsOptional } from "class-validator"


export class CreateWebhookDto {

    @IsNotEmpty()
    name: string

    @IsNotEmpty({ each: true })
    eventTypeNames: string[]

    @IsNotEmpty()
    url: string

    @IsOptional()
    secret: string

    @IsOptional()
    isEnabled: boolean

    @IsOptional()
    triggerExampleEvent: boolean

}