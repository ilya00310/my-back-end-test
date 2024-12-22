import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class TokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5', description: 'User access token' })
  @IsOptional()
  @IsString()
  readonly accessToken?: string;

  @ApiProperty({ example: 'gfdgfsarawadsfh3Gfgdf5', description: 'User refresh token' })
  @IsString()
  readonly refreshToken: string;

  constructor(refreshToken: string, accessToken?: string) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }
}
