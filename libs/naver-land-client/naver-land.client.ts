import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { ArticleListRequestDto } from '@libs/naver-land-client/dtos/article-list.request.dto';
import { IArticleResponse } from '@libs/naver-land-client/interfaces/article.interface';

@Injectable()
export class NaverLandClient {
    private client: Axios;

    constructor() {
        this.client = axios.create({
            baseURL: 'https://m.land.naver.com',
        });
    }

    public async getArticleList(
        dto: ArticleListRequestDto,
    ): Promise<IArticleResponse> {
        const response = await this.client.get<IArticleResponse>(
            '/cluster/ajax/articleList',
            {
                params: {
                    ...dto,
                    rletTpCd: dto.rletTpCd.join(':'),
                    tradTpCd: dto.tradTpCd.join(':'),
                    tag: dto.tag.join(':'),
                },
            },
        );

        return response.data;
    }
}
