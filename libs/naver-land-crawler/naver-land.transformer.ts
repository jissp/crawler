import { Injectable } from '@nestjs/common';
import { IArticle } from '@libs/naver-land-client/clients/dtos/article-list.response.dto';
import { INaverLandArticle } from '@libs/naver-land/interfaces/naver-land-article.interface';
import * as Article from '@libs/naver-land-client/interfaces/article.interface';
import { Coord } from '@libs/coord2address/schemas/coord.schema';
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';

@Injectable()
export class NaverLandTransformer {
    public transform(article: IArticle): Partial<INaverLandArticle> {
        const naverLandArticle: Partial<INaverLandArticle> = {};

        this.buildArticleInfo(naverLandArticle, article);
        this.buildArticleRoom(naverLandArticle, article);
        this.buildArticlePrice(naverLandArticle, article);
        this.buildArticleBuilding(naverLandArticle, article);
        this.buildArticleCoordinates(naverLandArticle, article);
        this.buildArticleTags(naverLandArticle, article);

        return naverLandArticle;
    }

    /**
     *
     * @param naverLandArticle
     * @param article
     * @private
     */
    private buildArticleInfo(
        naverLandArticle: Partial<INaverLandArticle>,
        article: IArticle,
    ) {
        naverLandArticle.articleNo = article.atclNo;
        naverLandArticle.atclNm = article.atclNm;
        naverLandArticle.rletTpNm =
            article.rletTpNm as Article.RealEstateTypeName;
        naverLandArticle.tradTpCd = article.tradTpCd;
    }

    /**
     *
     * @param naverLandArticle
     * @param article
     * @private
     */
    private buildArticleRoom(
        naverLandArticle: Partial<INaverLandArticle>,
        article: IArticle,
    ) {
        naverLandArticle.spc1 = article.spc1;
        naverLandArticle.spc2 = article.spc2;
        naverLandArticle.spcRatio = (article.spc2 / article.spc1) * 100;

        naverLandArticle.isDuplex = this.transformDuplex(article.tagList);
        naverLandArticle.roomCount = this.transformRoomCount(article.tagList);
        naverLandArticle.direction = article.direction;
    }

    /**
     *
     * @param naverLandArticle
     * @param article
     * @private
     */
    private buildArticlePrice(
        naverLandArticle: Partial<INaverLandArticle>,
        article: IArticle,
    ) {
        naverLandArticle.price = article.prc;
        naverLandArticle.rentPrice = article.rentPrc;
        if (
            [TradeType.매매, TradeType.전세].includes(naverLandArticle.tradTpCd)
        ) {
            naverLandArticle.spcPrice = article.prc / article.spc2;
        } else if (naverLandArticle.tradTpCd === TradeType.월세) {
            // 전월세비율 - https://kosis.kr/statHtml/statHtml.do?orgId=408&tblId=DT_30404_N0010
            const transRatio = 5.2;
            const transRentPrice = ((article.prc / 100) * transRatio) / 12;

            naverLandArticle.transRentPrice = article.rentPrc + transRentPrice;
            naverLandArticle.spcPrice =
                naverLandArticle.transRentPrice / article.spc2;
        }
    }

    /**
     *
     * @param naverLandArticle
     * @param article
     * @private
     */
    private buildArticleBuilding(
        naverLandArticle: Partial<INaverLandArticle>,
        article: IArticle,
    ) {
        const { floor, maxFloor } = this.transformFloor(article.flrInfo);

        naverLandArticle.floor = floor ? Number(floor) : null;
        naverLandArticle.maxFloor = maxFloor ? Number(maxFloor) : null;
        naverLandArticle.completionYear = this.transformCompletionYear(
            article.tagList,
        );
    }

    /**
     *
     * @param naverLandArticle
     * @param article
     * @private
     */
    private buildArticleCoordinates(
        naverLandArticle: Partial<INaverLandArticle>,
        article: IArticle,
    ) {
        naverLandArticle.lat = article.lat;
        naverLandArticle.lng = article.lng;
    }

    /**
     *
     * @param naverLandArticle
     * @param article
     * @private
     */
    private buildArticleTags(
        naverLandArticle: Partial<INaverLandArticle>,
        article: IArticle,
    ) {
        naverLandArticle.tags = article.tagList || [];
    }

    /**
     *
     * @param naverLandArticle
     * @param coord
     * @private
     */
    public buildArticleAddressBy(
        naverLandArticle: Partial<INaverLandArticle>,
        coord: Coord['data'],
    ) {
        naverLandArticle.region1 = coord.address.region_1depth_name;
        naverLandArticle.region2 = coord.address.region_2depth_name;
        naverLandArticle.region3 = coord.address.region_3depth_name;
        naverLandArticle.address = coord.address.address_name;
    }

    /**
     * 태그를 기반으로 방 개수를 변환합니다.
     *
     * @param tagList
     * @private
     */
    private transformRoomCount(tagList: string[]) {
        const roomTags = Object.values(Article.RoomTag);
        const roomIndex = roomTags.indexOf(
            roomTags.find((tag) => tagList.includes(tag)),
        );

        return roomIndex === -1 ? 1 : roomIndex + 1;
    }

    /**
     * 태그를 기반으로 준공년도를 변환합니다.
     * @param tagList
     * @private
     */
    private transformCompletionYear(tagList: string[]) {
        const completionYearTags = Object.values(Article.CompletionYearTag);

        const tag = completionYearTags.find((tag) => {
            return tagList.includes(tag);
        });

        switch (tag as Article.CompletionYearTag) {
            case Article.CompletionYearTag['2년이내']:
                return 2;
            case Article.CompletionYearTag['4년이내']:
                return 4;
            case Article.CompletionYearTag['10년이내']:
                return 10;
            case Article.CompletionYearTag['15년이내']:
                return 15;
            case Article.CompletionYearTag['25년이내']:
                return 25;
            case Article.CompletionYearTag['25년이상']:
                return 26;
            case Article.CompletionYearTag['30년이상']:
                return 30;
        }
    }

    /**
     * 태그를 기반으로 준공년도를 변환합니다.
     * @param tagList
     * @private
     */
    private transformDuplex(tagList: string[]) {
        return tagList.includes(Article.DuplexTag.복층) ? 'Y' : 'N';
    }

    /**
     * 층 정보를 변환합니다.
     *
     * @param flrInfo
     * @private
     */
    private transformFloor(flrInfo?: string): {
        floor: number | null;
        maxFloor: number | null;
    } {
        if (!flrInfo) {
            return {
                floor: null,
                maxFloor: null,
            };
        }

        const [floor, maxFloor] = flrInfo.split('/');

        return {
            floor: isNaN(Number(floor)) ? undefined : Number(floor),
            maxFloor: isNaN(Number(maxFloor)) ? undefined : Number(maxFloor),
        };
    }
}
