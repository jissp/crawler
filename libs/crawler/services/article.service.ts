import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '@libs/crawler/schemas/article.schema';
import { Repository } from 'typeorm';
import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) {}

    async findOneById(id: number) {
        return this.articleRepository.findOne({
            where: {
                id,
            },
        });
    }

    async findOneByNo(type: CrawlerType, no: string) {
        return this.articleRepository.findOne({
            where: {
                type,
                no,
            },
        });
    }

    async findManyByType(type: CrawlerType) {
        return this.articleRepository.findBy({
            type,
        });
    }

    async save(data: Partial<Article>) {
        return this.articleRepository.save(data);
    }
}
