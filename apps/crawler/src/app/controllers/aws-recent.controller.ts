import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AwsRecentCrawler } from '@libs/aws-recent-crawler/aws-recent-crawler';

@ApiTags('AWS Recent')
@Controller('/v1/aws-recent')
export class AwsRecentController {
    constructor(private readonly awsRecentCrawler: AwsRecentCrawler) {}

    @ApiOperation({
        description: 'AWS 최신 정보 수집을 요청합니다.',
    })
    @ApiResponse({
        status: 200,
    })
    @Post('collect')
    public async collect() {
        await this.awsRecentCrawler.run();
    }
}
