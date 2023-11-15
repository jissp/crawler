import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { INaverLandArticleSchema } from '@libs/naver-land-crawler/interfaces/naver-land-article.schema.interface';
import * as _ from 'lodash';
import { NaverLandArticle } from '@libs/naver-land-crawler/schemas/naver-land-article.schema';
import { Coord2addressService } from '@libs/coord2address/services/coord2address.service';
import { SearchNaverLandRequestDto } from '../../apps/crawler/src/app/controllers/naver-land/dtos/search-naver-land.request.dto';
import { Max, Min } from 'class-validator';

@Injectable()
export class NaverLandCrawlerService {
    constructor(
        private readonly coord2addressService: Coord2addressService,
        @InjectRepository(NaverLandArticle)
        private readonly naverLandArticleRepository: Repository<NaverLandArticle>,
    ) {}

    public async findAll() {
        return this.naverLandArticleRepository.find();
    }

    public async countByDto(dto: SearchNaverLandRequestDto) {
        return this.createBuilderByDto(dto).getCount();
    }

    public async search(dto: SearchNaverLandRequestDto) {
        return this.createBuilderByDto(dto)
            .offset((dto.page - 1) * dto.pageSize)
            .limit(dto.pageSize)
            .orderBy('created_at', 'DESC')
            .getMany();
    }

    public async findOneById(id: number) {
        return this.naverLandArticleRepository.findOneBy({
            id,
        });
    }

    public async findOneByArticleNo(articleNo: string) {
        return this.naverLandArticleRepository.findOneBy({
            articleNo,
        });
    }

    public async save(naverLandArticle: Partial<INaverLandArticleSchema>) {
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

    public async getRegionList() {
        const builder = this.naverLandArticleRepository.createQueryBuilder();

        return builder
            .select('region1, region2, region3')
            .distinct(true)
            .getRawMany<{
                region1: string;
                region2: string;
                region3: string;
            }>()
            .then((result) => result.map((region) => region));
    }

    private createBuilderByDto(dto: SearchNaverLandRequestDto) {
        const builder = this.naverLandArticleRepository.createQueryBuilder();

        if (dto.tradTpCd) {
            builder.andWhere({
                tradTpCd:
                    typeof dto.tradTpCd === 'string'
                        ? dto.tradTpCd
                        : In(dto.tradTpCd),
            });
        }

        if (dto.rletTpNm) {
            builder.andWhere({
                rletTpNm:
                    typeof dto.rletTpNm === 'string'
                        ? dto.rletTpNm
                        : In(dto.rletTpNm),
            });
        }

        if (dto.spc1Min && dto.spc1Max) {
            builder.andWhere({
                spc1: Between(dto.spc1Min, dto.spc1Max),
            });
        } else if (dto.spc1Min) {
            builder.andWhere({
                spc1: Min(dto.spc1Min),
            });
        } else if (dto.spc1Max) {
            builder.andWhere({
                spc1: Max(dto.spc1Min),
            });
        }

        if (dto.spc2Min && dto.spc2Max) {
            builder.andWhere({
                spc2: Between(dto.spc2Min, dto.spc2Max),
            });
        } else if (dto.spc2Min) {
            builder.andWhere({
                spc2: Min(dto.spc2Min),
            });
        } else if (dto.spc2Max) {
            builder.andWhere({
                spc2: Max(dto.spc2Min),
            });
        }

        if (dto.roomCountMin && dto.roomCountMax) {
            builder.andWhere({
                roomCount: Between(dto.roomCountMin, dto.roomCountMax),
            });
        } else if (dto.roomCountMin) {
            builder.andWhere({
                roomCount: Min(dto.roomCountMin),
            });
        } else if (dto.roomCountMax) {
            builder.andWhere({
                roomCount: Max(dto.roomCountMin),
            });
        }

        return builder;
    }
}
