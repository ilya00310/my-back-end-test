import { ApiProperty } from '@nestjs/swagger';
export class CurrentUserDto {
  @ApiProperty({ example: 1, description: 'User id' })
  readonly id: string;

  @ApiProperty({ example: 'emailUser.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'John Doe', description: 'User avatar' })
  readonly avatar?: string;

  @ApiProperty({ example: '2024-01-03', description: 'Date create user' })
  readonly createdAt: Date;

  constructor(id: string, email: string, createdAt: Date, avatar?: string) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.avatar = avatar ?? '';
  }
}
