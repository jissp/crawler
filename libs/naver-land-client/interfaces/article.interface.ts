import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';

export interface IArticleList {
    code: string;
    paidPreSale: IPaidPreSale;
    hasPaidPreSale: boolean;
    more: boolean;
    TIME: boolean;
    z: number;
    page: number;
    body?: IArticle[];
}

export interface IPaidPreSale {
    preSaleComplexNumber: number;
    preSaleComplexName: string;
    preSaleAddress: string;
    preSaleStageCode: string;
    preSaleTypeCode: string;
    preSaleFormCode: string;
    occupancyYearMonth: string;
    thumbnail: string;
    featureMarkTypeCode: string;
    minPreSalePrice: number;
    maxPreSalePrice: number;
    minPreSaleArea: number;
    maxPreSaleArea: number;
    totalHouseholdsNumber: number;
    preSaleHouseholdsNumber: number;
    xcoordinate: number;
    ycoordinate: number;
    preSaleDetailsPageURL: string;
}

export interface IArticle {
    atclNo: string;
    cortarNo: string;
    atclNm: string;
    atclStatCd: string;
    rletTpCd: string;
    uprRletTpCd: string;
    rletTpNm: string;
    tradTpCd: TradeType;
    tradTpNm: string;
    vrfcTpCd: string;
    flrInfo: string;
    prc: number;
    rentPrc: number;
    hanPrc: string;
    spc1: number;
    spc2: number;
    direction: Direction;
    atclCfmYmd: string;
    lat: number;
    lng: number;
    atclFetrDesc: number;
    tagList: string[];
    bildNm: string;
    minute: number;
    sameAddrCnt: number;
    sameAddrDirectCnt: number;
    cpid: string;
    cpNm: string;
    cpCnt: number;
    rltrNm: string;
    directTradYn: 'Y' | 'N';
    minMviFee: number;
    maxMviFee: number;
    etRoomCnt: number;
    tradePriceHan: '';
    tradeRentPrice: number;
    tradeCheckedByOwner: boolean;
    cpLinkVO: {
        cpId: string;
        mobileArticleUrl: string;
        mobileArticleLinkTypeCode: string;
        mobileBmsInspectPassYn: 'Y' | 'N';
        pcArticleLinkUseAtArticleTitle: boolean;
        pcArticleLinkUseAtCpName: boolean;
        mobileArticleLinkUseAtArticleTitle: boolean;
        mobileArticleLinkUseAtCpName: boolean;
    };
    dtlAddrYn: 'Y' | 'N';
    dtlAddr?: string;
    point: number;
}

export enum Direction {
    동향 = '동향 ',
    서향 = '서향',
    남향 = '남향',
    북향 = '북향',
    북동향 = '북동향',
    남동향 = '남동향',
    북서향 = '북서향',
    남서향 = '남서향',
}
