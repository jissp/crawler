import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { TradeType } from '@libs/naver-land-client/interfaces/naver-land.interface';
import { NaverLandResponseDto } from '@libs/naver-land-client/clients/dtos/naver-land-response.dto';
import {
    ArticleBasicInfoResult,
    ArticleComplexResult,
    ArticleDevelopmentResult,
    ArticleTransportResult,
} from '@libs/naver-land-client/clients/dtos/results';
import { ArticleKeyResult } from '@libs/naver-land-client/clients/dtos/results/article-key.result';

@Injectable()
export class NaverLandFinClient {
    private client: Axios;

    constructor() {
        this.client = axios.create({
            baseURL: 'https://fin.land.naver.com',
        });
    }

    /**
     *
     * @param articleNo
     */
    public async getArticleKey(
        articleNo: string,
    ): Promise<NaverLandResponseDto<ArticleKeyResult>> {
        const response = await this.client.get<
            NaverLandResponseDto<ArticleKeyResult>
        >('/front-api/v1/article/key', {
            params: {
                articleId: articleNo,
            },
        });

        return response.data;
    }

    /**
     *
     * @param articleNo
     */
    public async getArticleTransport(
        articleNo: string,
    ): Promise<NaverLandResponseDto<ArticleTransportResult>> {
        const response = await this.client.get<
            NaverLandResponseDto<ArticleTransportResult>
        >('/front-api/v1/article/transport', {
            params: {
                itemId: articleNo,
                itemType: 'article',
            },
        });

        return response.data;
    }

    /**
     * 단지 정보 조회
     * @param complexNo
     */
    public async getArticleComplex(
        complexNo: string,
    ): Promise<NaverLandResponseDto<ArticleComplexResult>> {
        const response = await this.client.get<
            NaverLandResponseDto<ArticleComplexResult>
        >('/front-api/v1/article/complex', {
            params: {
                complexNumber: complexNo,
            },
        });

        return response.data;
    }

    /**
     * 네이버 매물의 기본 정보 조회
     * @param articleNo
     * @param realEstateType
     * @param tradeType
     */
    public async getArticleBasicInfo({
        articleNo,
        realEstateType,
        tradeType,
    }: {
        articleNo: string;
        realEstateType: string;
        tradeType: TradeType;
    }): Promise<NaverLandResponseDto<ArticleBasicInfoResult>> {
        const response = await this.client.get<
            NaverLandResponseDto<ArticleBasicInfoResult>
        >('/front-api/v1/article/basicInfo', {
            params: {
                articleId: articleNo,
                realEstateType,
                tradeType,
            },
        });

        return response.data;
    }

    /**
     * 네이버 매물의 주변 개발 정보
     * @param articleNo
     */
    public async getArticleDevelopment(
        articleNo: number,
    ): Promise<NaverLandResponseDto<ArticleDevelopmentResult>> {
        const response = await this.client.get<
            NaverLandResponseDto<ArticleDevelopmentResult>
        >('/front-api/v1/article/development', {
            params: {
                articleId: articleNo,
            },
        });

        return response.data;
    }
}
