import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { ArticleListRequestDto } from '@libs/naver-land-client/clients/dtos/article-list.request.dto';
import { IFacliTransInfo } from '@libs/naver-land-client/interfaces/facli-trans-info.interface';
import { IArticleResponse } from '@libs/naver-land-client/clients/dtos/article-list.response.dto';

@Injectable()
export class NaverLandClient {
    private client: Axios;

    constructor() {
        this.client = axios.create({
            baseURL: 'https://m.land.naver.com',
        });
    }

    /**
     *
     * @param dto
     */
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

    /**
     * 매물 주변 시설 정보 조회
     *
     * @param hscpNo
     * @param lat
     * @param lng
     */
    public async getFacilTransInfo(
        hscpNo: number,
        lat: number,
        lng: number,
    ): Promise<IFacliTransInfo> {
        const response = await this.client.get<IFacliTransInfo>(
            '/complex/getFacilTransInfo',
            {
                params: {
                    hscpNo,
                    lat,
                    lng,
                },
            },
        );

        return response.data;
    }
}
