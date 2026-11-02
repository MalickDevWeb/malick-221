import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.disable('x-powered-by');

  app.use((_req: any, res: any, next: () => void) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ extended: true, limit: '5mb' }));

  const configuredOrigins = (
    process.env.CORS_ORIGINS
      ?? process.env.FRONTEND_CLIENT_URL
      ?? 'http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001'
  ).split(',').map((origin) => origin.trim()).filter(Boolean);

  app.enableCors({
    origin: (requestOrigin, callback) => {
      if (!requestOrigin) return callback(null, true);
      const isAllowed = configuredOrigins.some((allowed) => {
        if (allowed === '*' || allowed === requestOrigin) return true;
        if (allowed.startsWith('*.')) {
          const domain = allowed.slice(2);
          return requestOrigin.endsWith(domain);
        }
        return false;
      }) || (process.env.NODE_ENV !== 'production' && requestOrigin.includes('localhost')) || requestOrigin.endsWith('.vercel.app');

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origine CORS non autorisée: ${requestOrigin}`));
      }
    },
    credentials: true,
  });

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

