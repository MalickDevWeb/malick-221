import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import { AuthenticatedRole, AuthenticatedUser } from './authenticated-user';

const ROLES: AuthenticatedRole[] = ['CLIENT', 'VENDOR', 'COURIER', 'ADMIN', 'SUPER_ADMIN', 'SUPPORT'];

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (typeof authorization !== 'string' || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Jeton d’accès requis.');
    }

    try {
      const payload = await this.jwt.verifyAsync<{ sub?: string; role?: string }>(
        authorization.slice('Bearer '.length),
      );
      if (!payload.sub || !ROLES.includes(payload.role as AuthenticatedRole)) {
        throw new UnauthorizedException('Identité du jeton invalide.');
      }
      const account = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { role: true, isActive: true },
      });
      if (!account?.isActive || account.role !== payload.role) {
        throw new UnauthorizedException('Le compte du jeton est inactif ou ses droits ont changé.');
      }
      const user: AuthenticatedUser = { id: payload.sub, role: payload.role as AuthenticatedRole };
      request.user = user;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Jeton d’accès invalide ou expiré.');
    }
  }
}