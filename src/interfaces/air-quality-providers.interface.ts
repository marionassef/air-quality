export interface AirQualityProvidersInterface {
  getAirQuality(longitude: number, latitude: number): Promise<any>;
}
export const AirQualityProvidersInterface = Symbol(
  'AirQualityProvidersInterface',
);
