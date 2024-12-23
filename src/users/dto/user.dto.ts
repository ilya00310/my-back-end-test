import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsString()
  readonly id: string;

  @ApiProperty({ example: '13123123', description: 'User password' })
  @IsString()
  readonly password: string;

  @ApiProperty({ example: 'emailUser.com', description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'JohnDoe', description: 'User avatar' })
  @IsString()
  readonly avatar: string | null;

  @ApiProperty({ example: '2023-01-02', description: 'user creation date' })
  @IsDate()
  readonly createdAt: Date;

  constructor(id: string, password: string, email: string, createdAt: Date, avatar?: string) {
    this.id = id;
    this.password = password;
    this.email = email;
    this.avatar = avatar ?? null;
    this.createdAt = createdAt;
  }
}
