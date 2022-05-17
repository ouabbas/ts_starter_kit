import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '~exceptions/HttpException';
import { RequestWithUser } from '~interfaces/auth.interface';
import userModel from '~models/users.model';
import fb from '~utils/firebase-admin';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      const decodedToken: any = await fb.auth().verifyIdToken(Authorization);
      if (!decodedToken) {
        throw new HttpException(400, `Sorry, invalid or expired token`);
      }

      const firebaseUID: string = decodedToken.user_id;
      const loggedUser = await userModel.findOne({ firebaseUID: firebaseUID });

      if (loggedUser) {
        req.user = loggedUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
