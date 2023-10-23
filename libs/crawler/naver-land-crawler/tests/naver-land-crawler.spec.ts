import { Test } from '@nestjs/testing';
import { baseNaverLandRequestDto } from '@libs/naver-land-client/tests/test.util';
import { NaverLandCrawlerModule } from '@libs/crawler/naver-land-crawler/naver-land-crawler.module';
import { NaverLandCrawler } from '@libs/crawler/naver-land-crawler/naver-land.crawler';

describe('NaverLandCrawler', () => {
    let naverLandCrawler: NaverLandCrawler;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [NaverLandCrawlerModule],
        }).compile();

        naverLandCrawler = moduleRef.get<NaverLandCrawler>(NaverLandCrawler);
    });

    it('run', async () => {
        const articles = await naverLandCrawler.run(
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

        expect(articles.length).toBeGreaterThan(0);
    });
});
