import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INaverLandArticleSchema } from '@libs/naver-land-crawler/interfaces/naver-land-article.schema.interface';
import * as _ from 'lodash';
import { NaverLandArticle } from '@libs/naver-land-crawler/schemas/naver-land-article.schema';

@Injectable()
export class NaverLandCrawlerService {
    constructor(
        @InjectRepository(NaverLandArticle)
        private readonly naverLandArticleRepository: Repository<NaverLandArticle>,
    ) {}

    async findAll() {
        return this.naverLandArticleRepository.find();
    }

    async findOneById(id: number) {
        return this.naverLandArticleRepository.findOneBy({
            id,
        });
    }

    async findOneByArticleNo(articleNo: string) {
        return this.naverLandArticleRepository.findOneBy({
            articleNo,
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
