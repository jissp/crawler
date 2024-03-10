import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverLandArticleAdditionalInfo } from '@libs/naver-land/schemas/naver-land-article-additional-info.schema';
import {
    NaverLandArticleAdditionalInfoData,
    NaverLandArticleAdditionalInfoType,
} from '@libs/naver-land/interfaces/naver-land-article-additional-info.interface';

@Injectable()
export class NaverLandArticleAdditionalInfoService {
    constructor(
        @InjectRepository(NaverLandArticleAdditionalInfo)
        private readonly additionalInfosRepository: Repository<NaverLandArticleAdditionalInfo>,
    ) {}

    /**
     *
     * @param type
     * @param key
     * @param data
     */
    public async upsert<T extends NaverLandArticleAdditionalInfoType>({
        type,
        key,
        data,
    }: {
        type: NaverLandArticleAdditionalInfoType;
        key: string;
        data?: Partial<NaverLandArticleAdditionalInfoData<T>>;
    }) {
        let oriArticleBasicInfo =
            (await this.additionalInfosRepository.findOneBy({
                type,
                key,
            })) || new NaverLandArticleAdditionalInfo<T>();

        oriArticleBasicInfo.type = type;
        oriArticleBasicInfo.key = key;
        oriArticleBasicInfo.data = data;

        return this.additionalInfosRepository.save(oriArticleBasicInfo);
    }

    /**
     *
     * @param type
     * @param key
     */
    public async findOneByKey<T extends NaverLandArticleAdditionalInfoType>({
        type,
        key,
    }: {
        type: NaverLandArticleAdditionalInfoType;
        key: string;
    }): Promise<NaverLandArticleAdditionalInfo<T> | null> {
        if (key === null) {
            return null;
        }

        return this.additionalInfosRepository.findOneBy({
            type,
            key,
        });
    }
}
