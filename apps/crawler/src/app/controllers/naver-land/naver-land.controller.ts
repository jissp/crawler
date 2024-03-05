import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleListRequestDto } from '@libs/naver-land-client/clients/dtos/article-list.request.dto';
import { NaverLandCrawlerQueueService } from '@libs/naver-land-crawler/services/naver-land-crawler-queue.service';
import { NaverLandCrawlerQueueType } from '@libs/naver-land-crawler/interfaces/queue.interface';

@ApiTags('네이버 부동산')
@Controller('/v1/naver-land')
export class NaverLandController {
    constructor(
        private readonly naverLandCrawlerQueueService: NaverLandCrawlerQueueService,
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
        const job = await this.naverLandCrawlerQueueService.addJob(
            NaverLandCrawlerQueueType.RequestArticle,
            dto,
        );

        return {
            jobId: job.id,
        };
    }

    // @ApiOperation({
    //     operationId: 'NaverLand.getArticles',
    //     description: '부동산 매물을 검색합니다.',
    // })
    // @ApiResponse({
    //     status: 200,
    // })
    // @Get()
    // public async searchNaverLandArticles(
    //     @Query() dto: SearchNaverLandRequestDto,
    // ) {
    //     const count = await this.naverLandCrawlerService.countByDto(dto);
    //     const articles = await this.naverLandCrawlerService.search(dto);
    //
    //     return {
    //         list: articles,
    //         pagination: toPagination({
    //             page: dto.page,
    //             pageSize: dto.pageSize,
    //             count,
    //         }),
    //     };
    // }
}
