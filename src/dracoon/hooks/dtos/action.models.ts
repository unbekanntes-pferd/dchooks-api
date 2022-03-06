import { EventTypeNames } from "../hook.enums";

export enum RoomActionType {

    createRoom = "create.room",
    deleteRoom = "delete.room",
    updateRoom = "update.room",
    syncRooms = "sync.rooms",
    getRooms = "get.rooms"
}



export class Message { 
    msg: EventTypeNames
}