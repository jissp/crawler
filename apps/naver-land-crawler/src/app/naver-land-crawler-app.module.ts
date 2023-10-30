import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@libs/config/services/config.service';
import { ConfigModule } from '@libs/config/config.module';
import { CollectController } from './controllers/collect.controller';
import { NaverLandCrawlerModule } from '@libs/naver-land-crawler/naver-land-crawler.module';
import { QueueType } from '@libs/common/interfaces/queue-type.interface';
import { QueueService } from './services/queue.service';
import { BullModule } from '@nestjs/bull';
import { CrawlerRequestConsumer } from './consumers/crawler-request.consumer';

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
            name: QueueType.CRAWLER_REQUEST,
        }),
        NaverLandCrawlerModule,
    ],
    providers: [QueueService, CrawlerRequestConsumer],
    controllers: [CollectController],
})
export class NaverLandCrawlerAppModule {}
