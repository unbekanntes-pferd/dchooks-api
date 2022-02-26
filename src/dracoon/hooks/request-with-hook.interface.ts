import { Request } from 'express';
import { Hook } from './hook.entity';


interface RequestWithHook extends Request {
    hook: Hook;
}

export default RequestWithHook;