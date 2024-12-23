import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '13123123', description: 'User password' })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: 'JohnDoe', description: 'User avatar' })
  @IsString()
  @IsOptional()
  readonly avatar?: string | null;

  constructor(password: string, email: string, avatar?: string) {
    this.password = password;
    this.email = email;
    this.avatar = avatar ?? null;
  }
}
