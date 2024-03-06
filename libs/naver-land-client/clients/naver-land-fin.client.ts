import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { ArticleTransportResponseDto } from '@libs/naver-land-client/clients/dtos/article-transport-response.dto';

@Injectable()
export class NaverLandFinClient {
    private client: Axios;

    constructor() {
        this.client = axios.create({
            baseURL: 'https://fin.land.naver.com',
        });
    }

    public async getArticleTransport(
        articleNo: string,
    ): Promise<ArticleTransportResponseDto> {
        const response = await this.client.get<ArticleTransportResponseDto>(
            '/front-api/v1/article/transport',
            {
                params: {
                    itemId: articleNo,
                    itemType: 'article',
                },
            },
        );

        return response.data;
    }
}
