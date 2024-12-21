import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackPostsService } from './feedbackPosts.service';

describe('FeedbackPostsService', () => {
  let service: FeedbackPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackPostsService],
    }).compile();

    service = module.get<FeedbackPostsService>(FeedbackPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
