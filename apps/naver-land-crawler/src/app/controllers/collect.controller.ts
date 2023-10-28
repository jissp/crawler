import { Body, Controller, Post } from '@nestjs/common';
import { ArticleListRequestDto } from '@libs/naver-land-client/dtos/article-list.request.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueueService } from '../services/queue.service';
import { QueueType } from '@libs/common/interfaces/queue-type.interface';

@ApiTags('수집')
@Controller('/v1/collect')
export class CollectController {
    constructor(private readonly queueService: QueueService) {}

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
        const job = await this.queueService.addJob<QueueType.CRAWLER_REQUEST>(
            dto,
        );

        return {
            jobId: job.id,
        };
    }
}
