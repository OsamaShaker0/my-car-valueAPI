import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class GetEstimateReportDto {
  @IsOptional()
  @IsString()
  make: string;
  @IsOptional()
  @IsString()
  model: string;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2026)
  year: number;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Max(1000000)
  mileage: number;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsLongitude()
  lng: number;
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsLatitude()
  lat: number;
}
