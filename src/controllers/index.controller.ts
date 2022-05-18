import { NextFunction, Request, Response } from 'express';
import { UserModel } from '~models';

class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserModel.findOne().then(user => res.json({ user }));
      res.json({});
    } catch (error) {
      next(error);
    }
  };
  public cleanAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserModel.deleteMany({});

      res.json({});
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
