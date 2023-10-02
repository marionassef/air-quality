import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { GetAirQualityDto } from './dto/get-air-quality.dto';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let service: AirQualityService;

  beforeEach(async () => {
    const mockService = {
      getAirQuality: jest.fn().mockResolvedValue('some data'),
      getMostPollutedDateTime: jest.fn().mockResolvedValue('some datetime'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [{ provide: AirQualityService, useValue: mockService }],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
    service = module.get<AirQualityService>(AirQualityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get air quality', async () => {
    // Later in your tests
    (service.getAirQuality as jest.Mock).mockResolvedValue('some data');
    const result = await controller.getAirQuality(new GetAirQualityDto());
    expect(result).toEqual('some data');
  });

  it('should get most polluted datetime', async () => {
    (service.getMostPollutedDateTime as jest.Mock).mockResolvedValue(
      'some datetime',
    );
    const result = await controller.getMostPollutedDateTime();
    expect(result).toEqual('some datetime');
  });
});
