import { Module } from '@nestjs/common';
import { UserContextService } from './user-context.service';
import { UserContextController } from './user-context.controller';

@Module({
  controllers: [UserContextController],
  providers: [UserContextService],
  exports: [UserContextService],
})
export class UserContextModule {}

