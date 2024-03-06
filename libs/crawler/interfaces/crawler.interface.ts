import { ArticleListRequestDto } from '@libs/naver-land-client/clients/dtos/article-list.request.dto';
import { NaverLandClient } from '@libs/naver-land-client/clients/naver-land.client';
import { AwsRecentClient } from '@libs/aws-recent-client/aws-recent.client';
import { IAwsRecentItem } from '@libs/aws-recent-crawler/interfaces/aws-recent-crawler.interface';
import { IArticle } from '@libs/naver-land-client/clients/dtos/article-list.response.dto';

export enum CrawlerType {
    NAVER_LAND = 'NAVER_LAND',
    AWS_RECENT = 'AWS_RECENT',
}

export type CrawlerDto<T extends CrawlerType> = T extends CrawlerType.NAVER_LAND
    ? ArticleListRequestDto
    : undefined;

export type CrawlerClient<T extends CrawlerType> =
    T extends CrawlerType.NAVER_LAND
        ? NaverLandClient
        : T extends CrawlerType.AWS_RECENT
        ? AwsRecentClient
        : never;

export type CrawlerParseResponse<T extends CrawlerType> =
    T extends CrawlerType.NAVER_LAND
        ? IArticle
        : T extends CrawlerType.AWS_RECENT
        ? IAwsRecentItem
        : never;
