import { SetMetadata } from '@nestjs/common';
import { AuthenticatedRole } from './authenticated-user';

export const REQUIRED_ROLES = 'requiredRoles';
export const Roles = (...roles: AuthenticatedRole[]) => SetMetadata(REQUIRED_ROLES, roles);