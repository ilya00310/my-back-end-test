import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FeedbackPostsService } from './feedbackPosts.service';
import { CreateFeedbackPostDto } from './dto/createFeedbackPost.dto';
import { UpdateFeedbackPostDto } from './dto/updateFeedbackPost.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FeedbackPostDto } from './dto/feedbackPostDto';
import { RequestInfo } from '../common/interface/request.interface';
import { UserVoteService } from '../user-vote/user-vote.service';
import { FilterFeedbackPostDto } from './dto/filterFeedbackPostsDto';
import { SortFeedbackPostDto } from './dto/sortFeedbackPostsDto';

@ApiTags('Feedback Posts')
@Controller('feedbackPosts')
export class FeedbackPostsController {
  constructor(
    private readonly feedbackPostsService: FeedbackPostsService,
    private readonly userVoteService: UserVoteService,
  ) {}

  @ApiOperation({ summary: 'Create feedback post' })
  @ApiResponse({ status: 200, type: CreateFeedbackPostDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userDto: CreateFeedbackPostDto, @Request() req: RequestInfo) {
    const currentUser = req.user;
    return this.feedbackPostsService.create(userDto, currentUser);
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
  getPosts(@Query('page') page: string = '1', @Query('pageSize') pageSize: string = '10') {
    return this.feedbackPostsService.getFeedbackPosts(Number(page), Number(pageSize));
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

  @ApiOperation({ summary: 'Get available statuses' })
  @ApiResponse({ status: 200, type: [String] })
  @UseGuards(JwtAuthGuard)
  @Get('/statuses')
  getStatuses() {
    return this.feedbackPostsService.getStatuses();
  }

  @ApiOperation({ summary: 'Get available categories' })
  @ApiResponse({ status: 200, type: [String] })
  @UseGuards(JwtAuthGuard)
  @Get('/categories')
  getCategories() {
    return this.feedbackPostsService.getCategories();
  }

  @ApiOperation({ summary: 'Get filter feedback post' })
  @ApiResponse({ status: 200, type: [FeedbackPostDto] })
  @UseGuards(JwtAuthGuard)
  @Get('/filter')
  getFilterFeedbackPost(@Body() userDto: FilterFeedbackPostDto, @Query('page') page: string = '1', @Query('pageSize') pageSize: string = '10') {
    return this.feedbackPostsService.getFilterFeedbackPosts(userDto, Number(page), Number(pageSize));
  }

  @ApiOperation({ summary: 'Vote for feedback post' })
  @ApiResponse({ status: 200, type: String })
  @UseGuards(JwtAuthGuard)
  @Post('/vote')
  vote(@Query('id') id: string, @Request() req: RequestInfo) {
    const currentUser = req.user;
    return this.userVoteService.vote(id, currentUser);
  }

  @ApiOperation({ summary: 'Get sort feedback post' })
  @ApiResponse({ status: 200, type: String })
  @UseGuards(JwtAuthGuard)
  @Get('/sort')
  getSortFeedbackPost(@Body() userDto: SortFeedbackPostDto, @Query('page') page: string = '1', @Query('pageSize') pageSize: string = '10') {
    return this.feedbackPostsService.getSortFeedbackPosts(userDto, Number(page), Number(pageSize));
  }
}
