import { PartialType } from '@nestjs/swagger';
import { CreateFeedbackPostDto } from './createFeedbackPost.dto';

export class UpdateFeedbackPostDto extends PartialType(CreateFeedbackPostDto) {}
