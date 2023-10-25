import { NestFactory } from '@nestjs/core';
import { NaverLandCrawlerAppModule } from './app/naver-land-crawler-app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(NaverLandCrawlerAppModule);

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('네이버 부동산 매물 API')
        .setDescription('네이버 부동산 매물 API 문서입니다.')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(3000);
}

bootstrap();
