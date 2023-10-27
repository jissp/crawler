import { Test } from '@nestjs/testing';
import { baseNaverLandRequestDto } from '@libs/naver-land-client/tests/test.util';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import { StartedTestContainer } from 'testcontainers';
import { loadDatabaseContainer } from '@libs/utils/test/load-database-container';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CrawlerModule } from '@libs/crawler/crawler.module';
import { CrawlerService } from '@libs/crawler/services/crawler.service';
import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';
import { NaverLandCrawlerModule } from '@libs/naver-land-crawler/naver-land-crawler.module';

describe('Crawler Save Test', () => {
    let databaseContainer: StartedTestContainer;

    let naverLandCrawler: NaverLandCrawler;
    let crawlerService: CrawlerService;

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
                NaverLandCrawlerModule,
            ],
        }).compile();

        naverLandCrawler = moduleRef.get<NaverLandCrawler>(NaverLandCrawler);
        crawlerService = moduleRef.get<CrawlerService>(CrawlerService);
    });

    afterAll(async () => {
        await databaseContainer.stop();
    });

    it('run', async () => {
        const oriArticles = await naverLandCrawler.run(
            baseNaverLandRequestDto({
                z: 13,
                lat: 37.5030847,
                lon: 126.996848,
                btm: 37.4390515,
                lft: 126.832053,
                top: 37.567063,
                rgt: 127.1616429,
                page: 1,
                maxPage: 1,
            }),
        );

        // 저장 테스트
        const results = await Promise.allSettled(
            oriArticles.map((oriArticle) => {
                return crawlerService.save({
                    type: CrawlerType.NAVER_LAND,
                    no: oriArticle.atclNo,
                    data: oriArticle,
                });
            }),
        );

        expect(
            results.filter((result) => result.status === 'fulfilled').length,
        ).toBeGreaterThan(0);

        // 데이터 조회 후 테스트
        const articles = await crawlerService.findManyByType(
            CrawlerType.NAVER_LAND,
        );

        expect(articles.length).toBeGreaterThan(0);
    });
});
