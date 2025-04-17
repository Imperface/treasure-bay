import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enums/role.enum';
import { IdDto } from './id.dto';

export class UpdateRoleDto extends IdDto {
  @IsEnum(Role, {
    message: 'Bad request, role invalid.',
  })
  @IsNotEmpty()
  role: Role;
}
