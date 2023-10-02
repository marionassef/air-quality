import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { ResponseInterceptor } from '../interceotors/response.interceptor';
import { GetAirQualityDto } from './dto/get-air-quality.dto';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get()
  @UseInterceptors(ResponseInterceptor)
  async getAirQuality(@Query() getAirQualityDto: GetAirQualityDto) {
    return await this.airQualityService.getAirQuality(getAirQualityDto);
  }

  @Get('most-polluted-datetime')
  @UseInterceptors(ResponseInterceptor)
  async getMostPollutedDateTime() {
    return await this.airQualityService.getMostPollutedDateTime();
  }
}
