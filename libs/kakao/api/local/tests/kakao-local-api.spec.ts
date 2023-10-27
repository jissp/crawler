import { Test } from '@nestjs/testing';
import { KakaoLocalApiModule } from '@libs/kakao/api/local/kakao-local-api.module';
import { KakaoLocalApiClient } from '@libs/kakao/api/local/kakao-local-api.client';

describe('카카오 로컬 API Test', () => {
    let kakaoLocalApiClient: KakaoLocalApiClient;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [KakaoLocalApiModule],
        }).compile();

        kakaoLocalApiClient =
            moduleRef.get<KakaoLocalApiClient>(KakaoLocalApiClient);
    });

    it('좌표 변환', async () => {
        const response = await kakaoLocalApiClient.getAddressByCoord2({
            lat: 37.5030847,
            long: 126.996848,
        });

        console.log(response.documents[0].address);

        expect(response.documents[0].address.address_name).toBe(
            '서울 서초구 반포동 18-1',
        );
    });
});
