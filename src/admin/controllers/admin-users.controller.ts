import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles-guard/roles.decorator';
import { RolesGuard } from 'src/auth/roles-guard/roles.guard';
import { IdDto } from 'src/users/dto/id.dto';
import { UpdateUserRoleDto } from 'src/users/dto/update-user-role.dto';
import { MongoExceptionFilter } from 'src/utils/mongoExceptionFilter';
import { AdminUsersService } from '../services/admin-users.service';
import { UpdateUserStatusDto } from 'src/users/dto/update-user-status.dto';
import { UpdateUserAttemptsDto } from 'src/users/dto/update-user-attempts.dto';
import { User } from 'src/schemas/User.schema';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(MongoExceptionFilter)
@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Patch('status')
  @Roles('ADMIN', 'SUPER_ADMIN')
  updateUserStatus(
    @Body() updateUserStatusDto: UpdateUserStatusDto
  ): Promise<User> {
    return this.adminUsersService.updateUserStatus(updateUserStatusDto);
  }

  @Get(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  getUserById(@Param() idDto: IdDto) {
    // nest js automatically transform param :id to object idDto
    return this.adminUsersService.getUserById(idDto);
  }

  @Patch('role')
  @Roles('SUPER_ADMIN')
  updateUserRole(@Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.adminUsersService.updateUserRole(updateUserRoleDto);
  }

  @Patch('attempts')
  @Roles('ADMIN', 'SUPER_ADMIN')
  updateAttempt(@Body() updateUserAttemptsDto: UpdateUserAttemptsDto) {
    return this.adminUsersService.updateAttempt(updateUserAttemptsDto);
  }

  @Get()
  @Roles('ADMIN', 'SUPER_ADMIN')
  getAllUsers() {
    return this.adminUsersService.getAllUsers();
  }
}
