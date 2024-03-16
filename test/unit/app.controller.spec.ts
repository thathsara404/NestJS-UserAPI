import { Test, TestingModule } from '@nestjs/testing';
import { AppHealthController } from '../../src/controller/health.controller';
import { AppHealthService } from '../../src/service/health.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppHealthController;

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue('Mock mongo URI'),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppHealthController],
      providers: [
        AppHealthService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    appController = app.get<AppHealthController>(AppHealthController);
  });

  describe('root', () => {
    it('should return "Application is up and running..."', () => {
      expect(appController.health()).toBe('Application is up and running...');
    });
  });
});
