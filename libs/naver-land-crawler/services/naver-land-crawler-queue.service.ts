import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { generateUuid } from '@libs/utils/generate-uuid';
import {
    NaverLandCrawlerQueueData,
    NaverLandCrawlerQueueType,
} from '@libs/naver-land-crawler/interfaces/queue.interface';

@Injectable()
export class NaverLandCrawlerQueueService {
    private queueMap: { [key in NaverLandCrawlerQueueType]?: Queue } = {};

    constructor(
        @InjectQueue(NaverLandCrawlerQueueType.RequestArticle)
        private requestArticleQueue: Queue,
        @InjectQueue(NaverLandCrawlerQueueType.TransformArticle)
        private transformArticleQueue: Queue,
    ) {
        this.queueMap[NaverLandCrawlerQueueType.RequestArticle] =
            requestArticleQueue;
        this.queueMap[NaverLandCrawlerQueueType.TransformArticle] =
            transformArticleQueue;
    }

    /**
     *
     * @param queueType
     * @private
     */
    private getQueue(queueType: NaverLandCrawlerQueueType) {
        return this.queueMap[queueType] ?? null;
    }

    /**
     *
     * @param queueType
     * @param data
     */
    async addJob<T extends NaverLandCrawlerQueueType>(
        queueType: NaverLandCrawlerQueueType,
        data: NaverLandCrawlerQueueData<T>,
    ) {
        const queue = this.getQueue(queueType);
        if (!queue) {
            return null;
        }

        return await queue.add(data, {
            jobId: generateUuid(),
            removeOnComplete: true,
            removeOnFail: true,
        });
    }

    /**
     *
     * @param queueType
     * @param jobId
     */
    async getJob<T extends NaverLandCrawlerQueueType>(
        queueType: NaverLandCrawlerQueueType,
        jobId: string,
    ): Promise<Job<NaverLandCrawlerQueueData<T>>> {
        const queue = this.getQueue(queueType);
        if (!queue) {
            return null;
        }

        return await queue.getJob(jobId);
    }
}
