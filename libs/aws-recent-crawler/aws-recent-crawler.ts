import { Injectable } from '@nestjs/common';
import { CrawlerAbstract } from '@libs/crawler/interfaces/crawler.abstract';
import {
    CrawlerParseResponse,
    CrawlerType,
} from '@libs/crawler/interfaces/crawler.interface';
import { AwsRecentClient } from '@libs/aws-recent-client/aws-recent.client';
import { parseString } from 'xml2js';
import * as util from 'util';
import { IAwsRecentItem } from '@libs/aws-recent-crawler/interfaces/aws-recent-crawler.interface';
import * as _ from 'lodash';
import { CrawlerService } from '@libs/crawler/services/crawler.service';
import { AwsRecentArticle } from '@libs/aws-recent-crawler/schemas/aws-recent-article.schema';
import { AwsRecentCrawlerService } from '@libs/aws-recent-crawler/aws-recent-crawler.service';
import { IAwsRecentArticleSchema } from "@libs/aws-recent-crawler/schemas/aws-recent-article.interface";

const parseByXml = util.promisify(parseString);

@Injectable()
export class AwsRecentCrawler extends CrawlerAbstract<CrawlerType.AWS_RECENT> {
    constructor(
        protected readonly client: AwsRecentClient,
        private readonly crawlerService: CrawlerService,
        private readonly awsRecentCrawlerService: AwsRecentCrawlerService,
    ) {
        super(client);
    }

    async run(): Promise<any> {
        const recent = await this.client.getRecent();

        const items = await this.parseXml(recent);

        const transformedItems = items.map(this.transform);
        const sortedTransformedItems = _.sortBy(transformedItems, 'pubDate');

        const results = await Promise.allSettled(
            sortedTransformedItems.map(async (item) => {
                // Crawler 정보 저장
                await this.crawlerService.save({
                    type: CrawlerType.AWS_RECENT,
                    no: item.guid,
                    data: item,
                });

                // AWS Recent Table에 저장
                return this.awsRecentCrawlerService.save(item);
            }),
        );

        console.log(results);
    }

    private async parseXml(recent: string) {
        const xml: any = await parseByXml(recent);

        return xml.rss.channel[0].item as IAwsRecentItem[];
    }

    transform(
        data: CrawlerParseResponse<CrawlerType.AWS_RECENT>,
    ): IAwsRecentArticleSchema {
        return {
            guid: data.guid[0]._,
            title: data.title[0],
            link: data.link[0],
            description: data.description[0],
            category: data.category[0],
            author: data.author[0],
            pubAt: new Date(data.pubDate[0]),
        };
    }
}
