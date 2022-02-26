import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class NodePayload { 

    @ApiProperty()
    @IsString()
    baseUrl: string

    @ApiProperty()
    @IsNumber()
    id: number

    @ApiProperty()
    @IsString()
    type: string

    @ApiProperty()
    @IsString()
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    parentId: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    parentPath: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    createdAt: Date

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    createdById: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    updatedAt: Date

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    updatedById: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    expireAt: Date

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    hash: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    fileType: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    mediaType: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    size: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    classification: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    notes: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    inheritPermissions: boolean

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    isEncrypted: boolean

    @ApiPropertyOptional()
    @IsNumber()
    cntDeletedVersions: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    cntDownloadShares: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    cntUploadShares: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    recycleBinRetentionPeriod: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    hasActivitiesLog: boolean

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    quota: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    branchVersion: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    mediaToken: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    cntRooms: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    cntFolders: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    cntFiles: number
}

export class NodeWebhookDto {

    @ApiProperty()
    @IsNotEmpty()
    payload: NodePayload
}
