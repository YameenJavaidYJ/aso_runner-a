import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class RiderLocationQueryDto {
  @ApiPropertyOptional({ description: 'Rider ID to filter by' })
  @IsOptional()
  @IsUUID()
  riderId?: string;

  @ApiPropertyOptional({ description: 'Number of records to return', default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  limit?: number = 50;
}

