import { Test } from '@nestjs/testing';
import { baseNaverLandRequestDto } from '@libs/naver-land-client/tests/test.util';
import { NaverLandCrawler } from '@libs/crawler/naver-land-crawler/naver-land.crawler';
import { NaverLandArticleService } from '../app/services/naver-land-article.service';
import { StartedTestContainer } from 'testcontainers';
import { loadDatabaseContainer } from '@libs/utils/test/load-database-container';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Article } from '@libs/crawler/schemas/article.schema';
import { NaverLandArticle } from '@libs/crawler/naver-land-crawler/schemas/naver-land-article.schema';
import { CrawlerModule } from '@libs/crawler/crawler.module';

describe('NaverLandCrawler', () => {
    let databaseContainer: StartedTestContainer;

    let naverLandCrawler: NaverLandCrawler;
    let naverLandArticleService: NaverLandArticleService;

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
                TypeOrmModule.forFeature([Article, NaverLandArticle]),
                CrawlerModule,
            ],
            providers: [NaverLandArticleService],
            exports: [NaverLandArticleService],
        }).compile();

        naverLandCrawler = moduleRef.get<NaverLandCrawler>(NaverLandCrawler);
        naverLandArticleService = moduleRef.get<NaverLandArticleService>(
            NaverLandArticleService,
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
            }),
        );

        const naverLandArticles = articles.map((article) => {
            return naverLandCrawler.transform(article);
        });

        const response = await Promise.allSettled(
            naverLandArticles.map((naverLandArticle) => {
                return naverLandArticleService.save(naverLandArticle);
            }),
        );

        const fulfilledResponse = response.filter(
            (res) => res.status === 'fulfilled',
        );

        expect(fulfilledResponse.length).toBeGreaterThan(0);

        const savedNaverLandArticles = await naverLandArticleService.findAll();
        expect(savedNaverLandArticles.length).toBe(fulfilledResponse.length);
    });
});
