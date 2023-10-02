import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from './air-quality.service';
import { AirQualityProvidersInterface } from '../interfaces/air-quality-providers.interface';
import { Repository } from 'typeorm';
import { AirQuality } from './entities/air-quality.entity';
import { GetAirQualityDto } from './dto/get-air-quality.dto';

describe('AirQualityService', () => {
  let service: AirQualityService;
  let mockProvider: jest.Mocked<AirQualityProvidersInterface>;
  let mockRepository: jest.Mocked<Repository<AirQuality>>;

  beforeEach(async () => {
    mockProvider = {
      getAirQuality: jest.fn(),
    };

    mockRepository = {
      createQueryBuilder: jest.fn(),
      save: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityService,
        {
          provide: AirQualityProvidersInterface,
          useValue: mockProvider,
        },
        {
          provide: 'AirQualityRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAirQuality', () => {
    it('should fetch air quality and adapt it', async () => {
      const dto: GetAirQualityDto = { longitude: 1, latitude: 2 };
      mockProvider.getAirQuality.mockResolvedValue({
        data: {
          city: 'Cairo',
          state: 'Cairo',
          country: 'Egypt',
          location: {
            type: 'Point',
            coordinates: [31.24967, 30.06263],
          },
          current: {
            pollution: {
              ts: '2023-10-02T15:00:00.000Z',
              aqius: 54,
              mainus: 'p2',
              aqicn: 19,
              maincn: 'p2',
            },
            weather: {
              ts: '2023-10-02T16:00:00.000Z',
              tp: 27,
              pr: 1014,
              hu: 50,
              ws: 4.63,
              wd: 330,
              ic: '04n',
            },
          },
        },
      });
      const result = await service.getAirQuality(dto);
      expect(result).toEqual({
        pollution: {
          aqicn: 19,
          aqius: 54,
          maincn: 'p2',
          mainus: 'p2',
          ts: '2023-10-02T15:00:00.000Z',
        },
      });
      expect(mockProvider.getAirQuality).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('getMostPollutedDateTime', () => {
    it('should fetch the most polluted datetime', async () => {
      const queryBuilder = {
        orderBy: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({ datetime: 'some date' }),
      };
      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder as any);
      const result = await service.getMostPollutedDateTime();
      expect(result).toEqual({ datetime: 'some date' });
    });
  });
});
