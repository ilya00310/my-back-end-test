import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserDto {
  @ApiProperty({ example: 1, description: 'User id' })
  readonly id: string;

  @ApiProperty({ example: 'emailUser.com', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'John Doe', description: 'User avatar' })
  readonly avatar?: string | null;

  constructor(id: string, email: string, avatar?: string) {
    this.id = id;
    this.email = email;
    this.avatar = avatar ?? null;
  }
}
