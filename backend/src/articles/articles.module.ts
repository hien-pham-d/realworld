import { Module } from '@nestjs/common';
import { ArticlesService } from './domain/articles.service';
import { ArticlesController } from './articles.controller';
import { RouterModule } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { ArticlesRepositoryImpl } from './articles.repository.impl';

@Module({
  controllers: [ArticlesController],
  providers: [
    {
      provide: ArticlesService,
      useFactory: () => {
        return new ArticlesService(
          new ArticlesRepositoryImpl(
            new PrismaClient({
              log: ['query', 'info', 'warn', 'error'],
            }),
          ),
        );
      },
    },
  ],
  imports: [
    RouterModule.register([{ path: '/articles', module: ArticlesModule }]),
  ],
})
export class ArticlesModule {}
