import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @ApiProperty({ example: '13123123', description: 'User password' })
  readonly password: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  readonly email: string;
  constructor(password: string, email: string) {
    this.password = password;
    this.email = email;
  }
}
