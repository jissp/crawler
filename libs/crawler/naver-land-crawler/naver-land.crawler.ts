import { CrawlerAbstract } from '@libs/crawler/interfaces/crawler.abstract';
import {
    CrawlerDto,
    CrawlerParseResponse,
    CrawlerType,
} from '@libs/crawler/interfaces/crawler.interface';
import { Injectable } from '@nestjs/common';
import { NaverLandClient } from '@libs/naver-land-client/naver-land.client';
import {
    IArticle,
    RealEstateTypeName,
} from '@libs/naver-land-client/interfaces/article.interface';
import { NaverLandArticle } from '@libs/crawler/naver-land-crawler/schemas/naver-land-article.schema';

@Injectable()
export class NaverLandCrawler extends CrawlerAbstract<CrawlerType.NAVER_LAND> {
    constructor(protected readonly client: NaverLandClient) {
        super(client);
    }

    async run(dto: CrawlerDto<CrawlerType.NAVER_LAND>): Promise<IArticle[]> {
        const articles = await this.client.getArticleList(dto);

        return articles.body.map((article) => {
            return article;
        });
    }

    transform(
        data: CrawlerParseResponse<CrawlerType.NAVER_LAND>,
    ): Partial<NaverLandArticle> {
        return {
            id: null,
            articleNo: data.atclNo,
            atclNm: data.atclNm,
            rletTpNm: data.rletTpNm as RealEstateTypeName,
            tradTpCd: data.tradTpCd,
            price: data.prc,
            spc1: data.spc1,
            spc2: data.spc2,
            direction: data.direction,
            lat: data.lat,
            lng: data.lng,
        };
    }
}
