export type AuthenticatedRole =
  | 'CLIENT'
  | 'VENDOR'
  | 'COURIER'
  | 'ADMIN'
  | 'SUPER_ADMIN'
  | 'SUPPORT';

export interface AuthenticatedUser {
  id: string;
  role: AuthenticatedRole;
}