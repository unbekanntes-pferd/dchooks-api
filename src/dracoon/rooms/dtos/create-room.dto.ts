import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator"


export class CreatePersonalRoomDto {

@ApiProperty()
@IsNumber()
@IsNotEmpty()
userId: number

@ApiPropertyOptional()
@IsOptional()
@IsString()
name: string

@ApiPropertyOptional()
@IsOptional()
@IsNumber()
recycleBinRetentionPeriod: number

}