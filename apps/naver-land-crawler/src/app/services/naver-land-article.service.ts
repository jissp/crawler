import { Injectable } from '@nestjs/common';
import { NaverLandArticle } from '../schemas/naver-land-article.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

    async save(data: Partial<NaverLandArticle>) {
        return this.naverLandArticleRepository.save(data);
    }
}
