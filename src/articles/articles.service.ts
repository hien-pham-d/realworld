import { Inject, Injectable } from '@nestjs/common';
import { Article } from './entities/findBy.entity';
import { ArticlesRepository, FindByQueryRepo } from './articles.repository';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ArticlesRepository')
    private articlesRepository: ArticlesRepository,
  ) {}

  async findBy(query: FindByQueryRepo): Promise<Article[]> {
    return await this.articlesRepository.findBy(query);
  }
}
