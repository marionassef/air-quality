import { Inject, Injectable } from '@nestjs/common';
import { GetAirQualityDto } from './dto/get-air-quality.dto';
import { AirQualityProvidersInterface } from '../interfaces/air-quality-providers.interface';
import { IqProvider } from '../providers/iq.provider';
import { IqProviderAdapter } from '../providers/iq-provider.adapter';
import { InjectRepository } from '@nestjs/typeorm';
import { AirQuality } from './entities/air-quality.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { ParisCoordinates } from '../utilities/enums/ParisCoordinates';

@Injectable()
export class AirQualityService {
  constructor(
    @Inject(AirQualityProvidersInterface)
    private readonly airQualityProviders: IqProvider,
    @InjectRepository(AirQuality)
    private airQualityRepo: Repository<AirQuality>,
  ) {}

  async getAirQuality(getAirQualityDto: GetAirQualityDto): Promise<any> {
    const adapter = new IqProviderAdapter();
    return adapter.adapt(
      await this.airQualityProviders.getAirQuality(
        getAirQualityDto.longitude,
        getAirQualityDto.latitude,
      ),
    );
  }

  async getMostPollutedDateTime(): Promise<any> {
    return await this.airQualityRepo
      .createQueryBuilder('air_quality')
      .orderBy('air_quality.aqius', 'DESC')
      .getOne();
  }

  @Cron('0 */1 * * * *') // Run every 1 minute
  async checkAirQualityForParis() {
    const adapter = new IqProviderAdapter();
    const airQuality = adapter.adapt(
      await this.airQualityProviders.getAirQuality(
        ParisCoordinates.LONGITUDE,
        ParisCoordinates.LATITUDE,
      ),
    );
    await this.airQualityRepo.save({
      ts: airQuality.pollution.ts,
      aqius: airQuality.pollution.aqius,
      mainus: airQuality.pollution.mainus,
      aqicn: airQuality.pollution.aqicn,
      maincn: airQuality.pollution.maincn,
    });
  }
}
