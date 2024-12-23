import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import * as dotenv from 'dotenv';
import { LoginUserDto } from './dto/loginUserDto';
import { TokenDto } from './dto/tokenDto';
import { CurrentUserDto } from './dto/currentUserDto';
import { TokenUserDto } from './dto/tokenUserDto';
import { UserDto } from 'src/users/dto/user.dto';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto): Promise<TokenUserDto> {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateTokens(user);
    const userWithoutPassword = { ...user, password: undefined };
    return { user: userWithoutPassword, tokens };
  }

  async registration(userDto: CreateUserDto): Promise<TokenUserDto> {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Users with current email address exist', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    const tokens = await this.generateTokens(user);
    const userWithoutPassword = { ...user, password: undefined };
    return { user: userWithoutPassword, tokens };
  }

  async generateTokens(user: User): Promise<TokenDto> {
    const payLoad = { id: user.id, email: user.email, avatar: user.avatar };

    const accessToken = this.jwtService.sign(payLoad, {
      secret: process.env.PRIVATE_KEY || 'your-secret-key',
      expiresIn: '24h',
    });

    const refreshToken = this.jwtService.sign(payLoad, {
      secret: process.env.PRIVATE_KEY || 'your-secret-key',
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
  async refresh(Tokens: TokenDto): Promise<TokenUserDto> {
    try {
      const payload = this.jwtService.verify(Tokens.refreshToken, {
        secret: process.env.PRIVATE_KEY || 'your-secret-key',
      });

      const user = await this.userService.getUserByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('Invalid user');
      }
      const tokens = await this.generateTokens(user);
      const userWithoutPassword = { ...user, password: undefined };
      return { user: userWithoutPassword, tokens };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
  private async validateUser(userDto: LoginUserDto): Promise<UserDto> {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }
    if (!user.password) {
      throw new UnauthorizedException({
        message: 'Password is incorrect',
      });
    }
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Email or password incorrect',
    });
  }
  async getCurrentAuthUser(currentUser: CurrentUserDto): Promise<CurrentUserDto | null> {
    const { id } = currentUser;
    const currentUserExist = await this.userService.getUserById(id);
    if (!currentUserExist) {
      return null;
    }
    const currentUserWithoutPassword = { ...currentUser, password: undefined };
    return currentUserWithoutPassword;
  }
}
