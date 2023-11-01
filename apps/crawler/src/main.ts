import { NestFactory } from '@nestjs/core';
import { CrawlerAppModule } from './app/crawler-app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(CrawlerAppModule);

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('토이 프로젝트 - 크롤러')
        .setDescription('토이 프로젝트 크롤러 API 문서입니다.')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(3000);
}

bootstrap();
