import { Module } from '@nestjs/common';
import { RiderDocumentsService } from './rider-documents.service';
import { RiderDocumentsController } from './rider-documents.controller';

@Module({
  controllers: [RiderDocumentsController],
  providers: [RiderDocumentsService],
  exports: [RiderDocumentsService],
})
export class RiderDocumentsModule {}

