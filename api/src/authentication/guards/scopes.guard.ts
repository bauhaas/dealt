import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AvailableScope } from 'src/authentication/decorators/availableScopes';
import { SCOPES_KEY } from 'src/authentication/decorators/scope.decorator';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector, private logger: Logger) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.get<AvailableScope[]>(
      SCOPES_KEY,
      context.getHandler(),
    );
    if (!requiredScopes) {
      return true;
    }

    this.logger.debug('Required Scopes:', requiredScopes);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    this.logger.debug('User in ScopesGuard:', user);

    if (!user || !user.scopes) {
      return false;
    }

    const userScopes = user.scopes;
    this.logger.debug('User Scopes:', userScopes);

    return requiredScopes.every((scope) => userScopes.includes(scope));
  }
}
