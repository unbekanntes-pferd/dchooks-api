import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class Range {
    @ApiProperty()
    offset: number
    @ApiProperty()
    limit: number
    @ApiProperty()
    total: number
}

export class KeyValueAttribute {
    @ApiProperty()
    key: string
    @ApiProperty()
    value: string
}

export class ErrorResponse {
    @ApiPropertyOptional()
    statusCode?: number
    @ApiPropertyOptional()
    code?: number
    @ApiPropertyOptional()
    message?: string
    @ApiPropertyOptional()
    debugInfo?: string
    @ApiPropertyOptional()
    errorCode?: number
}