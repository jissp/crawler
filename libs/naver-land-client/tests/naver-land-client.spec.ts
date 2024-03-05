import { Test } from '@nestjs/testing';
import { NaverLandClientModule } from '@libs/naver-land-client/naver-land-client.module';
import { NaverLandClient } from '@libs/naver-land-client/clients/naver-land.client';
import { baseNaverLandRequestDto } from '@libs/naver-land-client/tests/test.util';

describe('NaverLandClient', () => {
    let naverLandClient: NaverLandClient;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [NaverLandClientModule],
        }).compile();

        naverLandClient = moduleRef.get<NaverLandClient>(NaverLandClient);
    });

    it('getArticleList', async () => {
        const response = await naverLandClient.getArticleList(
            baseNaverLandRequestDto({
                z: 13,
                lat: 37.5030847,
                lon: 126.996848,
                btm: 37.4390515,
                lft: 126.832053,
                top: 37.567063,
                rgt: 127.1616429,
            }),
        );

        console.log(response.body);

        expect(response.code).toBe('success');
        expect(response.body.length).toBeGreaterThan(0);
    });
});
