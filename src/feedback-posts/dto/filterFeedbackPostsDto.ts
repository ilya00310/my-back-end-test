import { ApiProperty } from '@nestjs/swagger';
import { Category, Status } from '@prisma/client';
import { IsEnum, IsIn, IsInt, IsOptional, Min } from 'class-validator';

export class FilterFeedbackPostDto {
  @ApiProperty({ example: 'Bug', description: 'Category post' })
  @IsEnum(Category)
  @IsOptional()
  readonly category: Category | null;

  @ApiProperty({ example: 'Idea', description: 'Status post' })
  @IsOptional()
  @IsEnum(Status)
  readonly status?: Status | null;

  constructor(category?: Category, status?: Status) {
    this.category = category ?? null;
    this.status = status ?? null;
  }
}
