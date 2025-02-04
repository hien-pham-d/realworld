import { Controller, Get, Query } from '@nestjs/common';
import { Article } from './domain/articles.model';
import { GetArticlesResp, FindByQueryDto } from './dto/get-articles.dto';
import { ArticlesService } from './domain/articles.service';
import { Author } from './domain/articles.model';

@Controller()
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  private curUser = new Author({
    id: 1,
    username: 'default',
    bio: 'bio',
    image: '',
    followedBy: [],
  });

  @Get()
  async findBy(@Query() query: FindByQueryDto): Promise<GetArticlesResp> {
    const articles = await this.articleService.findBy({
      tag: query.tag,
      author: query.author,
      favorited: query.favorited,
      limit: query.limit,
      offset: query.offset,
    });

    return this.mapArticlesToRespDto(articles);
  }
  private mapArticlesToRespDto(articles: Article[]): GetArticlesResp {
    return {
      articles: articles.map((article) => {
        const articleProps = article.props;
        return {
          slug: articleProps.slug,
          title: articleProps.title,
          description: articleProps.description,
          tagList: articleProps.tags,
          createdAt: articleProps.createdAt.toISOString(),
          updatedAt: articleProps.updatedAt.toISOString(),
          favorited: article.isFavoritedBy(this.curUser.props.id),
          favoritesCount: articleProps.favoritedBy.length,
          author: {
            username: articleProps.author.props.username,
            bio: articleProps.author.props.bio,
            image: articleProps.author.props.image,
            following: articleProps.author.isFollowedBy(this.curUser.props.id),
          },
        };
      }),
      articlesCount: articles.length,
    };
  }
}
