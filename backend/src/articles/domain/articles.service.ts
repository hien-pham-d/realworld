import { Article } from './articles.model';
import {
  ArticlesRepository,
  CreateArticleData,
  FindByOpts,
} from './articles.repository';

export class ArticlesService {
  constructor(private articlesRepository: ArticlesRepository) {}

  async findBy(query: FindByOpts): Promise<Article[]> {
    return await this.articlesRepository.findBy(query);
  }

  async create(data: CreateArticleData): Promise<Article> {
    return await this.articlesRepository.create(data);
  }
}
