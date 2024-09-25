import { Injectable } from '@nestjs/common';
import { Article, Author } from './entities/findBy.entity';
import { Prisma, PrismaClient } from '@prisma/client';
import { ArticlesRepository, FindByQueryRepo } from './articles.repository';

@Injectable()
export class ArticlesRepositoryImpl implements ArticlesRepository {
  constructor(private prismaCli: PrismaClient) {}

  async findBy(query: FindByQueryRepo): Promise<Article[]> {
    const result = await this.findByPrisma(query);
    return this.mapArticlesToEntity(result);
  }

  private async findByPrisma(query: FindByQueryRepo) {
    return await this.prismaCli.article.findMany({
      select: this.findBySelect,
      where: {
        ...(query.tag === undefined ? {} : this.findByTagWhere),
        ...(query.author === undefined ? {} : this.findByAuthorWhere),
        ...(query.favorited === undefined ? {} : this.findByFavoritedWhere),
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
          author: new Author({
            id: article.author.id,
            username: article.author.username,
            bio: article.author.bio,
            image: article.author.image,
            followedBy: article.author.followedBy.map(
              (followedBy) => followedBy.followedById,
            ),
          }),
          tags: article.tags.map((tag) => tag.tag.name),
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
          favoritedBy: article.favoritedBy.map(
            (favoritedBy) => favoritedBy.favoritedById,
          ),
        }),
    );
  }

  private readonly findBySelect = Prisma.validator<Prisma.ArticleSelect>()({
    slug: true,
    title: true,
    description: true,
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
