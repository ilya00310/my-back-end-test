import { CurrentUserDto } from './currentUserDto';
import { TokenDto } from './tokenDto';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class TokenUserDto {
  @ApiProperty({ type: CurrentUserDto, description: 'User data' })
  @ValidateNested()
  @Type(() => CurrentUserDto)
  readonly user: CurrentUserDto;

  @ApiProperty({ type: TokenDto, description: 'User tokens' })
  @ValidateNested()
  @Type(() => TokenDto)
  readonly tokens: TokenDto;

  constructor(user: CurrentUserDto, tokens: TokenDto) {
    this.user = user;
    this.tokens = tokens;
  }
}
