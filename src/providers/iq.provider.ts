import { Injectable } from '@nestjs/common';
import { AirQualityProvidersInterface } from '../interfaces/air-quality-providers.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class IqProvider implements AirQualityProvidersInterface {
  private readonly apiKey = 'e7c033dc-2fed-496f-a101-8a303b088672'; // Set your API key here
  private readonly baseURL = 'http://api.airvisual.com/v2/'; // Set your API key here

  constructor(private readonly httpService: HttpService) {}

  async getAirQuality(longitude: number, latitude: number): Promise<any> {
    const providerResponse = await this.httpService
      .get(
        `${this.baseURL}nearest_city?lat=${latitude}&lng=${longitude}&key=${this.apiKey}`,
      )
      .toPromise();
    return providerResponse.data;
  }
}
