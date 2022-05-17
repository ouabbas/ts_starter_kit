import { NextFunction, Request, Response } from 'express';
import { HttpException } from '~exceptions/HttpException';
import { RequestWithUser } from '~interfaces/auth.interface';
import { User } from '~interfaces/users.interface';
import AuthService from '~services/auth.service';

class AuthController {
  public authService = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
      const fcmToken: string = req.body?.fcmToken ?? undefined;

      console.log('Authorization', Authorization);

      if (Authorization) {
        const currentUser = await this.authService.login(Authorization, fcmToken);
        res.status(200).json({ data: currentUser, message: 'logged' });
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      console.log('ERROR', error);

      next(new HttpException(401, 'Wrong authentication token'));
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await this.authService.logout(req.user._id);
      res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
