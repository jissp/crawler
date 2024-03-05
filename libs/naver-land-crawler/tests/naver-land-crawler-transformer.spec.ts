import { NaverLandTransformer } from '@libs/naver-land-crawler/naver-land.transformer';
import { IArticle } from '@libs/naver-land-client/clients/dtos/article-list.response.dto';
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';
import { Direction } from '@libs/naver-land-client/interfaces/article.interface';

const article: IArticle = {
    atclNo: '2410628525',
    cortarNo: '1156012600',
    atclNm: '신동아하이팰리스',
    atclStatCd: 'R0',
    rletTpCd: 'A02',
    uprRletTpCd: 'A02',
    rletTpNm: '오피스텔',
    tradTpCd: TradeType.매매,
    tradTpNm: '매매',
    vrfcTpCd: 'OWNER',
    flrInfo: '8/15',
    prc: 66000,
    rentPrc: 0,
    hanPrc: '6억 6,000',
    spc1: 122,
    spc2: 71.47,
    direction: Direction.남서향,
    atclCfmYmd: '24.03.04.',
    lat: 37.52209,
    lng: 126.88448,
    atclFetrDesc: '5호선 양평역세권, 주인거주중 상태 깨끗, 즉시 입주 가능',
    tagList: ['25년이내', '역세권', '방두개', '화장실한개', '복층'],
    bildNm: '102동',
    minute: 0,
    sameAddrCnt: 3,
    sameAddrDirectCnt: 0,
    cpid: 'bizmk',
    cpNm: '매경부동산',
    cpCnt: 2,
    rltrNm: '중흥S(단지내)공인중개사사무소',
    directTradYn: 'N',
    minMviFee: 0,
    maxMviFee: 0,
    etRoomCnt: 0,
    tradePriceHan: '',
    tradeRentPrice: 0,
    tradeCheckedByOwner: false,
    cpLinkVO: {
        cpId: 'bizmk',
        mobileArticleLinkTypeCode: 'NONE',
        mobileBmsInspectPassYn: 'Y',
        pcArticleLinkUseAtArticleTitle: false,
        pcArticleLinkUseAtCpName: false,
        mobileArticleLinkUseAtArticleTitle: false,
        mobileArticleLinkUseAtCpName: false,
    },
    dtlAddrYn: 'N',
    dtlAddr: '',
};

describe('NaverLandCrawler Builder', () => {
    let naverLandTransformer: NaverLandTransformer;
    beforeAll(async () => {
        naverLandTransformer = new NaverLandTransformer();
    });

    it('build', async () => {
        const result = naverLandTransformer.transform(article);

        expect(result).toMatchObject({
            articleNo: '2410628525',
            atclNm: '신동아하이팰리스',
            completionYear: 25,
            direction: '남서향',
            floor: 8,
            isDuplex: true,
            lat: 37.52209,
            lng: 126.88448,
            maxFloor: 15,
            price: 66000,
            rletTpNm: '오피스텔',
            roomCount: 2,
            spc1: 122,
            spc2: 71.47,
            spcPrice: 0,
            spcRatio: 58.58196721311475,
            tradTpCd: 'A1',
        });
    });
});
