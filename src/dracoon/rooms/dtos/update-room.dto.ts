import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator"


export class UpdatePersonalRoomDto {

    @ApiPropertyOptional()
    @IsOptional()
    @ValidateIf(name => name !== undefined || name !== null)
    @IsString()
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @ValidateIf(quota => quota !== undefined || quota !== null)
    @IsNumber()
    quota: number


}