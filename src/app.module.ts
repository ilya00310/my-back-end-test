import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.main';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './database/prisma.service';
import { FeedbackPostsModule } from './feedback-posts/feedbackPosts.module';
import { UserVoteModule } from './user-vote/user-vote.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, UsersModule, FeedbackPostsModule, UserVoteModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService, PrismaService],
})
export class AppModule {}
