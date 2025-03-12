import { Test, TestingModule } from '@nestjs/testing';
import { JobAlertService } from './job_alert.service';

describe('JobAlertService', () => {
  let service: JobAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobAlertService],
    }).compile();

    service = module.get<JobAlertService>(JobAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
