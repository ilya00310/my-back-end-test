import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUserDto';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestInfo } from '../common/interface/request.interface';
import { TokenDto } from './dto/tokenDto';
import { TokenUserDto } from './dto/tokenUserDto';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: TokenUserDto })
  @Post('/signin')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Authorized user' })
  @ApiResponse({ status: 200, type: TokenUserDto })
  @Post('/signup')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @ApiResponse({ status: 200, type: TokenUserDto })
  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  refresh(@Body() refreshToken: TokenDto) {
    return this.authService.refresh(refreshToken);
  }

  @ApiOperation({ summary: 'Get current login user' })
  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMyInfo(@Request() req: RequestInfo) {
    return this.authService.getCurrentAuthUser(req);
  }
}
