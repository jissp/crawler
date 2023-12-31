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
    region1?: string;
    region2?: string;
    region3?: string;
    address: string;
    price: number;
    rentPrice?: number;
    spc1: number;
    spc2: number;
    spcRatio: number;
    spcPrice: number;
    roomCount: number;
    floor: number;
    maxFloor: number;
    completionYear: number;
    direction: Direction;
    lat: number;
    lng: number;
}
