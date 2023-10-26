import { Module } from '@nestjs/common';
import { KakaoLocalApiClient } from '@libs/kakao/api/local/kakao-local-api.client';
import { ConfigModule } from '@libs/config/config.module';
import { ConfigService } from '@libs/config/services/config.service';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: KakaoLocalApiClient,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return new KakaoLocalApiClient(
                    await configService.getKakaoLocalApiKey(),
                );
            },
        },
    ],
    exports: [KakaoLocalApiClient],
})
export class KakaoLocalApiModule {}
