import { Article } from './entities/findBy.entity';

export interface FindByQueryRepo {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface ArticlesRepository {
  findBy: (query: FindByQueryRepo) => Promise<Article[]>;
}
