import { NextFunction, Request, Response } from 'express';
import userModel from '~models/users.model';
import waitingListRankModel from '~models/waiting-list-rank.model';

class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userModel.findOne().then(user => res.json({ user }));
      res.json({});
    } catch (error) {
      next(error);
    }
  };
  public cleanAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userModel.deleteMany({});
      // await waitingListRankModel.deleteMany({});

      res.json({});
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
