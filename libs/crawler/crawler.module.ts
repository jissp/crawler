import { Module } from '@nestjs/common';
import { CrawlerService } from '@libs/crawler/services/crawler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@libs/crawler/schemas/article.schema';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [CrawlerService],
    exports: [CrawlerService],
})
export class CrawlerModule {}
