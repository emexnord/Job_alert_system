import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.ORIGIN], // <-- allow requests from this origin
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // <-- allow these methods
      allowedHeaders: ['Content-Type', 'Authorization'], // <-- allow these headers
      exposedHeaders: [], // <-- expose these headers
      credentials: true, // <-- allow cookies and credentials to be sent
    },
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
