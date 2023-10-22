import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { ConfigLocalService } from './services/config-local.service';
import * as process from 'process';

@Module({
    providers: [
        {
            provide: ConfigService,
            useFactory: () => {
                if (process.env['NODE_ENV'] === 'local') {
                    return new ConfigLocalService();
                } else {
                    return new ConfigService();
                }
            },
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
