import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({ example: '13123123', description: 'User password' })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  @IsEmail()
  readonly email: string;

  constructor(password: string, email: string) {
    this.password = password;
    this.email = email;
  }
}
