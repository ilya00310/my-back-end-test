import { ApiProperty } from '@nestjs/swagger';
export class TokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5', description: 'User access token' })
  readonly accessToken?: string;
  @ApiProperty({ example: 'gfdgfsarawadsfh3Gfgdf5', description: 'User refresh token' })
  readonly refreshToken: string;
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
