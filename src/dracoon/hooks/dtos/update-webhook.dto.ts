import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ActionTypeNames, EventTypeNames } from "../hook.enums"

// payload to update a webhook in service
export class UpdateWebhookDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name: string

    @ApiPropertyOptional({ enum: ActionTypeNames, isArray: true })
    @IsOptional()
    @IsNotEmpty({ each: true })
    @IsArray()
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

}

// payload to update a webhook in DRACOON
export class UpdateDracoonWebhookDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString() 
    secret: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isEnabled: boolean

}