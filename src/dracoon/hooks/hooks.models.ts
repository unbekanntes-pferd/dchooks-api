import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Range } from "src/app.models";

enum UserType {
    internal = "internal",
    external = "external",
    system = "system",
    deleted = "deleted"
}

class UserInfo {

    @ApiProperty()
    id: number
    @ApiProperty()
    userType: UserType
    @ApiProperty()
    avatarUuid: string
    @ApiProperty()
    userName: string
    @ApiProperty()
    firstName: string
    @ApiProperty()
    lastName: string
    @ApiPropertyOptional()
    email?: string
}

export class Webhook {
    @ApiProperty()
    id: number
    @ApiProperty()
    name: string
    @ApiProperty()
    url: string
    @ApiPropertyOptional()
    secret?: string
    @ApiProperty()
    isEnabled: boolean
    @ApiProperty()
    expireAt: Date
    @ApiProperty()
    eventTypeNames: string[]
    @ApiProperty()
    createdAt: Date
    @ApiPropertyOptional()
    createdBy?: UserInfo
    @ApiProperty()
    updatedAt: Date
    @ApiPropertyOptional()
    updatedBy?: UserInfo
    @ApiPropertyOptional()
    failStatus?: number

}

export class WebhookList {

    range: Range
    items: Webhook[]

}

export enum WebhookType {

    node = 'node',
    user = 'user',
    share = 'share',
    filerequest = 'filerequest',
    
}


