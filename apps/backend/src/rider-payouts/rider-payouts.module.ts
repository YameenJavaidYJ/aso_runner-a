import { Module } from '@nestjs/common';
import { RiderPayoutsService } from './rider-payouts.service';
import { RiderPayoutsController } from './rider-payouts.controller';

@Module({
  controllers: [RiderPayoutsController],
  providers: [RiderPayoutsService],
  exports: [RiderPayoutsService],
})
export class RiderPayoutsModule {}

