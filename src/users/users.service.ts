import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        avatar: dto.avatar,
      },
    });
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user;
  }
  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });
    return user;
  }
}
