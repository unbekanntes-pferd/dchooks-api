
interface Range {
    offset: number
    limit: number
    total: number
}

enum UserType {
    internal = "internal",
    external = "external",
    system = "system",
    deleted = "deleted"
}

interface UserInfo {
    id: number
    userType: UserType
    avatarUuid: string
    userName: string
    firstName: string
    lastName: string
    email?: string
}

export interface Webhook {
    id: number
    name: string
    url: string
    secret?: string
    isEnabled: boolean
    expireAt: Date
    eventTypeNames: string[]
    createdAt: Date
    createdBy?: UserInfo
    updatedAt: Date
    updatedBy?: UserInfo
    failStatus?: number

}

export interface WebhookList {

    range: Range
    items: Webhook[]

}

