import { Module } from '@nestjs/common';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import { NaverLandClientModule } from '@libs/naver-land-client/naver-land-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaverLandArticle } from '@libs/naver-land-crawler/schemas/naver-land-article.schema';
import { NaverLandCrawlerService } from '@libs/naver-land-crawler/naver-land-crawler.service';
import { Coord2addressModule } from '@libs/coord2address/coord2address.module';
import { CrawlerModule } from '@libs/crawler/crawler.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([NaverLandArticle]),
        NaverLandClientModule,
        CrawlerModule,
        Coord2addressModule,
    ],
    providers: [NaverLandCrawler, NaverLandCrawlerService],
    exports: [NaverLandCrawler, NaverLandCrawlerService],
})
export class NaverLandCrawlerModule {}
