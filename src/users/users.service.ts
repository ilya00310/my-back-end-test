import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async createUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.getUserByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Project with this name already exists');
    }
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
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
