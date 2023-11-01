import { Module } from '@nestjs/common';
import { AwsRecentClient } from '@libs/aws-recent-client/aws-recent.client';
import axios from 'axios';

@Module({
    providers: [
        {
            provide: AwsRecentClient,
            useValue: new AwsRecentClient(
                axios.create({
                    baseURL: 'https://aws.amazon.com',
                }),
            ),
        },
    ],
    exports: [AwsRecentClient],
})
export class AwsRecentClientModule {}
