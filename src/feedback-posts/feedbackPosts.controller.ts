import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FeedbackPostsService } from './feedbackPosts.service';
import { CreateFeedbackPostDto } from './dto/createFeedbackPost.dto';
import { UpdateFeedbackPostDto } from './dto/updateFeedbackPost.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Feedback Posts')
@Controller('feedbackPosts')
export class FeedbackPostsController {
  constructor(private readonly feedbackPostsService: FeedbackPostsService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 200, type: CreateFeedbackPostDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeedbackPostDto: CreateFeedbackPostDto) {
    return this.feedbackPostsService.create(createFeedbackPostDto);
  }

  @Get()
  findAll() {
    return this.feedbackPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackPostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackPostDto: UpdateFeedbackPostDto) {
    return this.feedbackPostsService.update(+id, updateFeedbackPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackPostsService.remove(+id);
  }
}
