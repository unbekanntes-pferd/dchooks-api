import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"


export class UserPayload { 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    baseUrl: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userName: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    login: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    authMethod: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string


    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isLocked: boolean

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    avatarUuid: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    phone: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    title: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    expireAt: Date

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    hasManageableRooms: boolean

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isEncryptionEnabled: boolean

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    lastLoginSuccessAt: Date

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    homeRoomId: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    language: string

}

export class UserWebhookDto {

    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserPayload)
    payload: UserPayload

}
