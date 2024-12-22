import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from '../database/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.getUserByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Project with this name already exists');
    }
    const newUser = await this.prismaService.user.create({
      data: dto,
    });
    if (!newUser) {
      throw new InternalServerErrorException('Failed to create user');
    }
    return newUser;
  }
  async getUserByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return user;
  }
  async getUserById(id: string): Promise<UserDto | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
