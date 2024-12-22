import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackPostDto } from './dto/createFeedbackPost.dto';
import { UpdateFeedbackPostDto } from './dto/updateFeedbackPost.dto';
import { PrismaService } from '../database/prisma.service';
import { Feedback_posts } from '@prisma/client';
import { FeedbackPostDto } from './dto/feedbackPostDto';
import { CurrentUserDto } from 'src/auth/dto/currentUserDto';
import { Category, Status } from '@prisma/client';

@Injectable()
export class FeedbackPostsService {
  constructor(private prismaService: PrismaService) {}
  async create(dto: CreateFeedbackPostDto, currentUser: CurrentUserDto): Promise<FeedbackPostDto> {
    const { id } = currentUser;
    const existingFeedbackPost = await this.prismaService.feedback_posts.findUnique({
      where: { title: dto.title },
    });
    if (existingFeedbackPost) {
      throw new ConflictException('Project with this name already exists');
    }
    const newFeedbackPost = await this.prismaService.feedback_posts.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        status: dto.status,
        author_id: id,
      },
    });
    return newFeedbackPost;
  }

  async getFeedbackPosts(): Promise<Feedback_posts[]> {
    const feedbackPosts = await this.prismaService.feedback_posts.findMany();
    return feedbackPosts;
  }

  async getFeedbackPost(id: string): Promise<Feedback_posts | null> {
    const feedbackPost = await this.prismaService.feedback_posts.findUnique({ where: { id } });
    if (!feedbackPost) {
      return null;
    }
    return feedbackPost;
  }

  async updateFeedbackPosts(id: string, updateFeedbackPostDto: UpdateFeedbackPostDto, currentUser: CurrentUserDto): Promise<Feedback_posts> {
    const currentFeedbackPost = await this.prismaService.feedback_posts.findUnique({ where: { id } });
    if (!currentFeedbackPost) {
      throw new NotFoundException('Feedback post not found');
    }
    if (currentFeedbackPost.author_id !== currentUser.id) {
      throw new ForbiddenException('You do not have permission to access this post');
    }
    const newFeedbackPost = await this.prismaService.feedback_posts.update({ data: updateFeedbackPostDto, where: { id } });
    return newFeedbackPost;
  }

  async removeFeedbackPosts(id: string, currentUser: CurrentUserDto): Promise<string> {
    const currentFeedbackPost = await this.prismaService.feedback_posts.findUnique({ where: { id } });
    if (!currentFeedbackPost) {
      throw new NotFoundException('Feedback post not found');
    }
    if (currentFeedbackPost.author_id !== currentUser.id) {
      throw new ForbiddenException('You do not have permission to access this post');
    }
    await this.prismaService.feedback_posts.delete({ where: { id } });
    return 'Feedback post deleted';
  }
  async getStatuses(): Promise<Status[]> {
    const statuses: Status[] = ['Idea', 'Planned', 'AtWork', 'Performed'];
    return statuses;
  }
  async getCategories(): Promise<Category[]> {
    const categories: Category[] = ['Functionality', 'Bug', 'Unique', 'Performance', 'Other'];
    return categories;
  }
}
