import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { RouterModule } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { ArticlesRepositoryImpl } from './articles.repository.impl';

@Module({
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
  imports: [
    RouterModule.register([{ path: 'api/articles', module: ArticlesModule }]),
  ],
})
export class ArticlesModule {}
