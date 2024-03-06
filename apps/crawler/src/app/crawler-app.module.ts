import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@libs/config/services/config.service';
import { ConfigModule } from '@libs/config/config.module';
import { BullModule } from '@nestjs/bull';
import { NaverLandCrawlerModule } from '@libs/naver-land-crawler/naver-land-crawler.module';
import { NaverLandController } from './controllers/naver-land/naver-land.controller';
import { AwsRecentController } from './controllers/aws-recent.controller';
import { AwsRecentCrawlerModule } from '@libs/aws-recent-crawler/aws-recent-crawler.module';
import { NaverLandMetaController } from './controllers/naver-land/naver-land-meta.controller';
import { NaverLandModule } from "@libs/naver-land/naver-land.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.getDatabaseConfig(),
        }),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.getRedisConfig(),
        }),
        ConfigModule,
        NaverLandModule,
        NaverLandCrawlerModule,
        AwsRecentCrawlerModule,
    ],
    providers: [],
    controllers: [
        NaverLandMetaController,
        NaverLandController,
        AwsRecentController,
    ],
})
export class CrawlerAppModule {}
