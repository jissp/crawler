import { IConfig } from '../interfaces/config.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as process from 'process';

export class ConfigLocalService implements IConfig {
    async getDatabaseConfig(): Promise<TypeOrmModuleOptions> {
        return {
            type: 'mysql',
            host: process.env['database_host'],
            port: Number(process.env['database_port']),
            database: process.env['database_collection'],
            username: process.env['database_user'],
            password: process.env['database_password'],
            synchronize: false,
            autoLoadEntities: true,
            extra: {
                decimalNumbers: true,
            },
            namingStrategy: new SnakeNamingStrategy(),
        };
    }

    async getKakaoLocalApiKey(): Promise<string> {
        return process.env['kakao_rest_api_key'];
    }
}
