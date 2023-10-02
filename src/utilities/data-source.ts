import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

export const databaseConfig: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: dotenv.config().parsed.DB_HOST,
  port: +dotenv.config().parsed.DB_PORT,
  username: dotenv.config().parsed.DB_USERNAME,
  password: dotenv.config().parsed.DB_PASSWORD,
  database: dotenv.config().parsed.DB_NAME,
  synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
};
export const AppDataSource = new DataSource(databaseConfig);

const logger = new Logger('AppDataSource');

AppDataSource.initialize()
  .then(() => {
    logger.log('Data Source has been initialized!');
  })
  .catch((err) => {
    logger.error('Error during Data Source initialization', err);
  });
