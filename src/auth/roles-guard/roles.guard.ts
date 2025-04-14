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
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler()
    );

    console.log('requiredRoles', requiredRoles);
    if (!requiredRoles) {
      return true; // Якщо ролі не вказані, доступ дозволено
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user; // Дані користувача з JWT токена

    console.log('user', user);
    // Отримуємо користувача з бази даних
    const dbUser = await this.usersService.getUserById(user.id);

    console.log('dbUser', dbUser);
    if (!dbUser) {
      return false; // Користувач не знайдений
    }

    // Перевіряємо, чи роль користувача відповідає одній із необхідних ролей
    return requiredRoles.includes(dbUser.role);
  }
}
