import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverLandArticleBasicInfo } from '@libs/naver-land/schemas/naver-land-article-basic-info.schema';

export type NaverLandBasicInfoFindOneFilter = Pick<
    NaverLandArticleBasicInfo,
    'articleNo' | 'realEstateType' | 'tradeType'
>;

@Injectable()
export class NaverLandBasicInfoService {
    constructor(
        @InjectRepository(NaverLandArticleBasicInfo)
        private readonly articleBasicInfoRepository: Repository<NaverLandArticleBasicInfo>,
    ) {}

    /**
     *
     * @param naverLandArticleBasicInfo
     */
    public async upsert(
        naverLandArticleBasicInfo: Partial<NaverLandArticleBasicInfo>,
    ) {
        let oriArticleBasicInfo =
            (await this.articleBasicInfoRepository.findOneBy({
                articleNo: naverLandArticleBasicInfo.articleNo,
            })) || new NaverLandArticleBasicInfo();

        oriArticleBasicInfo = Object.assign(
            oriArticleBasicInfo,
            naverLandArticleBasicInfo,
        );

        return this.articleBasicInfoRepository.save(oriArticleBasicInfo);
    }

    /**
     *
     * @param filter
     */
    public async findOneBy(
        filter: Pick<
            NaverLandArticleBasicInfo,
            'articleNo' | 'realEstateType' | 'tradeType'
        >,
    ): Promise<NaverLandArticleBasicInfo | null> {
        return this.articleBasicInfoRepository.findOneBy(filter);
    }
}
