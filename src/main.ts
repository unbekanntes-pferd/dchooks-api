import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // get env
  const configService = app.get(ConfigService);

  // set up http server
  const port = configService.get('PORT');
  const host = configService.get('HOST');

  // global class validation pipes for dtos
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  // CORS
  app.enableCors({
    origin: host
  });

  // global prefix for all routes (/api)
  app.setGlobalPrefix('api');

  // OpenAPI 3 (Swagger)
  const config = new DocumentBuilder()
    .setTitle('DCHooks API')
    .setDescription('DCHooks - webhook registration service')
    .setVersion('0.1.0')
    .addBearerAuth({
      in: "header",
      type: "http",
      scheme: "bearer",
      bearerFormat: "Bearer",

    }, 'DRACOON Access Token')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
