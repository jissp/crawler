import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { QueueType } from '@libs/common/interfaces/queue-type.interface';
import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import { NaverLandCrawlerService } from '@libs/naver-land-crawler/naver-land-crawler.service';
import { CrawlerService } from '@libs/crawler/services/crawler.service';
import Bull from 'bull';
import { IJobData } from '../services/queue.service';

type IJob = Bull.Job<IJobData<QueueType.CRAWLER_REQUEST>>;

@Processor(QueueType.CRAWLER_REQUEST)
export class CrawlerRequestConsumer {
    constructor(
        private readonly naverLandCrawler: NaverLandCrawler,
        private readonly naverLandCrawlerService: NaverLandCrawlerService,
        private readonly crawlerService: CrawlerService,
    ) {}

    @Process()
    async onProcess(job: IJob) {
        const iArticles = await this.naverLandCrawler.run(job.data);
        if (!iArticles.length) {
            return;
        }

        // Article 정보 저장
        return await Promise.allSettled(
            iArticles.map((iArticle) => {
                // Article 정보 저장
                this.crawlerService.save({
                    type: CrawlerType.NAVER_LAND,
                    no: iArticle.atclNo,
                    data: iArticle,
                });

                // NaverLandArticle 스키마 형식으로 변경 후 저장
                return this.naverLandCrawlerService.save(
                    this.naverLandCrawler.transform(iArticle),
                );
            }),
        );
    }

    @OnQueueCompleted()
    async onCompleted(job: IJob, result: any) {
        console.log(`Job ${job.id} completed with result ${result}`);
    }
}
