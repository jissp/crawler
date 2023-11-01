import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AWS Recent')
@Controller('/v1/aws-recent')
export class AwsRecentController {
    constructor() {}

    @ApiOperation({
        description: 'AWS 최신 정보 수집을 요청합니다.',
    })
    @ApiResponse({
        status: 200,
    })
    @Post('collect')
    public async collect() {}
}
