import { IArticle } from '@libs/naver-land-client/clients/dtos/article-list.response.dto';
import { INaverLandArticle } from '@libs/naver-land/interfaces/naver-land-article.interface';
import * as Article from '@libs/naver-land-client/interfaces/article.interface';
import { Coord } from '@libs/coord2address/schemas/coord.schema';
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';
import {
    ArticleBasicInfoResult,
    ArticleComplexResult,
} from '@libs/naver-land-client/clients/dtos/results';

export class NaverLandTransformer {
    private _naverLandArticle: Partial<INaverLandArticle> = {};

    constructor(
        private readonly article: IArticle,
        private readonly complexResult?: ArticleComplexResult,
        private readonly basicInfoResult?: ArticleBasicInfoResult,
    ) {}

    public transform(): Partial<INaverLandArticle> {
        this._naverLandArticle = {};

        this.buildArticleInfo();
        this.buildArticleRoom();
        this.buildArticlePrice();
        this.buildArticleBuilding();
        this.buildArticleParkingInfo();
        this.buildArticleCoordinates();
        this.buildArticleTags();

        return this._naverLandArticle;
    }

    /**
     *
     * @private
     */
    private buildArticleInfo() {
        this._naverLandArticle.articleNo = this.article.atclNo;
        this._naverLandArticle.atclNm = this.article.atclNm;
        this._naverLandArticle.rletTpNm = this.article
            .rletTpNm as Article.RealEstateTypeName;
        this._naverLandArticle.tradTpCd = this.article.tradTpCd;
        this._naverLandArticle.desc = this.article.atclFetrDesc;

        this._naverLandArticle.household =
            (this.complexResult?.totalHouseholdNumber ??
                this.basicInfoResult?.detailInfo.facilityInfo
                    .householdNumber) ||
            0;
    }

    /**
     *
     * @private
     */
    private buildArticleRoom() {
        this._naverLandArticle.spc1 = this.article.spc1;
        this._naverLandArticle.spc2 = this.article.spc2;
        this._naverLandArticle.spcRatio =
            (this.article.spc2 / this.article.spc1) * 100;

        this._naverLandArticle.isDuplex = this.transformDuplex();
        this._naverLandArticle.roomCount = this.transformRoomCount();
        this._naverLandArticle.direction = this.article.direction;
    }

    /**
     *
     * @private
     */
    private buildArticlePrice() {
        this._naverLandArticle.price = this.article.prc;
        this._naverLandArticle.rentPrice = this.article.rentPrc;
        if (
            [TradeType.매매, TradeType.전세].includes(
                this._naverLandArticle.tradTpCd,
            )
        ) {
            this._naverLandArticle.spcPrice =
                this.article.prc / this.article.spc2;
        } else if (this._naverLandArticle.tradTpCd === TradeType.월세) {
            // 전월세비율 - https://kosis.kr/statHtml/statHtml.do?orgId=408&tblId=DT_30404_N0010
            const transRatio = 5.2;
            const transRentPrice = ((this.article.prc / 100) * transRatio) / 12;

            this._naverLandArticle.transRentPrice =
                this.article.rentPrc + transRentPrice;
            this._naverLandArticle.spcPrice =
                this._naverLandArticle.transRentPrice / this.article.spc2;
        }
    }

    /**
     * @private
     */
    private buildArticleBuilding() {
        const { floor, maxFloor } = this.transformFloor();

        this._naverLandArticle.floor = floor ? Number(floor) : null;
        this._naverLandArticle.maxFloor = maxFloor ? Number(maxFloor) : null;
        this._naverLandArticle.completionYear = this.transformCompletionYear();
    }

    /**
     *
     * @private
     */
    private buildArticleCoordinates() {
        this._naverLandArticle.lat = this.article.lat;
        this._naverLandArticle.lng = this.article.lng;
    }

    /**
     *
     * @private
     */
    private buildArticleTags() {
        this._naverLandArticle.tags = this.article.tagList || [];
    }

    /**
     * 태그를 기반으로 방 개수를 변환합니다.
     *
     * @private
     */
    private transformRoomCount() {
        if (this.basicInfoResult?.detailInfo.spaceInfo.roomCount) {
            return this.basicInfoResult?.detailInfo.spaceInfo.roomCount;
        }

        const roomTags = Object.values(Article.RoomTag);
        const roomIndex = roomTags.indexOf(
            roomTags.find((tag) => this.article.tagList.includes(tag)),
        );

        return roomIndex === -1 ? 1 : roomIndex + 1;
    }

    /**
     * 준공년도를 변환합니다.
     *
     * @private
     */
    private transformCompletionYear() {
        const completionYear =
            this.complexResult?.approvalElapsedYear ??
            this.basicInfoResult?.detailInfo.facilityInfo.approvalElapsedYear;
        if (completionYear) {
            return completionYear;
        }

        const completionYearTags = Object.values(Article.CompletionYearTag);

        const tag = completionYearTags.find((tag) => {
            return this.article.tagList.includes(tag);
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
     * @private
     */
    private transformDuplex() {
        return this.basicInfoResult?.detailInfo.spaceInfo.duplex ??
            this.article.tagList.includes(Article.DuplexTag.복층)
            ? 'Y'
            : 'N';
    }

    /**
     * 층 정보를 변환합니다.
     *
     * @private
     */
    private transformFloor(): {
        floor: number | null;
        maxFloor: number | null;
    } {
        if (!this.article.flrInfo) {
            return {
                floor: null,
                maxFloor: null,
            };
        }

        const [floor, maxFloor] = this.article.flrInfo.split('/');

        return {
            floor: isNaN(Number(floor)) ? undefined : Number(floor),
            maxFloor: isNaN(Number(maxFloor)) ? undefined : Number(maxFloor),
        };
    }

    /**
     * 주차와 관련된 정보를 변환합니다.
     *
     */
    private buildArticleParkingInfo() {
        this._naverLandArticle.parkingCount =
            (this.basicInfoResult?.detailInfo.facilityInfo.totalParkingCount ??
                this.complexResult?.parkingInfo.totalParkingCount) ||
            0;
        this._naverLandArticle.parkingRatio =
            (this.basicInfoResult?.detailInfo.facilityInfo
                .parkingCountPerHousehold ??
                this.complexResult?.parkingInfo.parkingCountPerHousehold) ||
            0;

        if (
            this._naverLandArticle.parkingRatio === 0 &&
            this._naverLandArticle.household !== 0
        ) {
            this._naverLandArticle.parkingRatio =
                this._naverLandArticle.parkingCount /
                this._naverLandArticle.household;
        }
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
}
