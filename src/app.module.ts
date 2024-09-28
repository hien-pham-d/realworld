import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [ConfigModule.forRoot(), ArticlesModule],
})
export class AppModule {}
