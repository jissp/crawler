import { NaverLandTransformer } from '@libs/naver-land-crawler/naver-land.transformer';
import {
    transformFixtureArticle,
    transformFixtureArticleComplexResult,
    transformFixtureBasicInfoResult,
} from '@libs/naver-land-crawler/tests/fixtures/transform.fixtures';
import { NaverLandArticle } from '@libs/naver-land/schemas';

describe('NaverLandCrawler Builder', () => {
    it('build', async () => {
        const naverLandTransformer = new NaverLandTransformer(
            transformFixtureArticle,
            transformFixtureArticleComplexResult,
            transformFixtureBasicInfoResult,
        );
        const result = naverLandTransformer.transform();

        expect(result).toMatchObject({
            articleNo: '2410628525',
            atclNm: '신동아하이팰리스',
            buildingCoverageRatio: 23,
            completionYear: 31,
            summary: '풀옵션,2룸,집보시러오세요,사진참조,명품주상복합',
            description:
                '안녕하세요~\n디오르나인 분양권 매매,전세,월세 전문부동산 초이스부동산입니다.\n안심하시고 거래하실수있게 도와드리겠습니다. \n궁금하신점 바로바로 전화주세요~',
            direction: '남서향',
            floor: 8,
            floorAreaRatio: 76,
            household: 156,
            isDuplex: 'N',
            lat: 37.52209,
            lng: 126.88448,
            maxFloor: 15,
            parkingCount: 269,
            parkingRatio: 1.39,
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
        } as NaverLandArticle);
    });
});
