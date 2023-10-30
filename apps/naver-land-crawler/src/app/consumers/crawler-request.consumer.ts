import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { QueueType } from '@libs/common/interfaces/queue-type.interface';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import Bull from 'bull';
import { IJobData } from '../services/queue.service';

type IJob = Bull.Job<IJobData<QueueType.CRAWLER_REQUEST>>;

@Processor(QueueType.CRAWLER_REQUEST)
export class CrawlerRequestConsumer {
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
