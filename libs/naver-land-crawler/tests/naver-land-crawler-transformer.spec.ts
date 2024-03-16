import { NaverLandTransformer } from '@libs/naver-land-crawler/naver-land.transformer';
import {
    transformFixtureArticle,
    transformFixtureArticleComplexResult,
} from '@libs/naver-land-crawler/tests/fixtures/transform.fixtures';

describe('NaverLandCrawler Builder', () => {
    it('build', async () => {
        const naverLandTransformer = new NaverLandTransformer(
            transformFixtureArticle,
            transformFixtureArticleComplexResult,
        );
        const result = naverLandTransformer.transform();

        expect(result).toMatchObject({
            articleNo: '2410628525',
            atclNm: '신동아하이팰리스',
            buildingCoverageRatio: 23,
            completionYear: 31,
            desc: '5호선 양평역세권, 주인거주중 상태 깨끗, 즉시 입주 가능',
            direction: '남서향',
            floor: 8,
            floorAreaRatio: 76,
            household: 156,
            isDuplex: 'Y',
            lat: 37.52209,
            lng: 126.88448,
            maxFloor: 15,
            parkingCount: 150,
            parkingRatio: 0.96,
            price: 66000,
            rentPrice: 0,
            rletTpNm: '오피스텔',
            roomCount: 2,
            spc1: 122,
            spc2: 71.47,
            spcPrice: 923.464390653421,
            spcRatio: 58.58196721311475,
            tags: ['25년이내', '역세권', '방두개', '화장실한개', '복층'],
            tradTpCd: 'A1',
        });
    });
});
