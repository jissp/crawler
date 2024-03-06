import { NaverLandArticleTransport } from '@libs/naver-land/schemas/naver-land-article-transport.schema';

export type INaverLandArticleTransport = Omit<
    NaverLandArticleTransport,
    'id' | 'createdAt'
>;
