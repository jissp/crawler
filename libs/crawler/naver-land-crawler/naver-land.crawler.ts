import { CrawlerAbstract } from '@libs/crawler/interfaces/crawler.abstract';
import {
    CrawlerDto,
    CrawlerParseResponse,
    CrawlerType,
} from '@libs/crawler/interfaces/crawler.interface';
import { Injectable } from '@nestjs/common';
import { NaverLandClient } from '@libs/naver-land-client/naver-land.client';

@Injectable()
export class NaverLandCrawler extends CrawlerAbstract<CrawlerType.NAVER_LAND> {
    constructor(protected readonly client: NaverLandClient) {
        super(client);
    }

    async run(dto: CrawlerDto<CrawlerType.NAVER_LAND>): Promise<any[]> {
        const response = await this.client.getArticleList(dto);

        return response.body.map((article) => {
            return this.parse(article);
        });
    }

    parse(data: CrawlerParseResponse<CrawlerType.NAVER_LAND>): any {
        return data;
    }
}
