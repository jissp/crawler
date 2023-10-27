import { Module } from '@nestjs/common';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import { NaverLandClientModule } from '@libs/naver-land-client/naver-land-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NaverLandArticle } from '@libs/naver-land-crawler/schemas/naver-land-article.schema';
import { NaverLandCrawlerService } from '@libs/naver-land-crawler/naver-land-crawler.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([NaverLandArticle]),
        NaverLandClientModule,
    ],
    providers: [NaverLandCrawler, NaverLandCrawlerService],
    exports: [NaverLandCrawler, NaverLandCrawlerService],
})
export class NaverLandCrawlerModule {}
