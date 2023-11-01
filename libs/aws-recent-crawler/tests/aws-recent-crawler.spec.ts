import { Test } from '@nestjs/testing';
import { StartedTestContainer } from 'testcontainers';
import { loadDatabaseContainer } from '@libs/utils/test/load-database-container';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AwsRecentCrawlerModule } from '@libs/aws-recent-crawler/aws-recent-crawler.module';
import { AwsRecentCrawler } from '@libs/aws-recent-crawler/aws-recent-crawler';
import { CrawlerModule } from '@libs/crawler/crawler.module';
import { CrawlerService } from '@libs/crawler/services/crawler.service';
import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';
import { AwsRecentCrawlerService } from '@libs/aws-recent-crawler/aws-recent-crawler.service';

describe('AwsRecentCrawler', () => {
    let databaseContainer: StartedTestContainer;

    let awsRecentCrawler: AwsRecentCrawler;
    let crawlerService: CrawlerService;
    let awsRecentCrawlerService: AwsRecentCrawlerService;

    beforeAll(async () => {
        const dbConfig = {
            databaseName: 'test',
            user: 'test',
            password: 'test',
        };

        databaseContainer = await loadDatabaseContainer(dbConfig).start();

        const moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    database: dbConfig.databaseName,
                    username: dbConfig.user,
                    password: dbConfig.password,
                    host: databaseContainer.getHost(),
                    port: databaseContainer.getMappedPort(3306),
                    synchronize: false,
                    autoLoadEntities: true,
                    namingStrategy: new SnakeNamingStrategy(),
                }),
                CrawlerModule,
                AwsRecentCrawlerModule,
            ],
        }).compile();

        awsRecentCrawler = moduleRef.get<AwsRecentCrawler>(AwsRecentCrawler);
        crawlerService = moduleRef.get<CrawlerService>(CrawlerService);
        awsRecentCrawlerService = moduleRef.get<AwsRecentCrawlerService>(
            AwsRecentCrawlerService,
        );
    });

    afterAll(async () => {
        await databaseContainer.stop();
    });

    it('AWS Recent 데이터가 Crawler 테이블에 수집 되어야 한다.', async () => {
        await awsRecentCrawler.run();

        const articles = await crawlerService.findManyByType(
            CrawlerType.AWS_RECENT,
        );

        expect(articles.length).toBeGreaterThan(0);
    });

    it('AWS Recent 데이터가 AwsRecentArticle 테이블에 수집 되어야 한다.', async () => {
        await awsRecentCrawler.run();

        const articles = await awsRecentCrawlerService.findAll();

        expect(articles.length).toBeGreaterThan(0);
    });
});
