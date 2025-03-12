import { Test, TestingModule } from '@nestjs/testing';
import { JobAlertController } from './job_alert.controller';
import { JobAlertService } from './job_alert.service';

describe('JobAlertController', () => {
  let controller: JobAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobAlertController],
      providers: [JobAlertService],
    }).compile();

    controller = module.get<JobAlertController>(JobAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
