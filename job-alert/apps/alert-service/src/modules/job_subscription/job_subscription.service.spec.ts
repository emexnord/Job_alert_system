import { Test, TestingModule } from '@nestjs/testing';
import { JobSubscriptionService } from './job_subscription.service';

describe('JobSubscriptionService', () => {
  let service: JobSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobSubscriptionService],
    }).compile();

    service = module.get<JobSubscriptionService>(JobSubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
