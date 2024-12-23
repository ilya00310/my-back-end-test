import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackPostDto } from './dto/createFeedbackPost.dto';
import { UpdateFeedbackPostDto } from './dto/updateFeedbackPost.dto';
import { PrismaService } from '../database/prisma.service';
import { Feedback_posts } from '@prisma/client';
import { FeedbackPostDto } from './dto/feedbackPostDto';
import { CurrentUserDto } from 'src/auth/dto/currentUserDto';
import { Category, Status } from '@prisma/client';
import { FilterFeedbackPostDto } from './dto/filterFeedbackPostsDto';
import { SortFeedbackPostDto } from './dto/sortFeedbackPostsDto';

@Injectable()
export class FeedbackPostsService {
  constructor(private prismaService: PrismaService) {}
  async create(userDto: CreateFeedbackPostDto, currentUser: CurrentUserDto): Promise<FeedbackPostDto> {
    const { id } = currentUser;
    const existingFeedbackPost = await this.prismaService.feedback_posts.findUnique({
      where: { title: userDto.title },
    });
    if (existingFeedbackPost) {
      throw new ConflictException('Project with this name already exists');
    }
    const newFeedbackPost = await this.prismaService.feedback_posts.create({
      data: {
        title: userDto.title,
        description: userDto.description,
        category: userDto.category,
        status: userDto.status,
        author_id: id,
      },
    });
    return newFeedbackPost;
  }

  async getFeedbackPosts(page: number, pageSize: number): Promise<Feedback_posts[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const feedbackPosts = await this.prismaService.feedback_posts.findMany({ skip, take });
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

  async getFilterFeedbackPosts(userDto: FilterFeedbackPostDto, page: number, pageSize: number): Promise<FeedbackPostDto[]> {
    const { status, category } = userDto;
    const filters: any = {};
    if (status) {
      filters.status = status;
    }
    if (category) {
      filters.category = category;
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const filterFeedbackPosts = await this.prismaService.feedback_posts.findMany({
      where: filters,
      skip,
      take,
    });
    return filterFeedbackPosts;
  }
  async getSortFeedbackPosts(userDto: SortFeedbackPostDto, page: number, pageSize: number) {
    const { startVotes, endVotes, startDate, endDate, order } = userDto;

    const where: any = {};

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    if (startVotes || endVotes) {
      where.votes = {};
      if (startVotes) {
        where.votes.gte = startVotes;
      }
      if (endVotes) {
        where.votes.lte = endVotes;
      }
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      where.createdAt = {
        gte: new Date(startDate),
      };
    } else if (endDate) {
      where.createdAt = {
        lte: new Date(endDate),
      };
    }

    const orderByArray = [];

    if (startVotes !== undefined || endVotes !== undefined) {
      orderByArray.push({ votes: order });
    }

    if (startDate || endDate) {
      orderByArray.push({ createdAt: order });
    }

    const feedbackPosts = await this.prismaService.feedback_posts.findMany({
      where,
      orderBy: orderByArray.length > 0 ? orderByArray : undefined,
      skip,
      take,
    });

    return feedbackPosts;
  }
}
