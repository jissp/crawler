import { ArticleListRequestDto } from '@libs/naver-land-client/dtos/article-list.request.dto';
import { NaverLandClient } from '@libs/naver-land-client/naver-land.client';
import { IArticle } from '@libs/naver-land-client/interfaces/article.interface';

export enum CrawlerType {
    NAVER_LAND = 'NAVER_LAND',
}

export type CrawlerDto<T extends CrawlerType> = T extends CrawlerType.NAVER_LAND
    ? ArticleListRequestDto
    : undefined;

export type CrawlerClient<T extends CrawlerType> =
    T extends CrawlerType.NAVER_LAND ? NaverLandClient : never;

export type CrawlerParseResponse<T extends CrawlerType> =
    T extends CrawlerType.NAVER_LAND ? IArticle : never;
