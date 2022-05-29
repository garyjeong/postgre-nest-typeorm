import { Module } from '@nestjs/common';
import { DatabaseConfigService } from './config.service';

@Module({
  providers: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
