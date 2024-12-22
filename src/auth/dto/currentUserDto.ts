import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CurrentUserDto {
  @ApiProperty({ example: 'fdsfsdfFfsdGSGgd21', description: 'User id' })
  @IsString()
  readonly id: string;

  @ApiProperty({ example: 'emailUser.com', description: 'User email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'John Doe', description: 'User avatar' })
  @IsOptional()
  @IsString()
  readonly avatar?: string | null;

  constructor(id: string, email: string, avatar?: string) {
    this.id = id;
    this.email = email;
    this.avatar = avatar ?? null;
  }
}
