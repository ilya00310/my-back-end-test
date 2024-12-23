import { ApiProperty } from '@nestjs/swagger';
import { Category, Status } from '@prisma/client';
import { IsEnum, IsString, IsDate, IsNumber } from 'class-validator';

export class FeedbackPostDto {
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

  @ApiProperty({ example: 'sfsaF123ahtny', description: "Creator's id " })
  @IsString()
  readonly author_id: string;

  @ApiProperty({ example: '2022-01-02', description: 'Date create post' })
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty({ example: '2022-01-04', description: 'Date update post' })
  @IsDate()
  readonly updatedAt: Date;

  @ApiProperty({ example: 0, description: 'Count votes' })
  @IsNumber()
  readonly votes: number;

  constructor(title: string, description: string, category: Category, status: Status, author_id: string, createdAt: Date, updatedAt: Date, votes: number) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.author_id = author_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.votes = votes;
  }
}
