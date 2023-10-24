import { Module } from '@nestjs/common';
import { NaverLandCrawlerModule } from '@libs/crawler/naver-land-crawler/naver-land-crawler.module';
import { ArticleService } from '@libs/crawler/services/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@libs/crawler/schemas/article.schema';

@Module({
    imports: [TypeOrmModule.forFeature([Article]), NaverLandCrawlerModule],
    providers: [ArticleService],
    exports: [ArticleService],
})
export class CrawlerModule {}
