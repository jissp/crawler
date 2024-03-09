import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';

export interface ArticleKeyResult {
    key: ArticleKeyKeyInfo;
    type: ArticleKeyTypeInfo;
    address: {
        legalDivisionNumber: string | null;
        jibun: string | null;
    };
    isRealEstateAssociationArticle: boolean;
    isArticleImageExist: boolean;
}

export interface ArticleKeyKeyInfo {
    complexNumber: number;
    pyeongTypeNumber: number;
    buildingNumber: number;
    hoNumber: number;
    redevelopmentAreaNumber: any;
    pnu: any;
}

export interface ArticleKeyTypeInfo {
    realEstateType: string;
    tradeType: TradeType;
}
