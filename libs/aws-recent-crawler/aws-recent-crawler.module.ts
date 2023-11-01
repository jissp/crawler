import { Module } from '@nestjs/common';
import { CrawlerModule } from '@libs/crawler/crawler.module';
import { AwsRecentCrawler } from '@libs/aws-recent-crawler/aws-recent-crawler';
import { AwsRecentCrawlerService } from '@libs/aws-recent-crawler/aws-recent-crawler.service';
import { AwsRecentClientModule } from '@libs/aws-recent-client/aws-recent-client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsRecentArticle } from '@libs/aws-recent-crawler/schemas/aws-recent-article.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([AwsRecentArticle]),
        CrawlerModule,
        AwsRecentClientModule,
    ],
    providers: [AwsRecentCrawler, AwsRecentCrawlerService],
    exports: [AwsRecentCrawler, AwsRecentCrawlerService],
})
export class AwsRecentCrawlerModule {}
