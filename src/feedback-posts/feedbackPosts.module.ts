import { forwardRef, Module } from '@nestjs/common';
import { FeedbackPostsService } from './feedbackPosts.service';
import { FeedbackPostsController } from './feedbackPosts.controller';
import { PrismaService } from '../database/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FeedbackPostsController],
  providers: [FeedbackPostsService, PrismaService],
  imports: [forwardRef(() => AuthModule)],
  exports: [FeedbackPostsService],
})
export class FeedbackPostsModule {}
