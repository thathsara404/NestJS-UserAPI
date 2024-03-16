import { Module } from '@nestjs/common';
import { AppHealthController } from '../controller/health.controller';
import { AppHealthService } from '../service/health.service';

@Module({
  imports: [],
  controllers: [AppHealthController],
  providers: [AppHealthService],
})
export class HealthModule {}
