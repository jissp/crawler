import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';

export interface IArticleResponse {
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

export enum RealEstateTypeName {
    '아파트' = '아파트',
    '오피스텔' = '오피스텔',
    '빌라' = '빌라',
    '아파트분양권' = '아파트분양권',
    '오피스텔분양권' = '오피스텔분양권',
    '재건축' = '재건축',
    '전원주택' = '전원주택',
    '단독/다가구' = '단독/다가구',
    '상가주택' = '상가주택',
    '한옥주택' = '한옥주택',
    '재개발' = '재개발',
    '원룸' = '원룸',
    '고시원' = '고시원',
    '상가' = '상가',
    '사무실' = '사무실',
    '공장/창고' = '공장/창고',
    '건물' = '건물',
    '토지' = '토지',
    '지식산업센터' = '지식산업센터',
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

export type ResponseTag = ResponseRoomTag | ResponseCompletionYearTag;

export enum ResponseRoomTag {
    방한개 = '방한개',
    방두개 = '방두개',
    방세개 = '방세개',
    방네개이상 = '방네개이상',
}

export enum ResponseCompletionYearTag {
    '2년이내' = '2년이내',
    '4년이내' = '4년이내',
    '10년이내' = '10년이내',
    '15년이내' = '15년이내',
    '25년이내' = '25년이내',
    '25년이상' = '25년이상',
    '30년이상' = '30년이상',
}
