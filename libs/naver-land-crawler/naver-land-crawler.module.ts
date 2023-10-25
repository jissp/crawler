import { Module } from '@nestjs/common';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import { NaverLandClientModule } from '@libs/naver-land-client/naver-land-client.module';

@Module({
    imports: [NaverLandClientModule],
    providers: [NaverLandCrawler],
    exports: [NaverLandCrawler],
})
export class NaverLandCrawlerModule {}
