import { Injectable } from '@nestjs/common';
import Bull, { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { QueueType } from '@libs/common/interfaces/queue-type.interface';
import { ArticleListRequestDto } from '@libs/naver-land-client/dtos/article-list.request.dto';
import { generateUuid } from '@libs/utils/generate-uuid';

export type IJobData<T extends QueueType> =
    T extends QueueType.CRAWLER_NAVER_LAND_REQUEST
        ? ArticleListRequestDto
        : undefined;

@Injectable()
export class NaverLandCrawlerQueue {
    constructor(
        @InjectQueue(QueueType.CRAWLER_NAVER_LAND_REQUEST)
        private queue: Queue,
    ) {}

    async addJob<T extends QueueType>(data: IJobData<T>) {
        return await this.queue.add(data, {
            removeOnComplete: true,
            jobId: generateUuid(),
        });
    }

    async getJob<T extends QueueType>(
        jobId: string,
    ): Promise<Bull.Job<IJobData<T>>> {
        return await this.queue.getJob(jobId);
    }
}
