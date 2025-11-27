import { Module } from '@nestjs/common';
import { RiderAvailabilityService } from './rider-availability.service';
import { RiderAvailabilityController } from './rider-availability.controller';

@Module({
  controllers: [RiderAvailabilityController],
  providers: [RiderAvailabilityService],
  exports: [RiderAvailabilityService],
})
export class RiderAvailabilityModule {}

