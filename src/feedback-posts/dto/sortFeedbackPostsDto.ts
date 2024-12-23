import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsEnum, IsIn, IsInt, IsOptional, Min } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class SortFeedbackPostDto {
  @ApiProperty({ example: 10, description: 'Start votes post' })
  @IsOptional()
  readonly startVotes?: number | null;

  @ApiProperty({ example: 10, description: 'End votes post' })
  @IsOptional()
  readonly endVotes?: number | null;

  @ApiProperty({ description: 'Sorting start date', example: '2022-01-02' })
  @IsOptional()
  @IsDateString()
  readonly startDate?: Date | null;

  @ApiProperty({ description: 'Sorting end date', example: '2022-01-04' })
  @IsOptional()
  @IsDateString()
  readonly endDate?: Date | null;

  @ApiProperty({ example: 'asc', description: 'Sort order', default: SortOrder.DESC })
  @IsEnum(SortOrder)
  @IsOptional()
  readonly order: SortOrder = SortOrder.DESC;

  constructor(startVotes?: number, endVotes?: number, endDate?: Date, startDate?: Date) {
    this.startVotes = startVotes ?? null;
    this.endVotes = endVotes ?? null;
    this.endDate = endDate ?? null;
    this.startDate = startDate ?? null;
  }
}
