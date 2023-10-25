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
import { uSleep } from '@libs/utils/usleep.util';
import { INaverLandArticleSchema } from '@libs/naver-land-crawler/interfaces/naver-land-article.schema.interface';

@Injectable()
export class NaverLandCrawler extends CrawlerAbstract<CrawlerType.NAVER_LAND> {
    constructor(protected readonly client: NaverLandClient) {
        super(client);
    }

    async run(dto: CrawlerDto<CrawlerType.NAVER_LAND>): Promise<IArticle[]> {
        let page = dto.page ?? 1;
        const maxPage = dto.maxPage ?? 99;

        const articles: IArticle[] = [];
        while (true) {
            const articleResponse = await this.client.getArticleList(dto);

            articles.push(...articleResponse.body);

            if (page++ >= maxPage) {
                break;
            }

            await uSleep(3000);
        }

        return articles;
    }

    transform(
        data: CrawlerParseResponse<CrawlerType.NAVER_LAND>,
    ): Partial<INaverLandArticleSchema> {
        return {
            articleNo: data.atclNo,
            atclNm: data.atclNm,
            rletTpNm: data.rletTpNm as RealEstateTypeName,
            tradTpCd: data.tradTpCd,
            price: data.prc,
            spc1: data.spc1,
            spc2: data.spc2,
            spcRatio: (data.spc2 / data.spc1) * 100,
            direction: data.direction,
            lat: data.lat,
            lng: data.lng,
        };
    }
}
