import { Controller, Post, UseGuards, Request, HttpStatus, Body, Get, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { DracoonAuthConfigManagerGuard, DracoonAuthGuard } from '../../auth/auth.guards';
import { RegisterWebhookDto } from '../dtos/register-webhook.dto';
import { HooksService } from '../hooks.service';
import { Webhook } from '../hooks.models';
import { ErrorResponse } from 'src/app.models';
import { Hook } from '../hook.entity';
import { FindOneParams } from 'src/app.params';
import { UpdateWebhookDto } from '../dtos/update-webhook.dto';
import RequestWithUserAccount from 'src/dracoon/auth/request-with-user.interface';
import { EventService } from '../event.service';
import { HookEvent } from '../event.entity';
 
@ApiBearerAuth('DRACOON Access Token')
@ApiTags('hook administration')
@Controller('hooks')
@UseGuards(DracoonAuthGuard)
export class HooksController {

    constructor(private readonly hooksService: HooksService, private readonly eventService: EventService) {}

    @UseGuards(DracoonAuthConfigManagerGuard)
    @Get('')
    @ApiOperation({
        summary: 'List all webhooks',
        description: 'List all registered webhooks'
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'OK',
        type: [Hook]
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
    async listHooks() {

        return this.hooksService.listHooks();
    }


    @UseGuards(DracoonAuthConfigManagerGuard)
    @Post('')
    @ApiOperation({
        summary: 'Register webhook',
        description: 'Register a webhook for specific event types to trigger certain action types'
    })
    @ApiCreatedResponse({
        status: HttpStatus.CREATED,
        description: 'Created',
        type: Webhook
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
    @ApiConflictResponse({
        status: HttpStatus.CONFLICT,
        description: 'Conflict',
        type: ErrorResponse
    })
    async registerHook(@Body() registerHookDto: RegisterWebhookDto, @Request() req: RequestWithUserAccount) {

        return this.hooksService.registerHook(req.token, registerHookDto);
    };

    @UseGuards(DracoonAuthConfigManagerGuard)
    @Get('/events')
    @ApiOperation({
        summary: 'List all webhook events',
        description: 'List all events of all registered webhooks'
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'OK',
        type: [HookEvent]
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    async listHookEvents() {

        return this.eventService.getEvents();
    }

    @UseGuards(DracoonAuthConfigManagerGuard)
    @Delete('/events')
    @ApiOperation({
        summary: 'Clear all webhook events',
        description: 'Clear (delete) all events of all registered webhooks'
    })
    @ApiNoContentResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No content',
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    async clearEvents() {

        await this.eventService.clearEvents();

        return;
    }


    @UseGuards(DracoonAuthConfigManagerGuard)
    @Get(':id')
    @ApiOperation({
        summary: 'Get webhook info',
        description: 'Get info on registered webhook'
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'OK',
        type: Hook
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    async getHook(@Param() params: FindOneParams) {

        return this.hooksService.getHook(params.id);
    };

    @UseGuards(DracoonAuthConfigManagerGuard)
    @Put(':id')
    @ApiOperation({
        summary: 'Update webhook info',
        description: 'Update info for registered webhook'
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'OK',
        type: Hook
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    async updateHook(@Param() params: FindOneParams, @Body() updatePayload: UpdateWebhookDto, @Request() req: RequestWithUserAccount) {

        return this.hooksService.updateHook(req.token, params.id, updatePayload);
    };

    @UseGuards(DracoonAuthConfigManagerGuard)
    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Delete webhook',
        description: 'Delete webhook from service and in DRACOON'
    })
    @ApiNoContentResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No content',
        type: undefined
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    async deleteHook(@Param() params: FindOneParams, @Request() req: RequestWithUserAccount) {

        const hook = await this.hooksService.getHook(params.id);

        await this.hooksService.unregisterWebhook(req.token, hook);

        return;
    };

    @UseGuards(DracoonAuthConfigManagerGuard)
    @Get(':id/events')
    @ApiOperation({
        summary: 'Get webhook events',
        description: 'Get events of registered webhook'
    })
    @ApiOkResponse({
        status: HttpStatus.OK,
        description: 'OK',
        type: [HookEvent]
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    async getHookEvents(@Param() params: FindOneParams) {

        return this.eventService.getHookEvents(params.id);
    };

    @UseGuards(DracoonAuthConfigManagerGuard)
    @Delete(':id/events')
    @ApiOperation({
        summary: 'Clear webhook events',
        description: 'Clear (delete) events of registered webhook'
    })
    @ApiNoContentResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No content',
    })
    @ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Unauthorized',
        type: ErrorResponse
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    async clearHookEvents(@Param() params: FindOneParams) {

        await this.eventService.clearHookEvents(params.id);

        return;
    };

}
