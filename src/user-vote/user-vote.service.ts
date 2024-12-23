import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CurrentUserDto } from 'src/auth/dto/currentUserDto';

@Injectable()
export class UserVoteService {
  constructor(private prismaService: PrismaService) {}
  async vote(id: string, currentUser: CurrentUserDto) {
    const idCurrentUser = currentUser.id;
    const currentFeedbackPost = await this.prismaService.feedback_posts.findUnique({ where: { id } });
    if (!currentFeedbackPost) {
      return 'Post not exist';
    }
    const existUserVote = await this.prismaService.user_vote.findUnique({
      where: {
        user_id_feedback_post_id: {
          user_id: idCurrentUser,
          feedback_post_id: id,
        },
      },
    });
    if (existUserVote) {
      await this.prismaService.user_vote.delete({ where: { id: existUserVote.id } });
      await this.prismaService.feedback_posts.update({ data: { votes: currentFeedbackPost.votes - 1 }, where: { id } });
      return 'You took away your voice';
    }
    await this.prismaService.user_vote.create({ data: { user_id: idCurrentUser, feedback_post_id: id } });
    await this.prismaService.feedback_posts.update({ data: { votes: currentFeedbackPost.votes + 1 }, where: { id } });
    return 'You voted';
  }
}
