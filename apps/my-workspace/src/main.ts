import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS-Konfiguration
  app.enableCors({
    origin: 'http://localhost:4200', // Erlaube Anfragen von deinem Angular-Frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Erlaube nur bestimmte HTTP-Methoden
    allowedHeaders: ['Content-Type', 'Authorization'], // Erlaube bestimmte Header
    credentials: true, // Erlaube das Senden von Cookies (wenn du JWT mit Cookies verwendest)
  });

  const globalPrefix = 'my-workspace';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
