import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirQualityModule } from './air-quality/air-quality.module';
import { GenericExceptionFilter } from './exception-filters/generic.exception';
import { TypeormFilter } from './exception-filters/typeorm.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    AirQualityModule,
    TypeOrmModule.forRoot({
      migrationsTableName: 'migrations',
      type: 'mysql',
      host: dotenv.config().parsed.DB_HOST,
      port: +dotenv.config().parsed.DB_PORT,
      username: dotenv.config().parsed.DB_USERNAME,
      password: dotenv.config().parsed.DB_PASSWORD,
      database: dotenv.config().parsed.DB_NAME,
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GenericExceptionFilter, TypeormFilter],
})
export class AppModule {}
