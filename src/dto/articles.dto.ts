import { NextFunction, Request, Response } from 'express';
import { HttpException } from '~exceptions/HttpException';
import { CreateArticleData, PatchArticleData } from '~interfaces/articles.interface';

export class ArticlesDto {
  createArticle = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.name) throw new HttpException(400, 'Name field required');
      if (!req.body.price) throw new HttpException(400, 'Price field required');

      if (req.body.name.trim().length === 0) throw new HttpException(400, "Name can't be empty");
      if (typeof req.body.price !== 'number') throw new HttpException(400, 'Price has to be a number');
      if (req.body.price <= 0) throw new HttpException(400, 'Price has to be greater than 0');

      const data: CreateArticleData = {
        name: req.body.name.trim(),
        price: req.body.price,
      };

      req.body = data;

      next();
    } catch (error) {
      next(error);
    }
  };

  updateArticle = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.name) {
        if (req.body.name.trim().length === 0) throw new HttpException(400, "Name can't be empty");
      }

      if (req.body.price) {
        if (typeof req.body.price !== 'number') throw new HttpException(400, 'Price has to be a number');
        if (req.body.price <= 0) throw new HttpException(400, 'Price has to be greater than 0');
      }

      const data: PatchArticleData = {};
      if (req.body.name) data.name = req.body.name;
      if (req.body.price) data.price = req.body.price;

      req.body = data;

      next();
    } catch (error) {
      next(error);
    }
  };
}
