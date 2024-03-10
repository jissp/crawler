import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    NaverLandArticle,
    NaverLandArticleAdditionalInfo,
} from '@libs/naver-land/schemas';
import {
    NaverLandArticleAdditionalInfoService,
    NaverLandService,
} from '@libs/naver-land/services';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NaverLandArticleAdditionalInfo,
            NaverLandArticle,
        ]),
    ],
    providers: [NaverLandArticleAdditionalInfoService, NaverLandService],
    exports: [NaverLandArticleAdditionalInfoService, NaverLandService],
})
export class NaverLandModule {}
