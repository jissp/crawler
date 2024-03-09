import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverLandArticleTransport } from '@libs/naver-land/schemas/naver-land-article-transport.schema';

@Injectable()
export class NaverLandTransportService {
    constructor(
        @InjectRepository(NaverLandArticleTransport)
        private readonly articleTransportRepository: Repository<NaverLandArticleTransport>,
    ) {}

    /**
     *
     * @param naverLandArticleTransport
     */
    public async upsert(
        naverLandArticleTransport: Partial<NaverLandArticleTransport>,
    ) {
        let oriArticleTransport =
            (await this.articleTransportRepository.findOneBy({
                articleNo: naverLandArticleTransport.articleNo,
            })) || new NaverLandArticleTransport();

        oriArticleTransport = Object.assign(
            oriArticleTransport,
            naverLandArticleTransport,
        );

        return this.articleTransportRepository.save(oriArticleTransport);
    }

    /**
     *
     * @param articleNo
     */
    public async findByArticleNo(
        articleNo: string,
    ): Promise<NaverLandArticleTransport | null> {
        if (articleNo === null) {
            return null;
        }

        return this.articleTransportRepository.findOneBy({
            articleNo,
        });
    }
}
