import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';

export interface IArticleSchema {
    type: CrawlerType;
    no: string;
    data: any;
}
