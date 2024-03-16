import { Controller, Get } from '@nestjs/common';
import { AppHealthService } from '../service/health.service';

@Controller('/health')
export class AppHealthController {
  constructor(private readonly appHealthService: AppHealthService) {}

  @Get()
  health(): string {
    return this.appHealthService.getHealth();
  }
}
