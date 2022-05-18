import { Request, Response } from 'express';
import { CreateArticleData, PatchArticleData } from '~interfaces/articles.interface';
import { ArticlesService } from '~services';

const articlesService = new ArticlesService();
export class ArticlesController {
  //     get un article
  getArticle = async (req: Request, res: Response) => {
    const articleId = req.params.id;

    const article = await articlesService.getArticle(articleId);

    res.json({ article });
  };

  // get tous les articles
  getArticles = async (req: Request, res: Response) => {
    const articles = await articlesService.getArticles();

    res.json({ articles });
  };

  // create article
  createArticle = async (req: Request, res: Response) => {
    const data: CreateArticleData = req.body;

    const newArticle = await articlesService.createArticle(data);

    res.json({ article: newArticle });
  };

  // update article
  updateArticle = async (req: Request, res: Response) => {
    const articleId: string = req.params.id;
    const data: PatchArticleData = req.body;

    const newArticle = await articlesService.updateArticle(articleId, data);

    res.json({ article: newArticle });
  };

  // delete article
  deleteArticle = async (req: Request, res: Response) => {
    const articleId: string = req.params.id;

    await articlesService.deleteArticle(articleId);

    res.json({ message: 'sucess' });
  };
}
