import { Schema, model } from 'mongoose';
import { ArticleDocument } from '~interfaces/articles.interface';

const schema = new Schema({
  name: String,
  price: Number,
});

export const Article = model<ArticleDocument>('Article', schema);
