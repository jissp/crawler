import {
    Direction,
    RealEstateTypeName, ResponseCompletionYearTag
} from "@libs/naver-land-client/interfaces/article.interface";
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';

export interface INaverLandArticleSchema {
    articleNo: string;
    atclNm: string;
    rletTpNm: RealEstateTypeName;
    tradTpCd: TradeType;
    price: number;
    spc1: number;
    spc2: number;
    spcRatio: number;
    roomCount: number;
    floor: number;
    maxFloor: number;
    completionYear: number;
    direction: Direction;
    lat: number;
    lng: number;
}
