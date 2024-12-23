import { ApiProperty } from '@nestjs/swagger';
import { Category, Status } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class FilterFeedbackPostDto {
  @ApiProperty({ example: 'Bug', description: 'Category post' })
  @IsEnum(Category)
  @IsOptional()
  category?: Category;

  @ApiProperty({ example: 'Idea', description: 'Status post' })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  constructor(category?: Category, status?: Status) {
    this.category = category;
    this.status = status;
  }
}
