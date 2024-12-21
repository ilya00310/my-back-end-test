import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: '13123123', description: 'User password' })
  readonly password: string;

  @ApiProperty({ example: 'JohnDoe', description: 'User avatar' })
  readonly avatar?: string;

  constructor(password: string, email: string, avatar: string) {
    this.password = password;
    this.email = email;
    this.avatar = avatar;
  }
}
