import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Middlewares
  app.use(cookieParser());
  app.enableCors();

  //Validations
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Docs
  const config = new DocumentBuilder()
    .setTitle('Movies api 🎥🍿')
    .setDescription('Manage movies')
    .setVersion('1.0')
    .addCookieAuth('--session', {
      description: 'Clerk session token',
      type: 'apiKey',
      name: '--session',
      in: 'cookie',
    })
    .setContact('Elver David Peñate', 'https://www.elvportafolio.website', '')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(8080);
}
bootstrap();
