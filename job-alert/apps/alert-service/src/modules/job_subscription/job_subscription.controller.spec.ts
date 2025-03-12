import { Test, TestingModule } from '@nestjs/testing';
import { JobSubscriptionController } from './job_subscription.controller';
import { JobSubscriptionService } from './job_subscription.service';

describe('JobSubscriptionController', () => {
  let controller: JobSubscriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobSubscriptionController],
      providers: [JobSubscriptionService],
    }).compile();

    controller = module.get<JobSubscriptionController>(JobSubscriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
