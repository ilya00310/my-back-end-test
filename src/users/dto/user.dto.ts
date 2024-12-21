import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 1, description: 'User id' })
  readonly id: string;

  @ApiProperty({ example: '13123123', description: 'User password' })
  readonly password: string;

  @ApiProperty({ example: 'emailUser.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'JohnDoe', description: 'User avatar' })
  readonly avatar?: string;

  @ApiProperty({ example: '2023-01-02', description: 'user creation date' })
  readonly createdAt: Date;

  constructor(id: string, password: string, email: string, avatar: string, createdAt: Date) {
    this.id = id;
    this.password = password;
    this.email = email;
    this.avatar = avatar ?? '';
    this.createdAt = createdAt;
  }
}
