import {
    OnQueueCompleted,
    OnQueueFailed,
    Process,
    Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { uSleep } from '@libs/utils/usleep.util';
import { ArticleListRequestDto } from '@libs/naver-land-client/clients/dtos/article-list.request.dto';
import { NaverLandClient } from '@libs/naver-land-client/clients/naver-land.client';
import { NaverLandCrawlerQueueType } from '@libs/naver-land-crawler/interfaces/queue.interface';
import { NaverLandCrawlerQueueService } from '@libs/naver-land-crawler/services/naver-land-crawler-queue.service';
import { NaverLandFinClient } from '@libs/naver-land-client/clients';
import { NaverLandArticleAdditionalInfoService } from '@libs/naver-land/services';
import { NaverLandArticleAdditionalInfoType } from '@libs/naver-land/interfaces/naver-land-article-additional-info.interface';
import { NaverLandArticleAdditionalInfo } from '@libs/naver-land/schemas';
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';

type JobData = ArticleListRequestDto;

@Processor(NaverLandCrawlerQueueType.RequestArticle)
export class GetNaverLandArticleProcessor {
    constructor(
        private readonly client: NaverLandClient,
        private readonly queueService: NaverLandCrawlerQueueService,
        private readonly naverLandFinClient: NaverLandFinClient,
        private readonly additionalInfoService: NaverLandArticleAdditionalInfoService,
    ) {}

    @Process()
    async onProcess(job: Job<JobData>) {
        const { ...dto } = job.data;

        let page = dto.page ?? 1;
        const maxPage = dto.maxPage ?? 9999;

        while (true) {
            dto.page = page;

            const articleResponse = await this.client.getArticleList(dto);
            if (articleResponse.body.length === 0) {
                break;
            }

            for (const article of articleResponse.body) {
                try {
                    const articleKey = await this.collectArticleKey(article.atclNo);
                    if (!articleKey.id) {
                        await uSleep(200);
                    }

                    if (articleKey.data.key.complexNumber) {
                        const articleComplex = await this.collectArticleComplex(
                            articleKey.data.key.complexNumber.toString(),
                        );
                        if (!articleComplex.id) {
                            await uSleep(200);
                        }
                    }

                    const articleBasicInfo = await this.collectBasicInfo({
                        articleNo: article.atclNo,
                        tradeType: article.tradTpCd,
                        realEstateType: article.rletTpCd,
                    });
                    if (!articleBasicInfo.id) {
                        await uSleep(200);
                    }

                    await this.queueService.addJob<NaverLandCrawlerQueueType.TransformArticle>(
                        NaverLandCrawlerQueueType.TransformArticle,
                        article,
                    );
                } catch (error) {
                    console.error('GetNaverLandArticleProcessor', error);
                }
            }

            if (page++ >= maxPage) {
                break;
            }

            await uSleep(3000);
        }
    }

    @OnQueueCompleted()
    async onCompleted(job: Job<JobData>, result: any) {
        // console.log(`${NaverLandCrawlerQueueType.RequestArticle} completed`);
    }

    @OnQueueFailed()
    async onFailed(job: Job<JobData>, e: any) {
        console.log(e);
    }

    /**
     *
     * @param articleNo
     * @private
     */
    private async collectArticleKey(
        articleNo: string,
    ): Promise<
        Partial<
            NaverLandArticleAdditionalInfo<NaverLandArticleAdditionalInfoType.KeyInfo>
        >
    > {
        try {
            const oriData =
                await this.additionalInfoService.findOneByKey<NaverLandArticleAdditionalInfoType.KeyInfo>(
                    {
                        type: NaverLandArticleAdditionalInfoType.KeyInfo,
                        key: articleNo,
                    },
                );
            if (oriData) {
                return oriData;
            }

            const articleKeyResponse =
                await this.naverLandFinClient.getArticleKey(articleNo);

            await this.additionalInfoService.upsert<NaverLandArticleAdditionalInfoType.KeyInfo>(
                {
                    type: NaverLandArticleAdditionalInfoType.KeyInfo,
                    key: articleNo,
                    data: articleKeyResponse.result,
                },
            );

            return {
                data: articleKeyResponse.result,
            };
        } catch (e) {
            return null;
        }
    }

    /**
     *
     * @param complexNo
     * @private
     */
    private async collectArticleComplex(
        complexNo: string,
    ): Promise<
        Partial<
            NaverLandArticleAdditionalInfo<NaverLandArticleAdditionalInfoType.ComplexInfo>
        >
    > {
        const oriData =
            await this.additionalInfoService.findOneByKey<NaverLandArticleAdditionalInfoType.ComplexInfo>(
                {
                    type: NaverLandArticleAdditionalInfoType.ComplexInfo,
                    key: complexNo,
                },
            );
        if (oriData) {
            return oriData;
        }

        const response = await this.naverLandFinClient.getArticleComplex(
            complexNo,
        );

        await this.additionalInfoService.upsert<NaverLandArticleAdditionalInfoType.ComplexInfo>(
            {
                type: NaverLandArticleAdditionalInfoType.ComplexInfo,
                key: complexNo,
                data: response.result,
            },
        );

        return {
            data: response.result,
        };
    }

    /**
     *
     * @param filter
     * @private
     */
    private async collectBasicInfo({
        articleNo,
        tradeType,
        realEstateType,
    }: {
        articleNo: string;
        tradeType: TradeType;
        realEstateType: string;
    }): Promise<
        Partial<
            NaverLandArticleAdditionalInfo<NaverLandArticleAdditionalInfoType.BasicInfo>
        >
    > {
        const key = [articleNo, tradeType, realEstateType].join(':');

        const oriData =
            await this.additionalInfoService.findOneByKey<NaverLandArticleAdditionalInfoType.BasicInfo>(
                {
                    type: NaverLandArticleAdditionalInfoType.BasicInfo,
                    key,
                },
            );
        if (oriData) {
            return oriData;
        }

        const articleBasicInfo =
            await this.naverLandFinClient.getArticleBasicInfo({
                articleNo,
                tradeType,
                realEstateType,
            });

        await this.additionalInfoService.upsert<NaverLandArticleAdditionalInfoType.BasicInfo>(
            {
                type: NaverLandArticleAdditionalInfoType.BasicInfo,
                key,
                data: articleBasicInfo.result,
            },
        );

        return {
            data: articleBasicInfo.result,
        };
    }
}
