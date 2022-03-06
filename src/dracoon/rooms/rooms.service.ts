import { HttpException, Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { RoomActionType } from "../hooks/dtos/action.models";
import { CreatePersonalRoomDto } from "./dtos/create-room.dto";
import { UpdatePersonalRoomDto } from "./dtos/update-room.dto";


@Injectable()
export class RoomsService {

    constructor(@Inject('ROOM_SERVICE') private roomClient: ClientProxy) {}

    logger = new Logger('RoomsService');

    async getRooms(offset: number) {

        try {

            const roomsResponse = await lastValueFrom(this.roomClient.send({msg: RoomActionType.getRooms }, offset));

            return roomsResponse;

        } 

        catch (err) {

            console.log(err);

            throw new HttpException(err, err.code);

        }

    }

    async deleteRoom(userId: number) {
        try {

            const res = await lastValueFrom(this.roomClient.send({ msg: RoomActionType.deleteRoom }, userId));

            return res;
        }

        catch (err) {
 
            throw new HttpException(err, err.code);

        }
    }

    async updateRoom(roomId: number, roomUpdate: UpdatePersonalRoomDto) {

        try {

            const res = await lastValueFrom(this.roomClient.send({ msg: RoomActionType.updateRoom }, {
                update: roomUpdate,
                id: roomId
            }));

            return res;
        }

        catch (err) {
 
            throw new HttpException(err, err.code);

        }

    }

    async syncRooms() {}

    async createRoom(room: CreatePersonalRoomDto) {

        try {

            const res = await lastValueFrom(this.roomClient.send({ msg: RoomActionType.createRoom }, room ));

            return res;
        }

        catch (err) {
 
            throw new HttpException(err, err.code);

        }

    }

}