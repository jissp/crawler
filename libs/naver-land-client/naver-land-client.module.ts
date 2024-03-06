import { Module } from '@nestjs/common';
import {
    NaverLandClient,
    NaverLandFinClient,
} from '@libs/naver-land-client/clients';

@Module({
    providers: [NaverLandClient, NaverLandFinClient],
    exports: [NaverLandClient, NaverLandFinClient],
})
export class NaverLandClientModule {}
