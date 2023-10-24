import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@libs/config/services/config.service';
import { ConfigModule } from '@libs/config/config.module';
import { Article } from '@libs/crawler/schemas/article.schema';
import { NaverLandArticle } from '@libs/crawler/naver-land-crawler/schemas/naver-land-article.schema';
import { NaverLandArticleService } from './services/naver-land-article.service';
import { CrawlerModule } from '@libs/crawler/crawler.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.getDatabaseConfig(),
        }),
        TypeOrmModule.forFeature([Article, NaverLandArticle]),
        CrawlerModule,
    ],
    controllers: [],
    providers: [NaverLandArticleService],
    exports: [NaverLandArticleService],
})
export class NaverLandCrawlerAppModule {}
