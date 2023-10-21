import { IConfig } from "../interfaces/config.interface";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export class ConfigService implements IConfig {
    getDatabaseConfig(): Promise<TypeOrmModuleOptions> {
        return Promise.resolve(undefined);
    }
}
