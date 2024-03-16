import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppHealthService {
  constructor(private readonly configService: ConfigService) {}

  getHealth(): string {
    console.log('DB URL: ', this.configService.get('MONGO_URI'));
    return 'Application is up and running...';
  }
}
