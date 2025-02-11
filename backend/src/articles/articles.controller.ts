import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { Article } from './domain/articles.model';
import { GetArticlesResp, FindByQueryDto } from './dto/get-articles.dto';
import { ArticlesService } from './domain/articles.service';
import { Author } from './domain/articles.model';
import { CreateArticleDto, CreateArticleResp } from './dto/post-articles.dto';

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
  @HttpCode(200)
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

  @Post()
  @HttpCode(201)
  async createArticles(
    @Body() body: CreateArticleDto,
  ): Promise<CreateArticleResp> {
    const article = await this.articleService.create({
      body: body.article.body,
      description: body.article.description,
      title: body.article.title,
      tagList: body.article.tagList,
      authorId: this.curUser.id,
    });

    return {
      article: {
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tags,
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
        favorited: article.isFavoritedBy(this.curUser.id),
        favoritesCount: article.favoritedBy.length,
        author: {
          bio: article.author.bio,
          following: article.author.isFollowedBy(this.curUser.id),
          image: article.author.image,
          username: article.author.username,
        },
      },
    };
  }
}
