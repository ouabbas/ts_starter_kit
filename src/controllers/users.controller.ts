import { NextFunction, Request, Response } from 'express';
import { HttpException } from '~exceptions/HttpException';
import { User } from '~interfaces/users.interface';
import { UserModel } from '~models';

class UsersController {
  public findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findOne();
      res.json({ user });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
