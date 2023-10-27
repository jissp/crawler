import { Test } from '@nestjs/testing';
import { baseNaverLandRequestDto } from '@libs/naver-land-client/tests/test.util';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import { StartedTestContainer } from 'testcontainers';
import { loadDatabaseContainer } from '@libs/utils/test/load-database-container';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { CrawlerModule } from '@libs/crawler/crawler.module';
import { NaverLandCrawlerModule } from '@libs/naver-land-crawler/naver-land-crawler.module';
import { NaverLandCrawlerService } from '@libs/naver-land-crawler/naver-land-crawler.service';

describe('NaverLandCrawler', () => {
    let databaseContainer: StartedTestContainer;

    let naverLandCrawler: NaverLandCrawler;
    let naverLandCrawlerService: NaverLandCrawlerService;

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
            providers: [],
            exports: [],
        }).compile();

        naverLandCrawler = moduleRef.get<NaverLandCrawler>(NaverLandCrawler);
        naverLandCrawlerService = moduleRef.get<NaverLandCrawlerService>(
            NaverLandCrawlerService,
        );
    });

    afterAll(async () => {
        await databaseContainer.stop();
    });

    it('naverLandArticle Save 테스트', async () => {
        const articles = await naverLandCrawler.run(
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

        const naverLandArticles = articles.map((article) => {
            return naverLandCrawler.transform(article);
        });

        const response = await Promise.allSettled(
            naverLandArticles.map((naverLandArticle) => {
                return naverLandCrawlerService.save(naverLandArticle);
            }),
        );

        const fulfilledResponse = response.filter(
            (res) => res.status === 'fulfilled',
        );

        expect(fulfilledResponse.length).toBeGreaterThan(0);

        const savedNaverLandArticles = await naverLandCrawlerService.findAll();
        expect(savedNaverLandArticles.length).toBe(fulfilledResponse.length);
    });
});
