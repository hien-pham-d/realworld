import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class CreateArticleArticleDto {
  body: string;

  description: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty({ each: true })
  tagList: string[];
}

export class CreateArticleDto {
  @Type(() => CreateArticleArticleDto)
  @ValidateNested()
  article: CreateArticleArticleDto;
}

export interface CreateArticleResp {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      bio: string;
      following: boolean;
      image: string;
      username: string;
    };
  };
}
