import { CreateArticleData, PatchArticleData } from '~interfaces/articles.interface';
import { Article } from '~models';

export class ArticlesService {
  //     get un article
  getArticle = async (articleId: string) => {
    const article = await Article.findById(articleId).lean();

    return article;
  };

  // get tous les articles
  getArticles = async () => {
    const articles = await Article.find().lean();

    return articles;
  };

  // create article
  createArticle = async (articleDate: CreateArticleData) => {
    const newArticle = new Article();

    newArticle.name = articleDate.name;
    newArticle.price = articleDate.price;

    await newArticle.save();

    return newArticle;
  };

  // update article
  updateArticle = async (articleId: string, articleData: PatchArticleData) => {
    // const article = await Article.findById(articleId);

    // if (articleData.name) article.name = articleData.name;
    // if (articleData.price) article.price = articleData.price;

    // await article.save();

    const article = await Article.updateOne({ _id: articleId }, { ...articleData }, { new: true });

    return article;
  };

  // delete article
  deleteArticle = async (articleId: string) => {
    await Article.deleteOne({ _id: articleId });
  };
}
