import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
    cors({
      origin: 'http://localhost:3000', // Allow only this origin
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Specify allowed methods
      credentials: true, // Allow cookies if needed
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
