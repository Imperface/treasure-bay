import { IntersectionType } from '@nestjs/mapped-types';
import { IdDto } from './id.dto';

export class SignOutUserDto extends IntersectionType(IdDto) {}
