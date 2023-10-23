import { Module } from '@nestjs/common';
import { NaverLandCrawlerModule } from '@libs/crawler/naver-land-crawler/naver-land-crawler.module';

@Module({
    imports: [NaverLandCrawlerModule],
})
export class CrawlerModule {}
