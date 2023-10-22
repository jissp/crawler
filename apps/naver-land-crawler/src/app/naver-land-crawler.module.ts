import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@libs/config/services/config.service';
import { ConfigModule } from '@libs/config/config.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.getDatabaseConfig(),
        }),
    ],
    controllers: [],
    providers: [],
})
export class NaverLandCrawlerModule {}
