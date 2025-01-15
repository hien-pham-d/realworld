import { Controller, Get, Query } from '@nestjs/common';
import { GetArticlesResp, FindByQueryDto } from './dto/get-articles.dto';
import { ArticlesService } from './articles.service';

@Controller()
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}

  @Get()
  async findBy(@Query() query: FindByQueryDto): Promise<GetArticlesResp> {
    return await this.articleService.findBy({
      tag: query.tag,
      author: query.author,
      favorited: query.favorited,
      limit: query.limit,
      offset: query.offset,
    });
  }
}
