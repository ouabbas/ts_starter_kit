import { Document } from 'mongoose';

export type ArticleDocument = Article_I & Document;
export interface Article_I {
  _id: string;
  name: string;
  price: number;
}

export interface CreateArticleData {
  name: string;
  price: number;
}

export interface PatchArticleData {
  name?: string;
  price?: number;
}
