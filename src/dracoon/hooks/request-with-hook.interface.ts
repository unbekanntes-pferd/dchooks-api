import { Request } from 'express';
import { HookEvent } from './event.entity';
import { Hook } from './hook.entity';


interface RequestWithHook extends Request {
    hook: Hook;
    event: HookEvent;
}

export default RequestWithHook;