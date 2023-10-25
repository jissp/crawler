import { Injectable } from '@nestjs/common';
import { NaverLandArticle } from '../schemas/naver-land-article.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INaverLandArticleSchema } from '@libs/naver-land-crawler/interfaces/naver-land-article.schema.interface';
import * as _ from 'lodash';

@Injectable()
export class NaverLandArticleService {
    constructor(
        @InjectRepository(NaverLandArticle)
        private readonly naverLandArticleRepository: Repository<NaverLandArticle>,
    ) {}

    async findAll() {
        return this.naverLandArticleRepository.find();
    }

    async findOneById(id: number) {
        return this.naverLandArticleRepository.findOne({
            where: {
                id,
            },
        });
    }

    async findOneByArticleNo(articleNo: string) {
        return this.naverLandArticleRepository.findOne({
            where: {
                articleNo,
            },
        });
    }

    async save(naverLandArticle: Partial<INaverLandArticleSchema>) {
        let _naverLandArticle =
            (await this.findOneByArticleNo(naverLandArticle.articleNo)) ??
            new NaverLandArticle();

        _naverLandArticle = _.merge(_naverLandArticle, naverLandArticle);

        return this.naverLandArticleRepository.save(_naverLandArticle);
    }
}
