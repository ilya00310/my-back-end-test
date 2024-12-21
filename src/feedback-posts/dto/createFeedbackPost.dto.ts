import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../common/enum/category';
import { Status } from '../../common/enum/status';

export class CreateFeedbackPostDto {
  @ApiProperty({ example: 'basket', description: 'Title post' })
  readonly title: string;

  @ApiProperty({ example: 'Create basket on site', description: 'Description post' })
  readonly description: string;

  @ApiProperty({ example: 'Bug', description: 'Category post' })
  readonly category: Category;

  @ApiProperty({ example: 'Idea', description: 'Status post' })
  readonly status: Status;

  constructor(title: string, description: string, category: Category, status: Status) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
  }
}
