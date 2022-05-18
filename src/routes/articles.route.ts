import { Router } from 'express';
import { ArticlesController } from '~controllers';
import IndexController from '~controllers/index.controller';
import { ArticlesDto } from '~dto/articles.dto';
import { Routes } from '~interfaces/routes.interface';

const controller = new ArticlesController();
const dto = new ArticlesDto();
export class ArticlesRoutes implements Routes {
  public path = '/articles';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, controller.getArticle);
    this.router.get(`${this.path}/`, controller.getArticles);
    this.router.post(`${this.path}/`, dto.createArticle, controller.createArticle);
    this.router.patch(`${this.path}/`, dto.updateArticle, controller.updateArticle);
    this.router.delete(`${this.path}/:id`, controller.deleteArticle);
  }
}
