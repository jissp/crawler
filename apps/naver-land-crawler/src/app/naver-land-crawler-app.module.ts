import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@libs/config/services/config.service';
import { ConfigModule } from '@libs/config/config.module';
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
        CrawlerModule,
        NaverLandCrawlerModule,
    ],
    providers: [],
    controllers: [CollectController],
})
export class NaverLandCrawlerAppModule {}
