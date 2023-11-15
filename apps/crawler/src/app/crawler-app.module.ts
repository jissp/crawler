import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@libs/config/services/config.service';
import { ConfigModule } from '@libs/config/config.module';
import { QueueType } from '@libs/common/interfaces/queue-type.interface';
import { BullModule } from '@nestjs/bull';
import { CrawlerNaverLandRequestConsumer } from './consumers/crawler-naver-land-request.consumer';
import { NaverLandCrawlerModule } from '@libs/naver-land-crawler/naver-land-crawler.module';
import { NaverLandCrawlerQueue } from './queues/naver-land-crawler-queue';
import { NaverLandController } from './controllers/naver-land/naver-land.controller';
import { AwsRecentController } from './controllers/aws-recent.controller';
import { AwsRecentCrawlerModule } from '@libs/aws-recent-crawler/aws-recent-crawler.module';
import { NaverLandMetaController } from './controllers/naver-land/naver-land-meta.controller';

const QueueProviders = [NaverLandCrawlerQueue];
const ConsumerProviders = [CrawlerNaverLandRequestConsumer];

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
        BullModule.registerQueue({
            name: QueueType.CRAWLER_NAVER_LAND_REQUEST,
        }),
        ConfigModule,
        NaverLandCrawlerModule,
        AwsRecentCrawlerModule,
    ],
    providers: [...QueueProviders, ...ConsumerProviders],
    controllers: [NaverLandMetaController, NaverLandController, AwsRecentController],
})
export class CrawlerAppModule {}
