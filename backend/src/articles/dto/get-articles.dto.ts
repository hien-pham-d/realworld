import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
export interface GetArticlesResp {
  articles: GetArticleResp[];
  articlesCount: number;
}

export interface GetArticleResp {
  slug: string;
  title: string;
  description: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorResp;
}

export interface AuthorResp {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export class FindByQueryDto {
  tag?: string;
  author?: string;
  favorited?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number;
}
