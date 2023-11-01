import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AwsRecentArticle } from '@libs/aws-recent-crawler/schemas/aws-recent-article.schema';
import { InjectRepository } from '@nestjs/typeorm';

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

    async save(awsRecentArticle: Partial<AwsRecentArticle>) {
        let _awsRecentArticle =
            (await this.findOneByGuid(awsRecentArticle.guid)) ??
            new AwsRecentArticle();

        return this.awsRecentArticleRepository.save(_awsRecentArticle);
    }
}
