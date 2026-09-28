import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : null;

  if (allowedOrigins?.length) {
    app.enableCors({
      origin: allowedOrigins,
      credentials: true,
    });
  }

  const port = process.env.PORT ?? process.env.BACKEND_PORT ?? 3000;

  app.use(cookieParser());

  await app.listen(port);

  console.log(`Server is started on port ${port}`);
}
bootstrap();
