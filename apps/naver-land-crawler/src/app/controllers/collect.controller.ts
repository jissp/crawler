import { Body, Controller, Post } from '@nestjs/common';
import { ArticleListRequestDto } from '@libs/naver-land-client/dtos/article-list.request.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NaverLandCrawler } from '@libs/naver-land-crawler/naver-land.crawler';
import { NaverLandArticleService } from '../services/naver-land-article.service';
import { ArticleService } from '@libs/crawler/services/article.service';
import { CrawlerType } from '@libs/crawler/interfaces/crawler.interface';

@ApiTags('수집')
@Controller('/v1/collect')
export class CollectController {
    constructor(
        private readonly naverLandCrawler: NaverLandCrawler,
        private readonly naverLandArticleService: NaverLandArticleService,
        private readonly articleService: ArticleService,
    ) {}

    @ApiOperation({
        description: '부동산 매물 수집을 요청합니다.',
    })
    @ApiBody({
        type: ArticleListRequestDto,
    })
    @ApiResponse({
        status: 200,
    })
    @Post()
    public async collect(@Body() dto: ArticleListRequestDto) {
        const iArticles = await this.naverLandCrawler.run(dto);
        if (!iArticles.length) {
            return;
        }

        // Article 정보 저장
        const articleSavedResults = await Promise.allSettled(
            iArticles.map((iArticle) => {
                // Article 정보 저장
                this.articleService.save({
                    type: CrawlerType.NAVER_LAND,
                    no: iArticle.atclNo,
                    data: iArticle,
                });

                // NaverLandArticle 스키마 형식으로 변경 후 저장
                return this.naverLandArticleService.save(
                    this.naverLandCrawler.transform(iArticle),
                );
            }),
        );
    }
}
