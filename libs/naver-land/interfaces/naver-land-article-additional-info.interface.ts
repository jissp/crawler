import { ArticleKeyResult } from '@libs/naver-land-client/clients/dtos/results/article-key.result';
import {
    ArticleBasicInfoResult,
    ArticleComplexResult,
} from '@libs/naver-land-client/clients/dtos/results';

export enum NaverLandArticleAdditionalInfoType {
    KeyInfo = 'KeyInfo',
    BasicInfo = 'BasicInfo',
    ComplexInfo = 'ComplexInfo',
    TransportInfo = 'TransportInfo',
}

export type NaverLandArticleAdditionalInfoData<
    T extends NaverLandArticleAdditionalInfoType,
> = T extends NaverLandArticleAdditionalInfoType.KeyInfo
    ? ArticleKeyResult
    : T extends NaverLandArticleAdditionalInfoType.BasicInfo
    ? ArticleBasicInfoResult
    : T extends NaverLandArticleAdditionalInfoType.ComplexInfo
    ? ArticleComplexResult
    : any;
