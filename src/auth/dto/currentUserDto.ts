import { ApiProperty } from '@nestjs/swagger';
export class CurrentUserDto {
  @ApiProperty({ example: 1, description: 'User id' })
  readonly id: string;

  @ApiProperty({ example: 'emailUser.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'John Doe', description: 'User avatar' })
  readonly avatar?: string;

  @ApiProperty({ example: '2024-01-03', description: 'Date create user' })
  readonly created_at: Date;

  constructor(id: string, email: string, created_at: Date, avatar?: string) {
    this.id = id;
    this.email = email;
    this.created_at = created_at;
    this.avatar = avatar;
  }
}
