import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverLandArticleComplex } from '@libs/naver-land/schemas';

@Injectable()
export class NaverLandComplexService {
    constructor(
        @InjectRepository(NaverLandArticleComplex)
        private readonly articleComplexRepository: Repository<NaverLandArticleComplex>,
    ) {}

    /**
     *
     * @param naverLandArticleComplex
     */
    public async upsert(
        naverLandArticleComplex: Partial<NaverLandArticleComplex>,
    ) {
        let oriArticleComplex =
            (await this.articleComplexRepository.findOneBy({
                complexNo: naverLandArticleComplex.complexNo,
            })) || new NaverLandArticleComplex();

        oriArticleComplex = Object.assign(
            oriArticleComplex,
            naverLandArticleComplex,
        );

        return this.articleComplexRepository.save(oriArticleComplex);
    }

    /**
     *
     * @param complexNo
     */
    public async findByComplexNo(
        complexNo: number,
    ): Promise<NaverLandArticleComplex | null> {
        if (complexNo === null) {
            return null;
        }

        return this.articleComplexRepository.findOneBy({
            complexNo,
        });
    }
}
