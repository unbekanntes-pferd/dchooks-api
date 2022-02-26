import { Request } from 'express';
import { UserAccount } from './auth.models';

interface RequestWithUserAccount extends Request {
    user: UserAccount;
    token: string;
}

export default RequestWithUserAccount;