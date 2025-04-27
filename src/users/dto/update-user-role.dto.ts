import { IdDto } from './id.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { RoleDto } from './role.dto';

export class UpdateUserRoleDto extends IntersectionType(IdDto, RoleDto) {}
