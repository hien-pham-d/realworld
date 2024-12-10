import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { ArticlesModule } from '../../src/articles/articles.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ArticlesModule],
    })
      .overrideProvider(PrismaClient)
      .useClass(PrismaClient)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /api/articles', () => {
    return request(app.getHttpServer()).get('/api/articles').expect(200);
  });
});
