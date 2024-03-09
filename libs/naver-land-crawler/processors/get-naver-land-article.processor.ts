import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { uSleep } from '@libs/utils/usleep.util';
import { ArticleListRequestDto } from '@libs/naver-land-client/clients/dtos/article-list.request.dto';
import { NaverLandClient } from '@libs/naver-land-client/clients/naver-land.client';
import { NaverLandCrawlerQueueType } from '@libs/naver-land-crawler/interfaces/queue.interface';
import { NaverLandCrawlerQueueService } from '@libs/naver-land-crawler/services/naver-land-crawler-queue.service';
import { NaverLandFinClient } from '@libs/naver-land-client/clients';
import {
    NaverLandArticleKeyService,
    NaverLandComplexService,
    NaverLandTransportService,
} from '@libs/naver-land/services';
import {
    NaverLandBasicInfoFindOneFilter,
    NaverLandBasicInfoService,
} from '@libs/naver-land/services/naver-land-basic-info.service';
import { NaverLandArticleKey } from '@libs/naver-land/schemas/naver-land-article-key.schema';
import {
    NaverLandArticleBasicInfo,
    NaverLandArticleComplex,
} from '@libs/naver-land/schemas';

type JobData = ArticleListRequestDto;

@Processor(NaverLandCrawlerQueueType.RequestArticle)
export class GetNaverLandArticleProcessor {
    constructor(
        private readonly client: NaverLandClient,
        private readonly queueService: NaverLandCrawlerQueueService,
        private readonly naverLandFinClient: NaverLandFinClient,
        private readonly articleKeyService: NaverLandArticleKeyService,
        private readonly complexService: NaverLandComplexService,
        private readonly transportService: NaverLandTransportService,
        private readonly basicInfoService: NaverLandBasicInfoService,
    ) {}

    @Process()
    async onProcess(job: Job<JobData>) {
        const { ...dto } = job.data;

        let page = dto.page ?? 1;
        const maxPage = dto.maxPage ?? 999;

        while (true) {
            dto.page = page;

            const articleResponse = await this.client.getArticleList(dto);
            if (articleResponse.body.length === 0) {
                break;
            }

            for (const article of articleResponse.body) {
                const articleKey = await this.collectArticleKey(article.atclNo);
                if (!articleKey.articleNo) {
                    await uSleep(200);
                }

                if (['아파트', '오피스텔'].includes(article.rletTpNm)) {
                    const articleComplex = await this.collectArticleComplex(
                        articleKey.data.key.complexNumber,
                    );
                    if (!articleComplex.complexNo) {
                        await uSleep(200);
                    }
                }

                const articleBasicInfo = await this.collectBasicInfo({
                    articleNo: article.atclNo,
                    tradeType: article.tradTpCd,
                    realEstateType: article.rletTpCd,
                });
                if (!articleBasicInfo.articleNo) {
                    await uSleep(200);
                }

                await this.queueService.addJob<NaverLandCrawlerQueueType.TransformArticle>(
                    NaverLandCrawlerQueueType.TransformArticle,
                    article,
                );
            }

            if (page++ >= maxPage) {
                break;
            }

            await uSleep(3000);
        }
    }

    @OnQueueCompleted()
    async onCompleted(job: Job<JobData>, result: any) {
        console.log(`${NaverLandCrawlerQueueType.RequestArticle} completed`);
    }

    /**
     *
     * @param articleNo
     * @private
     */
    private async collectArticleKey(
        articleNo: string,
    ): Promise<Partial<NaverLandArticleKey>> {
        const oriData = await this.articleKeyService.findOneBy(articleNo);
        if (oriData) {
            return oriData;
        }

        const articleKeyResponse = await this.naverLandFinClient.getArticleKey(
            articleNo,
        );

        await this.articleKeyService.upsert({
            articleNo,
            data: articleKeyResponse.result,
        });

        return {
            data: articleKeyResponse.result,
        };
    }

    /**
     *
     * @param complexNo
     * @private
     */
    private async collectArticleComplex(
        complexNo: number,
    ): Promise<Partial<NaverLandArticleComplex>> {
        const oriData = await this.complexService.findByComplexNo(complexNo);
        if (oriData) {
            return oriData;
        }

        const response = await this.naverLandFinClient.getArticleComplex(
            complexNo,
        );

        await this.complexService.upsert({
            complexNo,
            data: response.result,
        });

        return {
            data: response.result,
        };
    }

    /**
     *
     * @param filter
     * @private
     */
    private async collectBasicInfo(
        filter: NaverLandBasicInfoFindOneFilter,
    ): Promise<Partial<NaverLandArticleBasicInfo>> {
        const oriData = await this.basicInfoService.findOneBy(filter);
        if (oriData) {
            return oriData;
        }

        const articleBasicInfo =
            await this.naverLandFinClient.getArticleBasicInfo(filter);

        await this.basicInfoService.upsert({
            ...filter,
            data: articleBasicInfo.result,
        });

        return {
            data: articleBasicInfo.result,
        };
    }

    /**
     * @param articleNo
     * @private
     */
    private async collectTransportData(articleNo: string) {
        const oriTransport = await this.transportService.findByArticleNo(
            articleNo,
        );
        if (oriTransport) {
            return false;
        }

        const transport = await this.naverLandFinClient.getArticleTransport(
            articleNo,
        );

        await this.transportService.upsert({
            articleNo,
            data: transport.result,
        });

        return true;
    }
}
