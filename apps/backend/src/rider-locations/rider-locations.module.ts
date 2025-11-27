import { Module } from '@nestjs/common';
import { RiderLocationsService } from './rider-locations.service';
import { RiderLocationsController } from './rider-locations.controller';

@Module({
  controllers: [RiderLocationsController],
  providers: [RiderLocationsService],
  exports: [RiderLocationsService],
})
export class RiderLocationsModule {}

