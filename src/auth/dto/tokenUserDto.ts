import { CurrentUserDto } from './currentUserDto';
import { TokenDto } from './tokenDto';
import { ApiProperty } from '@nestjs/swagger';
export class TokenUserDto {
  @ApiProperty({ type: CurrentUserDto, description: 'User data' })
  readonly user: CurrentUserDto;

  @ApiProperty({ type: TokenDto, description: 'User tokens' })
  readonly tokens: TokenDto;

  constructor(user: CurrentUserDto, tokens: TokenDto) {
    this.user = user;
    this.tokens = tokens;
  }
}
