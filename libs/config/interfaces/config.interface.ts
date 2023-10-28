import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BullRootModuleOptions } from '@nestjs/bull/dist/interfaces/bull-module-options.interface';

export interface IConfig {
    getDatabaseConfig(): Promise<TypeOrmModuleOptions>;

    getKakaoLocalApiKey(): Promise<string>;

    getRedisConfig(): Promise<BullRootModuleOptions>;
}
