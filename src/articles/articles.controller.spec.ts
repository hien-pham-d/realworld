import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { PrismaClient } from '@prisma/client';
import { ArticlesRepositoryImpl } from './articles.repository.impl';

describe('ArticlesController', () => {
  let articlesController: ArticlesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        ArticlesService,
        {
          provide: 'ArticlesRepository',
          useClass: ArticlesRepositoryImpl,
        },
        {
          provide: PrismaClient,
          useFactory: () => {
            return new PrismaClient({
              log: ['query', 'info', 'warn', 'error'],
            });
          },
        },
      ],
    }).compile();
    articlesController = app.get<ArticlesController>(ArticlesController);
  });

  describe('example', () => {
    test('example', () => {
      expect(articlesController).not.toEqual(undefined);
    });
  });
});
