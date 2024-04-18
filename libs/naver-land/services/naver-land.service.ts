import { Injectable } from '@nestjs/common';
import { SearchNaverLandRequestDto } from '../../../apps/crawler/src/app/controllers/naver-land/dtos/search-naver-land.request.dto';
import { INaverLandArticle } from '@libs/naver-land/interfaces/naver-land-article.interface';
import { NaverLandArticle } from '@libs/naver-land/schemas/naver-land-article.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Max, Min } from 'class-validator';

@Injectable()
export class NaverLandService {
    constructor(
        @InjectRepository(NaverLandArticle)
        private readonly naverLandArticleRepository: Repository<NaverLandArticle>,
    ) {}

    /**
     *
     */
    public async findAll() {
        return this.naverLandArticleRepository.find();
    }

    /**
     *
     * @param dto
     */
    public async countByDto(dto: SearchNaverLandRequestDto) {
        return this.createBuilderByDto(dto).getCount();
    }

    /**
     *
     * @param dto
     */
    public async search(dto: SearchNaverLandRequestDto) {
        return this.createBuilderByDto(dto)
            .offset((dto.page - 1) * dto.pageSize)
            .limit(dto.pageSize)
            .orderBy('created_at', 'DESC')
            .getMany();
    }

    /**
     *
     * @param id
     */
    public async findOneById(id: number) {
        return this.naverLandArticleRepository.findOneBy({
            id,
        });
    }

    /**
     *
     * @param articleNo
     */
    public async findOneByArticleNo(
        articleNo: string,
    ): Promise<NaverLandArticle | null> {
        return this.naverLandArticleRepository.findOneBy({
            articleNo,
        });
    }

    /**
     *
     * @param naverLandArticle
     */
    public async upsert(naverLandArticle: Partial<INaverLandArticle>) {
        let oriArticle =
            (await this.naverLandArticleRepository.findOneBy({
                articleNo: naverLandArticle.articleNo,
            })) || new NaverLandArticle();

        oriArticle = Object.assign(oriArticle, naverLandArticle);

        return this.naverLandArticleRepository.save(oriArticle);
    }

    /**
     *
     * @param dto
     * @private
     */
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

        if (dto.completionYearMin && dto.completionYearMax) {
            builder.andWhere({
                completionYear: Between(
                    dto.completionYearMin,
                    dto.completionYearMax,
                ),
            });
        } else if (dto.completionYearMin) {
            builder.andWhere({
                completionYear: Min(dto.completionYearMin),
            });
        } else if (dto.completionYearMax) {
            builder.andWhere({
                completionYear: Max(dto.completionYearMin),
            });
        }

        if (dto.region1) {
            builder.andWhere({
                region1: dto.region1,
            });
        }

        if (dto.region2) {
            builder.andWhere({
                region2: dto.region2,
            });
        }

        if (dto.region3) {
            builder.andWhere({
                region3: dto.region3,
            });
        }

        if (dto.direction) {
            builder.andWhere({
                direction:
                    typeof dto.direction === 'string'
                        ? dto.direction
                        : In(dto.direction),
            });
        }

        return builder;
    }
}
