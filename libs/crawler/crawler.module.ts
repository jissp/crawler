import { Module } from '@nestjs/common';
import { ArticleService } from '@libs/crawler/services/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@libs/crawler/schemas/article.schema';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [ArticleService],
    exports: [ArticleService],
})
export class CrawlerModule {}
