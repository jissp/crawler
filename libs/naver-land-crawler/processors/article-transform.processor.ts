import {
    OnQueueCompleted,
    OnQueueFailed,
    Process,
    Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { IArticle } from '@libs/naver-land-client/clients/dtos/article-list.response.dto';
import { Coord2addressService } from '@libs/coord2address/services/coord2address.service';
import { NaverLandTransformer } from '@libs/naver-land-crawler/naver-land.transformer';
import { NaverLandService } from '@libs/naver-land/services/naver-land.service';
import { NaverLandCrawlerQueueType } from '@libs/naver-land-crawler/interfaces/queue.interface';
import { NaverLandArticleAdditionalInfoService } from '@libs/naver-land/services';
import { NaverLandArticleAdditionalInfoType } from '@libs/naver-land/interfaces/naver-land-article-additional-info.interface';

type JobData = IArticle;

@Processor(NaverLandCrawlerQueueType.TransformArticle)
export class ArticleTransformProcessor {
    constructor(
        private readonly naverLandService: NaverLandService,
        private readonly additionalInfoService: NaverLandArticleAdditionalInfoService,
        private readonly coord2addressService: Coord2addressService,
    ) {}

    @Process()
    async onProcess(job: Job<JobData>) {
        const { ...article } = job.data;

        const articleKey =
            await this.additionalInfoService.findOneByKey<NaverLandArticleAdditionalInfoType.KeyInfo>(
                {
                    type: NaverLandArticleAdditionalInfoType.KeyInfo,
                    key: article.atclNo,
                },
            );
        const articleComplex = articleKey?.data.key.complexNumber
            ? await this.additionalInfoService.findOneByKey<NaverLandArticleAdditionalInfoType.ComplexInfo>(
                  {
                      type: NaverLandArticleAdditionalInfoType.ComplexInfo,
                      key: articleKey.data.key.complexNumber.toString(),
                  },
              )
            : null;
        const articleBasicInfo =
            await this.additionalInfoService.findOneByKey<NaverLandArticleAdditionalInfoType.BasicInfo>(
                {
                    type: NaverLandArticleAdditionalInfoType.BasicInfo,
                    key: [
                        article.atclNo,
                        article.tradTpCd,
                        article.rletTpCd,
                    ].join(':'),
                },
            );

        const transformer = new NaverLandTransformer(
            article,
            articleComplex?.data,
            articleBasicInfo?.data,
        );
        const toArticle = transformer.transform();

        const oriArticle = await this.naverLandService.findOneByArticleNo(
            toArticle.articleNo,
        );
        if (!oriArticle || !oriArticle.address) {
            const addressByCoord =
                await this.coord2addressService.getAddressByCoord({
                    lat: article.lat,
                    lng: article.lng,
                });

            transformer.buildArticleAddressBy(toArticle, addressByCoord.data);
        }

        await this.naverLandService.upsert(toArticle);
    }

    @OnQueueCompleted()
    async onCompleted(job: Job<JobData>, result: any) {
        // console.log(`${NaverLandCrawlerQueueType.TransformArticle} completed`);
    }

    @OnQueueFailed()
    async onFailed(job: Job<JobData>, e: any) {
        console.log(e);
    }
}
