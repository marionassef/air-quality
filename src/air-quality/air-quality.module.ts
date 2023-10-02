import { Module } from '@nestjs/common';
import { AirQualityController } from './air-quality.controller';
import { HttpModule } from '@nestjs/axios';
import { AirQualityService } from './air-quality.service';
import { IqProvider } from '../providers/iq.provider';
import { AirQualityProvidersInterface } from '../interfaces/air-quality-providers.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirQuality } from './entities/air-quality.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([AirQuality]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AirQualityController],
  providers: [
    {
      provide: AirQualityProvidersInterface,
      useClass: IqProvider,
    },
    AirQualityService,
  ],
})
export class AirQualityModule {}
