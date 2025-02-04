import { Article } from './articles.model';
import { ArticlesRepository, FindByOpts } from './articles.repository';

export class ArticlesService {
  constructor(private articlesRepository: ArticlesRepository) {}

  async findBy(query: FindByOpts): Promise<Article[]> {
    return this.articlesRepository.findBy(query);
  }
}
