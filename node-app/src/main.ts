import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Увімкнення глобальної валідації
  app.useGlobalPipes(new ValidationPipe());

  // Конфігурація Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJs API Documentation')
    .setDescription('Backend API for the NestJs application.')
    .setVersion('1.0')
    .addTag('Categories')
    .addTag('Products')
    .addServer('http://localhost:3000', 'NestJS server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      filter: true,
      displayRequestDuration: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
