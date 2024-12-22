import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FeedbackPostsService } from './feedbackPosts.service';
import { CreateFeedbackPostDto } from './dto/createFeedbackPost.dto';
import { UpdateFeedbackPostDto } from './dto/updateFeedbackPost.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FeedbackPostDto } from './dto/feedbackPostDto';
import { RequestInfo } from '../common/interface/request.interface';

@ApiTags('Feedback Posts')
@Controller('feedbackPosts')
export class FeedbackPostsController {
  constructor(private readonly feedbackPostsService: FeedbackPostsService) {}

  @ApiOperation({ summary: 'Create feedback post' })
  @ApiResponse({ status: 200, type: CreateFeedbackPostDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeedbackPostDto: CreateFeedbackPostDto, @Request() req: RequestInfo) {
    const currentUser = req.user;
    return this.feedbackPostsService.create(createFeedbackPostDto, currentUser);
  }

  @ApiOperation({ summary: 'Get feedback post' })
  @ApiResponse({ status: 200, type: FeedbackPostDto })
  @UseGuards(JwtAuthGuard)
  @Get('/id')
  getPost(@Query('id') id: string) {
    return this.feedbackPostsService.getFeedbackPost(id);
  }
  @ApiOperation({ summary: 'Get feedback posts' })
  @ApiResponse({ status: 200, type: [FeedbackPostDto] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getPosts() {
    return this.feedbackPostsService.getFeedbackPosts();
  }

  @ApiOperation({ summary: 'Update feedback post' })
  @ApiResponse({ status: 200, type: FeedbackPostDto })
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Query('id') id: string, @Body() updateFeedbackPostDto: UpdateFeedbackPostDto, @Request() req: RequestInfo) {
    const currentUser = req.user;
    return this.feedbackPostsService.updateFeedbackPosts(id, updateFeedbackPostDto, currentUser);
  }

  @ApiOperation({ summary: 'Delete feedback post' })
  @ApiResponse({ status: 200, type: String })
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Query('id') id: string, @Request() req: RequestInfo) {
    const currentUser = req.user;
    return this.feedbackPostsService.removeFeedbackPosts(id, currentUser);
  }
}
