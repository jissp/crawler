import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '@libs/crawler/schemas/article.schema';
import { Repository } from 'typeorm';
import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';
import * as _ from 'lodash';
import { IArticleSchema } from '@libs/crawler/interfaces/article.schema.interface';

@Injectable()
export class CrawlerService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) {}

    async findOneById(id: number) {
        return this.articleRepository.findOneBy({
            id,
        });
    }

    async findOneByNo(type: CrawlerType, no: string) {
        return this.articleRepository.findOneBy({
            type,
            no,
        });
    }

    async findManyByType(type: CrawlerType) {
        return this.articleRepository.findBy({
            type,
        });
    }

    async save(article: Partial<IArticleSchema>) {
        try {
            let _article =
                (await this.findOneByNo(article.type, article.no)) ?? new Article();

            _article = _.merge(_article, article);

            return this.articleRepository.save(_article);
        } catch (e) {
            console.log(e);
        }
    }
}
