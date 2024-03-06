import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaverLandArticleTransport } from '@libs/naver-land/schemas/naver-land-article-transport.schema';
import { INaverLandArticleTransport } from '@libs/naver-land/interfaces/naver-land-article-transport.interface';
import { NaverLandArticle } from '@libs/naver-land/schemas';

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
        naverLandArticleTransport: Partial<INaverLandArticleTransport>,
    ) {
        let oriArticleTransport =
            (await this.articleTransportRepository.findOneBy({
                articleNo: naverLandArticleTransport.articleNo,
            })) || new NaverLandArticle();

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
        return this.articleTransportRepository.findOneBy({
            articleNo,
        });
    }
}
