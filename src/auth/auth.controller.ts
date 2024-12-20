import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUserDto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestInfo } from '../common/interface/request.interface';
import { TokenDto } from './dto/tokenDto';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post('/signin')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Authorized user' })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post('/signup')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  refresh(@Body() refreshToken: TokenDto) {
    return this.authService.refresh(refreshToken);
  }

  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMyInfo(@Request() req: RequestInfo) {
    const currentUser = req.user;
    return this.userService.getUserById(currentUser.id);
  }
}
