import { AirQualityProvidersResponseInterface } from '../interfaces/air-quality-providers-response.interface';

export class IqProviderAdapter {
  adapt(responseFromIqProvider: any): AirQualityProvidersResponseInterface {
    return {
      pollution: {
        ts: responseFromIqProvider.data.current.pollution.ts,
        aqius: responseFromIqProvider.data.current.pollution.aqius,
        mainus: responseFromIqProvider.data.current.pollution.mainus,
        aqicn: responseFromIqProvider.data.current.pollution.aqicn,
        maincn: responseFromIqProvider.data.current.pollution.maincn,
      },
    };
  }
}
