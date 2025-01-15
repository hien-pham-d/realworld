import { Inject, Injectable } from '@nestjs/common';
import { Article, Author } from './entities/findBy.entity';
import { ArticlesRepository, FindByQueryRepo } from './articles.repository';
import { GetArticlesResp } from './dto/get-articles.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ArticlesRepository')
    private articlesRepository: ArticlesRepository,
  ) {}

  private curUser = new Author({
    id: 1,
    username: 'default',
    bio: 'bio',
    image: '',
    followedBy: [],
  });

  async findBy(query: FindByQueryRepo): Promise<GetArticlesResp> {
    return this.mapArticlesToRespDto(
      await this.articlesRepository.findBy(query),
    );
  }

  private mapArticlesToRespDto(articles: Article[]): GetArticlesResp {
    return {
      articles: articles.map((article) => {
        return {
          slug: article.slug,
          title: article.title,
          description: article.description,
          tagList: article.tags,
          createdAt: article.createdAt.toISOString(),
          updatedAt: article.updatedAt.toISOString(),
          favorited: article.isFavoritedBy(this.curUser.id),
          favoritesCount: article.favoritedBy.length,
          author: {
            username: article.author.username,
            bio: article.author.bio,
            image: article.author.image,
            following: article.author.isFollowedBy(this.curUser.id),
          },
        };
      }),
      articlesCount: articles.length,
    };
  }
}
