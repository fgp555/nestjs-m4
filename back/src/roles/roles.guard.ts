import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesEnum } from './enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRole = this.reflector.getAllAndOverride<RolesEnum[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const requestUser = request.user;

    const hasRole = () =>
      getRole.some((role) => requestUser?.roles?.includes(role));

    const validRole = requestUser && requestUser.roles && hasRole();

    if (!validRole) {
      throw new ForbiddenException('No tienes permisos');
    }
    return validRole;
  }
}
