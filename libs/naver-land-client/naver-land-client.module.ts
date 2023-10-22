import { Module } from '@nestjs/common';
import { NaverLandClient } from '@libs/naver-land-client/naver-land.client';

@Module({
    providers: [NaverLandClient],
    exports: [NaverLandClient],
})
export class NaverLandClientModule {}
