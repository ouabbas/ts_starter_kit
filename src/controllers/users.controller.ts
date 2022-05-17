import { NextFunction, Request, Response } from 'express';
import { HttpException } from '~exceptions/HttpException';
import { RequestWithUser } from '~interfaces/auth.interface';
import { User } from '~interfaces/users.interface';
import AuthService from '~services/auth.service';

class UsersController {
    public findUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userModel.findOne()
            res.json({ user });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;
