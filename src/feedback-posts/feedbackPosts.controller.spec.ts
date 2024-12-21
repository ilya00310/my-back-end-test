import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackPostsController } from './feedbackPosts.controller';
import { FeedbackPostsService } from './feedbackPosts.service';

describe('FeedbackPostsController', () => {
  let controller: FeedbackPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackPostsController],
      providers: [FeedbackPostsService],
    }).compile();

    controller = module.get<FeedbackPostsController>(FeedbackPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
