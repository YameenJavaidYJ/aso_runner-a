import { Module } from '@nestjs/common';
import { RiderVerificationService } from './rider-verification.service';
import { RiderVerificationController } from './rider-verification.controller';
import { RidersModule } from '../riders/riders.module';

@Module({
  imports: [RidersModule],
  controllers: [RiderVerificationController],
  providers: [RiderVerificationService],
  exports: [RiderVerificationService],
})
export class RiderVerificationModule {}

