import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INaverLandArticleSchema } from '@libs/naver-land-crawler/interfaces/naver-land-article.schema.interface';
import * as _ from 'lodash';
import { NaverLandArticle } from '@libs/naver-land-crawler/schemas/naver-land-article.schema';
import { Coord2addressService } from '@libs/coord2address/services/coord2address.service';

@Injectable()
export class NaverLandCrawlerService {
    constructor(
        private readonly coord2addressService: Coord2addressService,
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

        if (!_naverLandArticle.address) {
            const coord = await this.coord2addressService.getAddressByCoord({
                lat: _naverLandArticle.lat,
                lng: _naverLandArticle.lng,
            });

            _naverLandArticle.region1 = coord.data.address.region_1depth_name;
            _naverLandArticle.region2 = coord.data.address.region_2depth_name;
            _naverLandArticle.region3 = coord.data.address.region_3depth_name;
            _naverLandArticle.address = coord.data.address.address_name;
        }

        return this.naverLandArticleRepository.save(_naverLandArticle);
    }
}
