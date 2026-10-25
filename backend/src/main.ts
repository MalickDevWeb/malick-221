import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const allowedOrigins = (
    process.env.CORS_ORIGINS
      ?? process.env.FRONTEND_CLIENT_URL
      ?? 'http://localhost:3000'
  ).split(',').map((origin) => origin.trim()).filter(Boolean);

  app.enableCors({ origin: allowedOrigins, credentials: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Malick Buss API')
    .setDescription('API Marketplace multi-boutiques (Sénégal - FCFA)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Malick Buss API démarrée sur le port ${port}`);
}

bootstrap();

