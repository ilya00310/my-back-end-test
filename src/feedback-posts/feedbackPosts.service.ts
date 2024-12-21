import { Injectable } from '@nestjs/common';
import { CreateFeedbackPostDto } from './dto/createFeedbackPost.dto';
import { UpdateFeedbackPostDto } from './dto/updateFeedbackPost.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FeedbackPostsService {
  constructor(private prismaService: PrismaService) {}
  create(createFeedbackPostDto: CreateFeedbackPostDto) {
    return 'This action adds a new feedbackPost';
  }

  findAll() {
    return `This action returns all feedbackPosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedbackPost`;
  }

  update(id: number, updateFeedbackPostDto: UpdateFeedbackPostDto) {
    return `This action updates a #${id} feedbackPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedbackPost`;
  }
}
