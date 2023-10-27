import { Injectable } from '@nestjs/common';
import { IGetAddressByCoord2Response } from '@libs/kakao/api/local/interfaces/kakao-local-api.interface';
import axios, { Axios } from 'axios';

@Injectable()
export class KakaoLocalApiClient {
    private readonly client: Axios;

    constructor(private readonly apiKey: string) {
        this.client = axios.create({
            baseURL: 'https://dapi.kakao.com',
            headers: {
                Authorization: `KakaoAK ${apiKey}`,
            },
        });
    }

    async getAddressByCoord2({
        long,
        lat,
    }: {
        long: number;
        lat: number;
    }): Promise<IGetAddressByCoord2Response> {
        const response = await this.client.get(
            '/v2/local/geo/coord2address.JSON',
            {
                params: {
                    x: long,
                    y: lat,
                },
            },
        );

        return response.data;
    }
}
