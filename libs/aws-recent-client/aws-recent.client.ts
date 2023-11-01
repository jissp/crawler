import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export class AwsRecentClient {
    constructor(private readonly axios: Axios) {}

    async getRecent() {
        const response = await this.axios.get(
            '/ko/about-aws/whats-new/recent/feed/',
        );

        return response.data;
    }
}
