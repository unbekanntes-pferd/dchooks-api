export interface AuthTokenResponse {
    access_token: string
    token_type: string
    refresh_token: string
    expires_in: number
    scope: string
}

interface Role {
    id: number
    name: string
    description: string

}

interface RoleList {
    items: Role[]
}

enum AuthenticationMethod {
    basic = "basic",
    active_directory = "active_directory",
    radius = "radius",
    openid = "openid"
}

interface UserAuthData {
    method: AuthenticationMethod
    login?: string
    password?: string
    mustChangePassword?: boolean
    adConfigId?: number
    oidConfigId?: number
}

export interface UserAccount {
    id: number
    userName: string
    firstName: string
    lastName: string
    isLocked: boolean
    hasManageableRooms: boolean
    userRoles: RoleList
    language: string
    authData: UserAuthData
    mustSetEmail?: boolean
    needsToAcceptEULA?: boolean
    expireAt: Date
    isEncryptionEnabled?: boolean
    lastLoginSuccessAt?: Date
    lastLoginFailAt?: Date
    email?: string
    phone?: string
    homeRoomId?: number
    customer?: any
}

export enum DRACOONAdmin {
    UserManager = "usermanager",
    RoomAdmin = "roomadmin"
}