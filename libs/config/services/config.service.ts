import { IConfig } from "../interfaces/config.interface";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export class ConfigService implements IConfig {
    async getDatabaseConfig(): Promise<TypeOrmModuleOptions> {
        return Promise.resolve(undefined);
    }

    async getKakaoLocalApiKey(): Promise<string> {
        return Promise.resolve("");
    }
}
