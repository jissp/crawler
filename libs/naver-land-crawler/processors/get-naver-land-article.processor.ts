import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { uSleep } from '@libs/utils/usleep.util';
import { ArticleListRequestDto } from '@libs/naver-land-client/clients/dtos/article-list.request.dto';
import { NaverLandClient } from '@libs/naver-land-client/clients/naver-land.client';
import { NaverLandCrawlerQueueType } from '@libs/naver-land-crawler/interfaces/queue.interface';
import { NaverLandCrawlerQueueService } from '@libs/naver-land-crawler/services/naver-land-crawler-queue.service';
import { NaverLandFinClient } from '@libs/naver-land-client/clients';
import { NaverLandTransportService } from '@libs/naver-land/services';

type JobData = ArticleListRequestDto;

@Processor(NaverLandCrawlerQueueType.RequestArticle)
export class GetNaverLandArticleProcessor {
    constructor(
        private readonly client: NaverLandClient,
        private readonly queueService: NaverLandCrawlerQueueService,
        private readonly naverLandFinClient: NaverLandFinClient,
        private readonly transportService: NaverLandTransportService,
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
                const [addJobResult, collectTransportResult] =
                    await Promise.allSettled([
                        this.queueService.addJob<NaverLandCrawlerQueueType.TransformArticle>(
                            NaverLandCrawlerQueueType.TransformArticle,
                            article,
                        ),
                        this.collectTransportData(article.atclNo),
                    ]);

                if (
                    collectTransportResult.status === 'fulfilled' &&
                    collectTransportResult.value
                ) {
                    await uSleep(200);
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
        console.log(`${NaverLandCrawlerQueueType.RequestArticle} completed`);
    }

    /**
     *
     *
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
