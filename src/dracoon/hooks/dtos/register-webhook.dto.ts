import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ActionTypeNames, EventTypeNames } from "../hook.enums"
import { WebhookType } from "../hooks.models"


// payload to register a webhook with service
export class RegisterWebhookDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ enum: WebhookType })
    @IsNotEmpty()
    @IsEnum(WebhookType)
    hookType: WebhookType

    @ApiProperty({ enum: EventTypeNames })
    @IsNotEmpty()
    @IsEnum(EventTypeNames)
    eventTypeName: EventTypeNames

    @ApiProperty({ enum: ActionTypeNames, isArray: true })
    @IsNotEmpty({ each: true })
    @IsArray()
    @IsString({ each: true })
    @IsEnum(ActionTypeNames, {each: true})
    actionTypeNames: ActionTypeNames[]

    @ApiPropertyOptional()
    @IsOptional()
    @IsString() 
    secret: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isEnabled: boolean

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    triggerExampleEvent: boolean

}