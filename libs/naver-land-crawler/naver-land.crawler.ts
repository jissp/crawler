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
    ResponseCompletionYearTag,
    ResponseRoomTag,
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
            dto.page = page;
            const articleResponse = await this.client.getArticleList(dto);

            if (articleResponse.body.length === 0) {
                break;
            }

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
        const [floor, maxFloor] = this.transformFloor(data.flrInfo);

        return {
            articleNo: data.atclNo,
            atclNm: data.atclNm,
            rletTpNm: data.rletTpNm as RealEstateTypeName,
            tradTpCd: data.tradTpCd,
            price: data.prc,
            spc1: data.spc1,
            spc2: data.spc2,
            spcRatio: (data.spc2 / data.spc1) * 100,
            roomCount: this.transformRoomCount(data),
            completionYear: this.transformCompletionYear(data),
            floor: floor ? Number(floor) : null,
            maxFloor: maxFloor ? Number(maxFloor) : null,
            direction: data.direction,
            lat: data.lat,
            lng: data.lng,
        };
    }

    private transformRoomCount(
        data: CrawlerParseResponse<CrawlerType.NAVER_LAND>,
    ) {
        const tagList = Object.values(ResponseRoomTag);

        const tag = tagList.find((tag) => data.tagList.includes(tag));

        const roomIndex = tagList.indexOf(tag);

        return roomIndex === -1 ? 1 : roomIndex + 1;
    }

    private transformCompletionYear(
        data: CrawlerParseResponse<CrawlerType.NAVER_LAND>,
    ) {
        const tagList = Object.values(ResponseCompletionYearTag);

        const tag = tagList.find((tag) => {
            return data.tagList.includes(tag);
        });

        switch (tag as ResponseCompletionYearTag) {
            case ResponseCompletionYearTag['2년이내']:
                return 2;
            case ResponseCompletionYearTag['4년이내']:
                return 4;
            case ResponseCompletionYearTag['10년이내']:
                return 10;
            case ResponseCompletionYearTag['15년이내']:
                return 15;
            case ResponseCompletionYearTag['25년이내']:
                return 25;
            case ResponseCompletionYearTag['25년이상']:
                return 26;
            case ResponseCompletionYearTag['30년이상']:
                return 30;
        }
    }

    private transformFloor(flrInfo?: string) {
        if (!flrInfo) {
            return [undefined, undefined];
        }

        return flrInfo.split('/');
    }
}
