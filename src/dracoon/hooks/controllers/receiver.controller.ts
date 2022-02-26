import { Body, Controller, HttpCode, HttpStatus, NotImplementedException, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiHeader, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ErrorResponse } from "src/app.models";
import { FindOneParams } from "src/app.params";
import { NodeWebhookDto } from "../dtos/node-webhook.dto";
import RequestWithHook from "../request-with-hook.interface";
import { UserWebhookDto } from "../dtos/user-webhook.dto";
import { DracoonSignatureGuard, FileRequestHookGuard, NodeHookGuard, ShareHookGuard, UserHookGuard } from "../hook.guard";
import { ActionService } from "../action.service";
import { Payload } from "@nestjs/microservices";

@ApiTags('hooks')
@UseGuards(DracoonSignatureGuard)
@Controller('hooks')
export class ReceiverController {

    constructor(private readonly actionService: ActionService) {}

    @ApiHeader({
        name: 'X-DRACOON-Signature',
        required: true,
        description: 'HMAC256 signature'
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    @ApiOperation({
        summary: 'Receive a node webhook',
        description: 'Receive and handle a node webhook from DRACOON'
    })
    @ApiAcceptedResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Accepted',
        type: undefined
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
    @UseGuards(NodeHookGuard)
    @Post('node/:id')
    @HttpCode(202)
    handleNodeWebhook(@Param() params: FindOneParams, @Body() payload: NodeWebhookDto, @Req() request: RequestWithHook) { 

        return this.actionService.handleNodeHook(payload, request.hook);
    }

    @ApiHeader({
        name: 'X-DRACOON-Signature',
        required: true,
        description: 'HMAC256 signature'
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    @ApiOperation({
        summary: 'Receive a user webhook',
        description: 'Receive and handle a user webhook from DRACOON'
    })
    @ApiAcceptedResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Accepted',
        type: undefined
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
    @UseGuards(UserHookGuard)
    @Post('user/:id')
    @HttpCode(202)
    async handleUserWebhook(@Param() params: FindOneParams, @Body() payload: UserWebhookDto, @Req() request: RequestWithHook) { 

        return this.actionService.handleUserHook(payload, request.hook);
        
    }

    @ApiHeader({
        name: 'X-DRACOON-Signature',
        required: true,
        description: 'HMAC256 signature'
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    @Post('share/:id')
    @ApiOperation({
        summary: 'Receive a share webhook',
        description: 'Receive and handle a share webhook from DRACOON'
    })
    @ApiAcceptedResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Accepted',
        type: undefined
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
    @UseGuards(ShareHookGuard)
    @HttpCode(202)
    handleShareWebhook(@Param() params: FindOneParams, @Body() payload, @Req() request: RequestWithHook) { 

        return this.actionService.handleShareHook(payload, request.hook);
    }

    @ApiHeader({
        name: 'X-DRACOON-Signature',
        required: true,
        description: 'HMAC256 signature'
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true
    })
    @UseGuards(FileRequestHookGuard)
    @Post('filerequest/:id')
    @ApiOperation({
        summary: 'Receive a file request webhook',
        description: 'Receive and handle a file request webhook from DRACOON'
    })
    @ApiAcceptedResponse({
        status: HttpStatus.ACCEPTED,
        description: 'Accepted',
        type: undefined
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
    @HttpCode(202)
    handleFileRequestWebhook(@Param() params: FindOneParams, @Body() payload, @Req() request: RequestWithHook) { 

        return this.actionService.handleFileRequestHook(payload, request.hook);
    }

}