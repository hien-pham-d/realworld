import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ArticlesModule } from '../../src/articles/articles.module';
import { PrismaClient } from '@prisma/client';
import { FindByQueryDto } from 'src/articles/dto/get-articles.dto';

describe('Integration Test', () => {
  let app: INestApplication;
  let prisma: PrismaClient = new PrismaClient();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ArticlesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();

    await truncateDatabase(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    await prisma.author.create({
      data: {
        id: 1,
        username: 'default',
        bio: 'I am the default user of this site',
        image: 'this should be an image',
      },
    });
  });

  afterEach(async () => {
    await truncateDatabase(prisma);
  });

  it('Should write/read an article successfully via POST/GET /articles', async () => {
    const response = await request(app.getHttpServer())
      .post('/articles')
      .send({
        article: {
          body: 'body-test',
          description: 'description-test',
          title: 'title-test',
          tagList: ['tag1-test', 'tag2-test'],
        },
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      article: {
        slug: expect.any(String),
        title: 'title-test',
        description: 'description-test',
        body: 'body-test',
        tagList: expect.arrayContaining(['tag1-test', 'tag2-test']),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        favorited: false,
        favoritesCount: 0,
        author: {
          bio: 'I am the default user of this site',
          following: false,
          image: 'this should be an image',
          username: 'default',
        },
      },
    });

    const getResponse = await request(app.getHttpServer()).get('/articles');

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual({
      articles: expect.arrayContaining([
        {
          slug: expect.any(String),
          title: 'title-test',
          description: 'description-test',
          tagList: expect.arrayContaining(['tag1-test', 'tag2-test']),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          favorited: false,
          favoritesCount: 0,
          author: {
            bio: 'I am the default user of this site',
            following: false,
            image: 'this should be an image',
            username: 'default',
          },
        },
      ]),
      articlesCount: 1,
    });
  });

  describe('Should return validation error (400) when GET /articles with an invalid query parameter.', () => {
    const cases: {
      query: Record<string, any>;
      errMessage: string;
    }[] = [
      {
        query: { limit: 'invalid' },
        errMessage: 'limit must be an integer number',
      },
      {
        query: { limit: '0' },
        errMessage: 'limit must not be less than 1',
      },
      {
        query: { tag: '' },
        errMessage: 'tag should not be empty',
      },
    ];

    test.each(cases)('$errMessage', async ({ query, errMessage }) => {
      const response = await request(app.getHttpServer()).get(
        `/articles?${new URLSearchParams(query).toString()}`,
      );

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(errMessage);
    });
  });
});

async function truncateDatabase(prisma: PrismaClient) {
  const tables = await prisma.$queryRaw<Array<{ name: string }>>`
		SELECT name 
		FROM sqlite_master 
		WHERE type='table' 
			AND name NOT LIKE 'sqlite_%' 
			AND name != '_prisma_migrations';
  `;

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${table.name}";`);
  }
}
