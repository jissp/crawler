import {
    Direction,
    RealEstateTypeName,
} from '@libs/naver-land-client/interfaces/article.interface';
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';

export interface INaverLandArticleSchema {
    articleNo: string;
    atclNm: string;
    rletTpNm: RealEstateTypeName;
    tradTpCd: TradeType;
    // flrInfo;
    price: number;
    spc1: number;
    spc2: number;
    direction: Direction;
    lat: number;
    lng: number;
    // tagList: [];
}
