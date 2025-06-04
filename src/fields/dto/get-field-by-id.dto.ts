import { RowsDto } from './rows.dto';
import { ColumnsDto } from './columns.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { RewardsDto } from './rewards.dto';
import { IdDto } from 'src/users/dto/id.dto';

export class GetFieldByIdDto extends IntersectionType(IdDto) {}
