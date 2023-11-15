import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NaverLandCrawlerService } from '@libs/naver-land-crawler/naver-land-crawler.service';
import * as _ from 'lodash';

interface IRegionGroup {
    region: string;
    subRegions?: IRegionGroup[] | string[];
}

@ApiTags('네이버 부동산', 'Meta')
@Controller('v1/naver-land/meta')
export class NaverLandMetaController {
    constructor(
        private readonly naverLandCrawlerService: NaverLandCrawlerService,
    ) {}

    @ApiOperation({
        operationId: 'NaverLand.getRegions',
    })
    @Get('regions')
    async getRegions() {
        const regions = await this.naverLandCrawlerService.getRegionList();

        const groupedRegions = _.groupBy(regions, 'region1');
        const reGroupedRegions = _.map(
            groupedRegions,
            (subRegions, region1): IRegionGroup => {
                return {
                    region: region1,
                    subRegions: _.map(
                        _.groupBy(subRegions, 'region2'),
                        (subRegions2, region2): IRegionGroup => {
                            return {
                                region: region2,
                                subRegions: subRegions2.map(
                                    (subRegion2) => subRegion2.region3,
                                ),
                            };
                        },
                    ),
                };
            },
        );

        return {
            list: reGroupedRegions,
        };
    }
}
