import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

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
  @IsOptional()
  @IsNotEmpty()
  tag?: string;

  @IsOptional()
  @IsNotEmpty()
  author?: string;

  @IsOptional()
  @IsNotEmpty()
  // This is username of the user who favorited the article.
  favorited?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  offset?: number;
}
