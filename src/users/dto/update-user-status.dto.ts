import { IdDto } from './id.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { StatusDto } from './status.dto';

export class UpdateUserStatusDto extends IntersectionType(IdDto, StatusDto) {}
