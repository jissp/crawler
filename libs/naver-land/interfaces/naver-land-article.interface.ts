import { NaverLandArticle } from '@libs/naver-land/schemas/naver-land-article.schema';

export type INaverLandArticle = Omit<
    NaverLandArticle,
    'id' | 'createdAt' | 'updatedAt'
>;
