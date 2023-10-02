import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AirQualityModule } from '../src/air-quality/air-quality.module';
import { ParisCoordinates } from '../src/utilities/enums/ParisCoordinates';
import { IqProviderAdapter } from '../src/providers/iq-provider.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirQuality } from '../src/air-quality/entities/air-quality.entity';

describe('AirQualityControllerE2E', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AirQualityModule, TypeOrmModule.forFeature([AirQuality])],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/air-quality (GET)', () => {
    return request(app.getHttpServer())
      .get(
        `/air-quality?lat=${ParisCoordinates.LATITUDE}&long=${ParisCoordinates.LONGITUDE}`,
      )
      .expect(200) // Expected status code
      .expect(IqProviderAdapter);
  });

  it('/air-quality/most-polluted-datetime (GET)', () => {
    return request(app.getHttpServer())
      .get('/air-quality/most-polluted-datetime')
      .expect(200)
      .expect('Expected datetime response');
  });
});
