import { ApiProperty } from '@nestjs/swagger';
import { Category, Status } from '@prisma/client';

export class FeedbackPostDto {
  @ApiProperty({ example: 'basket', description: 'Title post' })
  readonly title: string;

  @ApiProperty({ example: 'Create basket on site', description: 'Description post' })
  readonly description: string;

  @ApiProperty({ example: 'Bug', description: 'Category post' })
  readonly category: Category;

  @ApiProperty({ example: 'Idea', description: 'Status post' })
  readonly status: Status;

  @ApiProperty({ example: 'sfsaF123ahtny', description: "Creator's id " })
  readonly author_id: string;

  @ApiProperty({ example: '2022-01-02', description: 'Date create post' })
  readonly createdAt: Date;

  @ApiProperty({ example: '2022-01-04', description: 'Date update post' })
  readonly updatedAt: Date;

  constructor(title: string, description: string, category: Category, status: Status, author_id: string, createdAt: Date, updatedAt: Date) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.author_id = author_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
