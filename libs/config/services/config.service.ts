import { IConfig } from '../interfaces/config.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BullRootModuleOptions } from '@nestjs/bull/dist/interfaces/bull-module-options.interface';

export class ConfigService implements IConfig {
    async getDatabaseConfig(): Promise<TypeOrmModuleOptions> {
        return Promise.resolve(undefined);
    }

    async getKakaoLocalApiKey(): Promise<string> {
        return Promise.resolve('');
    }

    async getRedisConfig(): Promise<BullRootModuleOptions> {
        return {};
    }
}
