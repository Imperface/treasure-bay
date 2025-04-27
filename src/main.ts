import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MongoExceptionFilter } from './utils/mongoExceptionFilter';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
    })
  );
  app.useGlobalFilters(new MongoExceptionFilter());

  await app.listen(process.env.PORT ?? 5843);
};

bootstrap();
