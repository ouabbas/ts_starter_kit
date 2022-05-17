import { Request } from 'express';
import { User } from '~interfaces/users.interface';

export interface CookieData {
  name: string;
  token: string;
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
