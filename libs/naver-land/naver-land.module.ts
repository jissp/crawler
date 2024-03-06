import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    NaverLandArticle,
    NaverLandArticleTransport,
} from '@libs/naver-land/schemas';
import {
    NaverLandService,
    NaverLandTransportService,
} from '@libs/naver-land/services';

@Module({
    imports: [
        TypeOrmModule.forFeature([NaverLandArticle, NaverLandArticleTransport]),
    ],
    providers: [NaverLandService, NaverLandTransportService],
    exports: [NaverLandService, NaverLandTransportService],
})
export class NaverLandModule {}
