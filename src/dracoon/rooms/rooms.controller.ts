import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ErrorResponse } from "src/app.models";
import { DracoonAuthConfigManagerGuard, DracoonAuthGuard } from "../auth/auth.guards";
import { CreatePersonalRoomDto } from "./dtos/create-room.dto";
import { UpdatePersonalRoomDto } from "./dtos/update-room.dto";
import { RoomsService } from "./rooms.service";

@ApiTags('rooms')
@ApiBearerAuth('DRACOON Access Token')
@UseGuards(DracoonAuthGuard)
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomService: RoomsService) {}


    @UseGuards(DracoonAuthConfigManagerGuard)
    @ApiOperation({
        summary: 'List all personal rooms',
        description: 'List all registered personal rooms'
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'OK'
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
        type: ErrorResponse
    })
    @ApiQuery({
        name: 'offset',
        description: 'Pagination',
        example: 0
    })
    @Get('')
    getRooms(@Query('offset') offset: number) {
        return this.roomService.getRooms(offset);
    }

    @UseGuards(DracoonAuthConfigManagerGuard)
    @ApiOperation({
        summary: 'Create personal room',
        description: 'Create a personal room for a specific user by user id'
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'OK'
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
        type: ErrorResponse
    })
    @Post('')
    createRoom(@Body() room: CreatePersonalRoomDto) {
        return this.roomService.createRoom(room);
    }

    @UseGuards(DracoonAuthConfigManagerGuard)
    @ApiOperation({
        summary: 'Update personal room',
        description: 'Update a registered personal room by room id'
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'OK'
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
        type: ErrorResponse
    })
    @Put(':id')
    updateRoom(@Param('id') roomId: number, @Body() roomUpdate: UpdatePersonalRoomDto) {
        return this.roomService.updateRoom(roomId, roomUpdate);
    }


    @UseGuards(DracoonAuthConfigManagerGuard)
    @ApiOperation({
        summary: 'Delete personal room',
        description: 'Delete a registered personal room by room id'
    })
    @ApiOkResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No content'
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: 'Forbidden',
        type: ErrorResponse
    })
    @Delete(':id')
    @HttpCode(204)
    deleteRoom(@Param('id') id: number) {

        return this.roomService.deleteRoom(id);
    };

}