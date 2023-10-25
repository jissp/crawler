import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@libs/config/services/config.service';
import { ConfigModule } from '@libs/config/config.module';
import { NaverLandArticle } from './schemas/naver-land-article.schema';
import { NaverLandArticleService } from './services/naver-land-article.service';
import { CrawlerModule } from '@libs/crawler/crawler.module';
import { CollectController } from './controllers/collect.controller';
import { NaverLandCrawlerModule } from '@libs/naver-land-crawler/naver-land-crawler.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.getDatabaseConfig(),
        }),
        TypeOrmModule.forFeature([NaverLandArticle]),
        CrawlerModule,
        NaverLandCrawlerModule,
    ],
    providers: [NaverLandArticleService],
    controllers: [CollectController],
})
export class NaverLandCrawlerAppModule {}
