import {
    RealEstateType,
    Tag,
    TradeType,
} from '@libs/naver-land-client/interfaces/naver-land.interface';

export interface ArticleListRequestDto {
    rletTpCd?: RealEstateType[];
    tradTpCd?: TradeType[];
    z: number;
    lat: number;
    lon: number;
    btm: number;
    lft: number;
    top: number;
    rgt: number;
    dprcMin?: number;
    dprcMax?: number;
    spcMin?: number;
    spcMax?: number;
    tag?: Tag[];
    sort: 'highSpc';
    page: number;
    maxPage?: number;
}
