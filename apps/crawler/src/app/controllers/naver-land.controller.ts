import { Body, Controller, Post } from '@nestjs/common';
import { NaverLandCrawlerQueue } from '../queues/naver-land-crawler-queue';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleListRequestDto } from '@libs/naver-land-client/dtos/article-list.request.dto';
import { QueueType } from '@libs/common/interfaces/queue-type.interface';

@ApiTags('네이버 부동산')
@Controller('/v1/naver-land')
export class NaverLandController {
    constructor(private readonly queueService: NaverLandCrawlerQueue) {}

    @ApiOperation({
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
}
