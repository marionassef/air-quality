import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GenericExceptionFilter } from './exception-filters/generic.exception';
import { TypeormFilter } from './exception-filters/typeorm.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const genericExceptionFilter = app.get(GenericExceptionFilter);
  const typeOrmFilter = app.get(TypeormFilter);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // if true, strips validated object of properties that don't have any decorators
      forbidNonWhitelisted: true, // if true, throws an error for non-whitelisted properties
      transform: true,
    }),
  );

  app.useGlobalFilters(genericExceptionFilter, typeOrmFilter);
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Air Quality')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3000);
}
bootstrap();
