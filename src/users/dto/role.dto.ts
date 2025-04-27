import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class RoleDto {
  @IsEnum(Role, {
    message: 'Bad request, role invalid.',
  })
  @IsNotEmpty()
  role: Role;
}
