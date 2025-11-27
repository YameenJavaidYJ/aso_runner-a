import { Module } from '@nestjs/common';
import { RiderEarningsService } from './rider-earnings.service';
import { RiderEarningsController } from './rider-earnings.controller';

@Module({
  controllers: [RiderEarningsController],
  providers: [RiderEarningsService],
  exports: [RiderEarningsService],
})
export class RiderEarningsModule {}

