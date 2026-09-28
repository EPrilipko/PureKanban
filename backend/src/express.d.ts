import { IUserSession } from '@/modules/auth';

declare module 'express' {
  interface Request {
    user?: IUserSession;
  }
}
