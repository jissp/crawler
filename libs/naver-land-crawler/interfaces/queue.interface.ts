import { IArticle } from '@libs/naver-land-client/clients/dtos/article-list.response.dto';

export enum NaverLandCrawlerQueueType {
    RequestArticle = 'RequestArticle',
    TransformArticle = 'TransformArticle',
    ArticleTransport = 'ArticleTransport',
}

export type NaverLandCrawlerQueueData<T extends NaverLandCrawlerQueueType> =
    T extends NaverLandCrawlerQueueType.RequestArticle
        ? any
        : T extends NaverLandCrawlerQueueType.TransformArticle
        ? IArticle
        : T extends NaverLandCrawlerQueueType.ArticleTransport
        ? IArticle
        : undefined;
