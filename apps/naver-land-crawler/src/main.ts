import { NestFactory } from '@nestjs/core';
import { NaverLandCrawlerModule } from './app/naver-land-crawler.module';

async function bootstrap() {
    const app = await NestFactory.create(NaverLandCrawlerModule);
    await app.listen(3000);
}

bootstrap();
