import { Test } from '@nestjs/testing';
import { NaverLandClientModule } from '@libs/naver-land-client/naver-land-client.module';
import { NaverLandFinClient } from '@libs/naver-land-client/clients/naver-land-fin.client';

describe('NaverLandClient', () => {
    let naverLandFinClient: NaverLandFinClient;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [NaverLandClientModule],
        }).compile();

        naverLandFinClient =
            moduleRef.get<NaverLandFinClient>(NaverLandFinClient);
    });

    it('getArticleTransport', async () => {
        const response = await naverLandFinClient.getArticleTransport(
            '2410721421',
        );

        expect(response.isSuccess).toBe(true);
    });
});
