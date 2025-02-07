import { Injectable } from '@nestjs/common';
import { Article, Author } from './domain/articles.model';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  ArticlesRepository,
  CreateArticleData,
  FindByOpts,
} from './domain/articles.repository';

@Injectable()
export class ArticlesRepositoryImpl implements ArticlesRepository {
  constructor(private prismaCli: PrismaClient) {}

  async findBy(query: FindByOpts): Promise<Article[]> {
    const result = await this.findByPrisma(query);
    return this.mapArticlesToEntity(result);
  }

  async create(data: CreateArticleData): Promise<Article> {
    const result = await this.prismaCli.article.create({
      data: {
        title: data.title,
        description: data.description,
        body: data.body,
        tags: {
          create: [
            ...data.tagList.map((tag) => ({
              tag: { create: { name: tag } },
            })),
          ],
        },
        authorId: data.authorId,
      },
      select: {
        slug: true,
        title: true,
        description: true,
        body: true,
        tags: { select: { tag: { select: { name: true } } } },
        createdAt: true,
        updatedAt: true,
        favoritedBy: true,
        author: {
          select: {
            id: true,
            username: true,
            bio: true,
            image: true,
            followedBy: { select: { followedById: true } },
          },
        },
      },
    });

    return new Article({
      slug: result.slug,
      title: result.title,
      description: result.description,
      body: result.body,
      tags: result.tags.map((tag) => tag.tag.name),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      favoritedBy: [],
      author: new Author({
        id: result.author.id,
        username: result.author.username,
        bio: result.author.bio,
        image: result.author.image,
        followedBy: result.author.followedBy.map(
          (followedBy) => followedBy.followedById,
        ),
      }),
    });
  }

  private async findByPrisma(query: FindByOpts) {
    return await this.prismaCli.article.findMany({
      select: this.findBySelect,
      where: {
        ...(query.tag === undefined ? {} : this.findByTagWhere(query.tag)),
        ...(query.author === undefined
          ? {}
          : this.findByAuthorWhere(query.author)),
        ...(query.favorited === undefined
          ? {}
          : this.findByFavoritedWhere(query.favorited)),
      },
      skip: query.offset,
      take: query.limit,
    });
  }

  private mapArticlesToEntity(
    articles: Prisma.PromiseReturnType<typeof this.findByPrisma>,
  ): Article[] {
    return articles.map(
      (article) =>
        new Article({
          slug: article.slug,
          title: article.title,
          description: article.description,
          body: article.body,
          tags: article.tags.map((tag) => tag.tag.name),
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
          favoritedBy: article.favoritedBy.map(
            (favoritedBy) => favoritedBy.favoritedById,
          ),
          author: new Author({
            id: article.author.id,
            username: article.author.username,
            bio: article.author.bio,
            image: article.author.image,
            followedBy: article.author.followedBy.map(
              (followedBy) => followedBy.followedById,
            ),
          }),
        }),
    );
  }

  private readonly findBySelect = Prisma.validator<Prisma.ArticleSelect>()({
    slug: true,
    title: true,
    description: true,
    body: true,
    tags: {
      select: {
        tag: {
          select: { id: true, name: true },
        },
      },
    },
    createdAt: true,
    updatedAt: true,
    author: {
      select: {
        id: true,
        username: true,
        bio: true,
        image: true,
        followedBy: {
          select: {
            followedById: true,
          },
        },
      },
    },
    favoritedBy: {
      select: {
        favoritedById: true,
      },
    },
  });

  private findByTagWhere(tag: string) {
    return Prisma.validator<Prisma.ArticleWhereInput>()({
      tags: {
        some: {
          tag: {
            name: {
              equals: tag,
            },
          },
        },
      },
    });
  }

  private findByAuthorWhere(username: string) {
    return Prisma.validator<Prisma.ArticleWhereInput>()({
      author: {
        username: {
          equals: username,
        },
      },
    });
  }

  private findByFavoritedWhere(username: string) {
    return Prisma.validator<Prisma.ArticleWhereInput>()({
      favoritedBy: {
        some: {
          favoritedBy: {
            username: {
              equals: username,
            },
          },
        },
      },
    });
  }
}
