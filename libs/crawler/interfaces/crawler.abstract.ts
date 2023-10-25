import {
    CrawlerClient,
    CrawlerDto,
    CrawlerParseResponse,
    CrawlerType,
} from '@libs/crawler/interfaces/crawler.interface';

export abstract class CrawlerAbstract<T extends CrawlerType> {
    protected constructor(
        protected readonly client: CrawlerClient<T>,
        protected readonly config?: any,
    ) {}

    abstract run(dto: CrawlerDto<T>): Promise<any>;

    abstract transform(data: CrawlerParseResponse<T>): any;
}
