import { Module } from '@nestjs/common';
import { UserVoteService } from './user-vote.service';
import { UserVoteController } from './user-vote.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [UserVoteController],
  providers: [UserVoteService, PrismaService],
  exports: [UserVoteService],
})
export class UserVoteModule {}
