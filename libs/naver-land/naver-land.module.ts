import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    NaverLandArticle,
    NaverLandArticleBasicInfo,
    NaverLandArticleComplex,
    NaverLandArticleKey,
    NaverLandArticleTransport,
} from '@libs/naver-land/schemas';
import {
    NaverLandArticleKeyService,
    NaverLandBasicInfoService,
    NaverLandComplexService,
    NaverLandService,
    NaverLandTransportService,
} from '@libs/naver-land/services';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NaverLandArticleKey,
            NaverLandArticleBasicInfo,
            NaverLandArticleComplex,
            NaverLandArticle,
            NaverLandArticleTransport,
        ]),
    ],
    providers: [
        NaverLandArticleKeyService,
        NaverLandBasicInfoService,
        NaverLandComplexService,
        NaverLandService,
        NaverLandTransportService,
    ],
    exports: [
        NaverLandArticleKeyService,
        NaverLandBasicInfoService,
        NaverLandComplexService,
        NaverLandService,
        NaverLandTransportService,
    ],
})
export class NaverLandModule {}
