import { ApiProperty } from '@nestjs/swagger';
import { Category, Status } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateFeedbackPostDto {
  @ApiProperty({ example: 'basket', description: 'Title post' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Create basket on site', description: 'Description post' })
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'Bug', description: 'Category post' })
  @IsEnum(Category)
  readonly category: Category;

  @ApiProperty({ example: 'Idea', description: 'Status post' })
  @IsEnum(Status)
  readonly status: Status;

  constructor(title: string, description: string, category: Category, status: Status) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
  }
}
