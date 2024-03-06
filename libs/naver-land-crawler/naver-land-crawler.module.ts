import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NaverLandClientModule } from '@libs/naver-land-client/naver-land-client.module';
import { Coord2addressModule } from '@libs/coord2address/coord2address.module';
import { NaverLandTransformer } from '@libs/naver-land-crawler/naver-land.transformer';
import { NaverLandCrawlerQueueType } from '@libs/naver-land-crawler/interfaces/queue.interface';
import {
    ArticleTransformProcessor,
    GetNaverLandArticleProcessor,
} from '@libs/naver-land-crawler/processors';
import { NaverLandCrawlerQueueService } from '@libs/naver-land-crawler/services';
import { NaverLandModule } from '@libs/naver-land/naver-land.module';

const processors = [GetNaverLandArticleProcessor, ArticleTransformProcessor];

@Module({
    imports: [
        BullModule.registerQueue(
            {
                name: NaverLandCrawlerQueueType.RequestArticle,
            },
            {
                name: NaverLandCrawlerQueueType.TransformArticle,
            },
        ),
        Coord2addressModule,
        NaverLandClientModule,
        NaverLandModule,
    ],
    providers: [
        ...processors,
        NaverLandCrawlerQueueService,
        NaverLandTransformer,
    ],
    exports: [NaverLandCrawlerQueueService],
})
export class NaverLandCrawlerModule {}
