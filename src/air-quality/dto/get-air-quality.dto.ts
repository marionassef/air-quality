import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetAirQualityDto {
  @ApiPropertyOptional()
  @IsOptional()
  latitude: number;

  @ApiPropertyOptional()
  @IsOptional()
  longitude: number;
}
