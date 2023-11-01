import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AwsRecentArticle } from '@libs/aws-recent-crawler/schemas/aws-recent-article.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { IAwsRecentArticleSchema } from '@libs/aws-recent-crawler/schemas/aws-recent-article.interface';
import * as _ from 'lodash';

@Injectable()
export class AwsRecentCrawlerService {
    constructor(
        @InjectRepository(AwsRecentArticle)
        private readonly awsRecentArticleRepository: Repository<AwsRecentArticle>,
    ) {}

    async findAll() {
        return this.awsRecentArticleRepository.find();
    }

    async findOneById(id: number) {
        return this.awsRecentArticleRepository.findOneBy({
            id,
        });
    }

    async findOneByGuid(guid: string) {
        return this.awsRecentArticleRepository.findOneBy({
            guid,
        });
    }

    async save(awsRecentArticle: IAwsRecentArticleSchema) {
        let _awsRecentArticle =
            (await this.findOneByGuid(awsRecentArticle.guid)) ??
            new AwsRecentArticle();

        _awsRecentArticle = _.merge(_awsRecentArticle, awsRecentArticle);

        return this.awsRecentArticleRepository.save(_awsRecentArticle);
    }
}
