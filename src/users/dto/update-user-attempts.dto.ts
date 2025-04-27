import { IntersectionType } from '@nestjs/mapped-types';
import { AttemptsDto } from './attempts.dto';
import { IdDto } from './id.dto';

export class UpdateUserAttemptsDto extends IntersectionType(
  IdDto,
  AttemptsDto
) {}
