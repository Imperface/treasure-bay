import { RowsDto } from './rows.dto';
import { ColumnsDto } from './columns.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { RewardsDto } from './rewards.dto';

export class GenerateFieldDto extends IntersectionType(
  RowsDto,
  ColumnsDto,
  RewardsDto
) {}
