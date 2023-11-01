import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { QueueType } from '@libs/common/interfaces/queue-type.interface';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import Bull from 'bull';
import { IJobData } from '../queues/naver-land-crawler-queue';

type IJob = Bull.Job<IJobData<QueueType.CRAWLER_NAVER_LAND_REQUEST>>;

@Processor(QueueType.CRAWLER_NAVER_LAND_REQUEST)
export class CrawlerNaverLandRequestConsumer {
    constructor(private readonly naverLandCrawler: NaverLandCrawler) {}

    @Process()
    async onProcess(job: IJob) {
        await this.naverLandCrawler.run(job.data);
    }

    @OnQueueCompleted()
    async onCompleted(job: IJob, result: any) {
        console.log(`Job ${job.id} completed with result ${result}`);
    }
}
