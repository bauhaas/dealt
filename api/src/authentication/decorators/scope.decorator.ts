import { SetMetadata } from '@nestjs/common';
import { AvailableScope } from './availableScopes';

export const SCOPES_KEY = 'scopes';
export const RequiredScopes = (scopes: AvailableScope[]) =>
  SetMetadata(SCOPES_KEY, scopes);
