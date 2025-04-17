import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get the roles metadata from the handler
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler()
    );

    // if no roles are specified, allow access
    if (!requiredRoles) {
      return true;
    }

    // get the request object from the context
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // get the user from the database
    const dbUser = await this.usersService.getUserById(user.id);

    if (!dbUser) {
      return false;
    }

    // check if the user's role is in the required roles
    return requiredRoles.includes(dbUser.role);
  }
}
