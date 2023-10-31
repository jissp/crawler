import { CrawlerAbstract } from '@libs/crawler/interfaces/crawler.abstract';
import {
    CrawlerDto,
    CrawlerParseResponse,
    CrawlerType,
} from '@libs/crawler/interfaces/crawler.interface';
import { Injectable } from '@nestjs/common';
import { NaverLandClient } from '@libs/naver-land-client/naver-land.client';
import {
    RealEstateTypeName,
    ResponseCompletionYearTag,
    ResponseRoomTag,
} from '@libs/naver-land-client/interfaces/article.interface';
import { uSleep } from '@libs/utils/usleep.util';
import { INaverLandArticleSchema } from '@libs/naver-land-crawler/interfaces/naver-land-article.schema.interface';
import { NaverLandCrawlerService } from '@libs/naver-land-crawler/naver-land-crawler.service';
import { CrawlerService } from '@libs/crawler/services/crawler.service';

@Injectable()
export class NaverLandCrawler extends CrawlerAbstract<CrawlerType.NAVER_LAND> {
    constructor(
        protected readonly client: NaverLandClient,
        private readonly crawlerService: CrawlerService,
        private readonly naverLandCrawlerService: NaverLandCrawlerService,
    ) {
        super(client);
    }

    async run(dto: CrawlerDto<CrawlerType.NAVER_LAND>): Promise<void> {
        let page = dto.page ?? 1;
        const maxPage = dto.maxPage ?? 99;

        while (true) {
            dto.page = page;

            const articleResponse = await this.client.getArticleList(dto);
            if (articleResponse.body.length === 0) {
                break;
            }

            await Promise.all(
                articleResponse.body.map(async (article) => {
                    // Crawler 정보 저장
                    await this.crawlerService.save({
                        type: CrawlerType.NAVER_LAND,
                        no: article.atclNo,
                        data: article,
                    });

                    // 네이버 매물 정보 가공 후 저장
                    return this.naverLandCrawlerService.save(
                        this.transform(article),
                    );
                }),
            );

            if (page++ >= maxPage) {
                break;
            }

            await uSleep(3000);
        }
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
            rentPrice: data.rentPrc,
            spc1: data.spc1,
            spc2: data.spc2,
            spcRatio: (data.spc2 / data.spc1) * 100,
            spcPrice: data.prc / data.spc2,
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

        const [floor, maxFloor] = flrInfo.split('/');

        const isFloorNan = isNaN(Number(floor));
        const isMaxFloorNan = isNaN(Number(maxFloor));

        return [
            isFloorNan ? undefined : Number(floor),
            isMaxFloorNan ? undefined : Number(maxFloor),
        ];
    }
}
