import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface IConfig {
    getDatabaseConfig(): Promise<TypeOrmModuleOptions>;
    getKakaoLocalApiKey(): Promise<string>;
}
