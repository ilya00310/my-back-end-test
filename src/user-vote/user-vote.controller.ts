import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserVoteService } from './user-vote.service';

@Controller('user-vote')
export class UserVoteController {
  constructor(private readonly userVoteService: UserVoteService) {}
}
