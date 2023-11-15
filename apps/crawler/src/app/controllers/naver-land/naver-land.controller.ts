import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NaverLandCrawlerQueue } from '../../queues/naver-land-crawler-queue';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleListRequestDto } from '@libs/naver-land-client/dtos/article-list.request.dto';
import { QueueType } from '@libs/common/interfaces/queue-type.interface';
import { SearchNaverLandRequestDto } from './dtos/search-naver-land.request.dto';
import { NaverLandCrawlerService } from '@libs/naver-land-crawler/naver-land-crawler.service';
import { toPagination } from '@libs/utils/to-pagination';

@ApiTags('네이버 부동산')
@Controller('/v1/naver-land')
export class NaverLandController {
    constructor(
        private readonly queueService: NaverLandCrawlerQueue,
        private readonly naverLandCrawlerService: NaverLandCrawlerService,
    ) {}

    @ApiOperation({
        operationId: 'NaverLand.collect',
        description: '부동산 매물 수집을 요청합니다.',
    })
    @ApiBody({
        type: ArticleListRequestDto,
    })
    @ApiResponse({
        status: 200,
    })
    @Post('collect')
    public async collect(@Body() dto: ArticleListRequestDto) {
        const job =
            await this.queueService.addJob<QueueType.CRAWLER_NAVER_LAND_REQUEST>(
                dto,
            );

        return {
            jobId: job.id,
        };
    }

    @ApiOperation({
        operationId: 'NaverLand.getArticles',
        description: '부동산 매물을 검색합니다.',
    })
    @ApiResponse({
        status: 200,
    })
    @Get()
    public async searchNaverLandArticles(
        @Query() dto: SearchNaverLandRequestDto,
    ) {
        const count = await this.naverLandCrawlerService.countByDto(dto);
        const articles = await this.naverLandCrawlerService.search(dto);

        return {
            list: articles,
            pagination: toPagination({
                page: dto.page,
                pageSize: dto.pageSize,
                count,
            }),
        };
    }
}
