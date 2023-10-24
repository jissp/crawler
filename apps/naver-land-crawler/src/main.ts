import { NestFactory } from '@nestjs/core';
import { NaverLandCrawlerAppModule } from './app/naver-land-crawler-app.module';

async function bootstrap() {
    const app = await NestFactory.create(NaverLandCrawlerAppModule);
    await app.listen(3000);
}

bootstrap();
