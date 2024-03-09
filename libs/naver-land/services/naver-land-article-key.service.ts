import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverLandArticleKey } from '@libs/naver-land/schemas/naver-land-article-key.schema';

@Injectable()
export class NaverLandArticleKeyService {
    constructor(
        @InjectRepository(NaverLandArticleKey)
        private readonly articleKeyRepository: Repository<NaverLandArticleKey>,
    ) {}

    /**
     *
     * @param naverLandArticleKey
     */
    public async upsert(naverLandArticleKey: Partial<NaverLandArticleKey>) {
        let oriArticleBasicInfo =
            (await this.articleKeyRepository.findOneBy({
                articleNo: naverLandArticleKey.articleNo,
            })) || new NaverLandArticleKey();

        oriArticleBasicInfo = Object.assign(
            oriArticleBasicInfo,
            naverLandArticleKey,
        );

        return this.articleKeyRepository.save(oriArticleBasicInfo);
    }

    /**
     *
     * @param articleNo
     */
    public async findOneBy(
        articleNo: string,
    ): Promise<NaverLandArticleKey | null> {
        if (articleNo === null) {
            return null;
        }

        return this.articleKeyRepository.findOneBy({
            articleNo,
        });
    }
}
