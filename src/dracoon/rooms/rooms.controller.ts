import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiPreconditionFailedResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
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
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad request',
        type: ErrorResponse
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
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Not found',
        type: ErrorResponse
    })
    @ApiPreconditionFailedResponse({
        status: HttpStatus.PRECONDITION_FAILED,
        description: 'Precondition failed',
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
    @ApiCreatedResponse({
        status: HttpStatus.CREATED,
        description: 'Created'
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad request',
        type: ErrorResponse
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
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Not found',
        type: ErrorResponse
    })
    @ApiConflictResponse({
        status: HttpStatus.CONFLICT,
        description: 'Conflict',
        type: ErrorResponse
    })
    @ApiPreconditionFailedResponse({
        status: HttpStatus.PRECONDITION_FAILED,
        description: 'Precondition failed',
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
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad request',
        type: ErrorResponse
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
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Not found',
        type: ErrorResponse
    })
    @ApiConflictResponse({
        status: HttpStatus.CONFLICT,
        description: 'Conflict',
        type: ErrorResponse
    })
    @ApiPreconditionFailedResponse({
        status: HttpStatus.PRECONDITION_FAILED,
        description: 'Precondition failed',
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
    @ApiNoContentResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No content'
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Bad request',
        type: ErrorResponse
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
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Not found',
        type: ErrorResponse
    })
    @ApiPreconditionFailedResponse({
        status: HttpStatus.PRECONDITION_FAILED,
        description: 'Precondition failed',
        type: ErrorResponse
    })
    @Delete(':id')
    @HttpCode(204)
    deleteRoom(@Param('id') id: number) {

        return this.roomService.deleteRoom(id);
    };

}