import { WebhookType } from "./hooks.models";

export enum EventTypeNames {

    userCreated = "user.created",
    userDeleted = "user.deleted",
    userLocked = "user.locked",
    webhookExpiring = "webhook.expiring",
    downloadShareCreated = "downloadshare.created",
    downloadShareDeleted = "downloadshare.deleted",
    downloadShareUsed = "downloadshare.used",
    uploadShareCreated = "uploadshare.created",
    uploadShareDeleted = "uploadshare.deleted",
    uploadShareUsed = "uploadshare.used",
    fileCreated = "file.created",
    fileDeleted = "file.deleted",
    folderCreated = "folder.created",
    folderDeleted = "folder.deleted",
    roomCreated = "room.created",
    roomDeleted = "room.deleted"

}

export enum ActionTypeNames {
    sendEmail = "send.email",
    createRoom = "create.room",
    logEvent = "log.event"
};

export type NodeEvents = EventTypeNames.fileCreated | EventTypeNames.fileDeleted | EventTypeNames.folderCreated | EventTypeNames.folderDeleted | EventTypeNames.roomCreated | EventTypeNames.roomDeleted
export type UserEvents = EventTypeNames.userCreated | EventTypeNames.userDeleted | EventTypeNames.userLocked
export type ShareEvents = EventTypeNames.downloadShareCreated | EventTypeNames.downloadShareDeleted
export type FileRequestEvents = EventTypeNames.uploadShareCreated | EventTypeNames.uploadShareDeleted