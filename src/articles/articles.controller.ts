import { Controller, Get, Query } from '@nestjs/common';
import { GetArticlesResp, FindByQueryDto } from './dto/get-articles.dto';
import { ArticlesService } from './articles.service';
import { Article, Author } from './entities/findBy.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}
  curUser = new Author({
    id: 1,
    username: 'default',
    bio: 'bio',
    image: '',
    followedBy: [],
  });
  @Get()
  async findBy(@Query() query: FindByQueryDto): Promise<GetArticlesResp> {
    return this.mapArticlesToRespDto(
      await this.articleService.findBy({
        tag: query.tag,
        author: query.author,
        favorited: query.favorited,
        limit: query.limit,
        offset: query.offset,
      }),
    );
  }
  mapArticlesToRespDto(articles: Article[]): GetArticlesResp {
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
