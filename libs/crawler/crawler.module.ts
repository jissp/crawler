import { Module } from '@nestjs/common';
import { NaverLandCrawlerModule } from '@libs/crawler/naver-land-crawler/naver-land-crawler.module';
import { CrawlerService } from '@libs/crawler/services/crawler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crawling } from '@libs/crawler/schemas/crawling.schema';

@Module({
    imports: [TypeOrmModule.forFeature([Crawling]), NaverLandCrawlerModule],
    providers: [CrawlerService],
    exports: [CrawlerService],
})
export class CrawlerModule {}
