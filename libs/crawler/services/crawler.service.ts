import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crawling } from '@libs/crawler/schemas/crawling.schema';
import { Repository } from 'typeorm';
import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';

@Injectable()
export class CrawlerService {
    constructor(
        @InjectRepository(Crawling)
        private readonly crawlingRepository: Repository<Crawling>,
    ) {}

    async findOneById(id: number) {
        return this.crawlingRepository.findOne({
            where: {
                id,
            },
        });
    }

    async findOneByNo(type: CrawlerType, no: string) {
        return this.crawlingRepository.findOne({
            where: {
                type,
                no,
            },
        });
    }

    async findManyByType(type: CrawlerType) {
        return this.crawlingRepository.findBy({
            type,
        });
    }

    async save(data: Partial<Crawling>) {
        return this.crawlingRepository.save(data);
    }
}
