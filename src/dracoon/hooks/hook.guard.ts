import { CanActivate, ExecutionContext, Injectable, ForbiddenException, BadRequestException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as crypto from "crypto";
import forge from "node-forge";
import RequestWithHook from "./request-with-hook.interface";
import { Hook } from "./hook.entity";
import { WebhookType } from "./hooks.models";
import { HooksService } from "./hooks.service";


@Injectable()
export class DracoonSignatureGuard implements CanActivate {

  constructor(protected readonly hookService: HooksService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request: Request = context.switchToHttp().getRequest();

    const params = request.url.split('/')[request.url.split('/').length - 1];

    let hook: Hook = undefined;

    try {

      hook = await this.hookService.getHook(params);
    }

    catch (err) {

      throw new BadRequestException("Invalid hook id format (must be UUID)");

    };

    request["hook"] = hook;

    // check for x-dracoon-signature header
    const dracoonSignatureHeader: string = request.headers['x-dracoon-signature'];

    if (!dracoonSignatureHeader) throw new ForbiddenException("Invalid DRACOON signature");
    const body = JSON.stringify(request.body);

    const hash = crypto
      .createHmac('sha256', hook.secret)
      .update(body)
      .digest('base64');

    const signature = `SHA256=${hash}`;

    console.log(signature)

    if (dracoonSignatureHeader !== signature) {

      throw new ForbiddenException("Invalid DRACOON signature");

    }

    return true;

  }

};


export class NodeHookGuard extends DracoonSignatureGuard {

  constructor(protected readonly hookService: HooksService) {
    super(hookService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
      
    const request: RequestWithHook = context.switchToHttp().getRequest();

    if (request.hook.hookType !== WebhookType.node) {

      throw new BadRequestException(`Invalid hook type: must be a node hook.`)
    };

    return true;
  }

}

export class UserHookGuard extends DracoonSignatureGuard {

  constructor(protected readonly hookService: HooksService) {
    super(hookService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
      
    const request: RequestWithHook = context.switchToHttp().getRequest();

    if (request.hook.hookType !== WebhookType.user) {

      throw new BadRequestException(`Invalid hook type: must be a user hook.`)
    };

    return true;
  }

}

export class ShareHookGuard extends DracoonSignatureGuard {

  constructor(protected readonly hookService: HooksService) {
    super(hookService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
      
    const request: RequestWithHook = context.switchToHttp().getRequest();

    if (request.hook.hookType !== WebhookType.share) {
      throw new BadRequestException(`Invalid hook type: must be a share hook.`)
    };

    return true;
  }
}

export class FileRequestHookGuard extends DracoonSignatureGuard {

  constructor(protected readonly hookService: HooksService) {
    super(hookService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
      
    const request: RequestWithHook = context.switchToHttp().getRequest();

    if (request.hook.hookType !== WebhookType.filerequest) {
      throw new BadRequestException(`Invalid hook type: must be a filerequest hook.`)
    };

    return true;
  }
}