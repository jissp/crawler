export interface IAwsRecentArticleSchema {
    guid: string;
    category?: string;
    title: string;
    description: string;
    author?: string;
    link?: string;
    pubAt: Date;
}
