import { Article } from './articles.model';

export interface FindByOpts {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface ArticlesRepository {
  findBy: (query: FindByOpts) => Promise<Article[]>;
  create: (data: CreateArticleData) => Promise<Article>;
}

export interface CreateArticleData {
  body: string;
  description: string;
  title: string;
  tagList: string[];
  authorId: number;
}
