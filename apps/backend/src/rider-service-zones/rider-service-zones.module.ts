import { Module } from '@nestjs/common';
import { RiderServiceZonesService } from './rider-service-zones.service';
import { RiderServiceZonesController } from './rider-service-zones.controller';

@Module({
  controllers: [RiderServiceZonesController],
  providers: [RiderServiceZonesService],
  exports: [RiderServiceZonesService],
})
export class RiderServiceZonesModule {}

