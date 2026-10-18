import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { scrypt, timingSafeEqual } from 'crypto';
import { PrismaService } from '../../database/prisma.service';

function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (error, key) => {
      if (error) reject(error);
      else resolve(key as Buffer);
    });
  });
}

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(identity: string, password: string) {
    const normalizedIdentity = identity.trim();
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedIdentity.toLowerCase() },
          { phoneNumber: normalizedIdentity },
        ],
      },
      select: { id: true, fullName: true, email: true, phoneNumber: true, passwordHash: true, role: true, isActive: true },
    });

    if (
      !user ||
      !user.isActive ||
      user.role !== UserRole.SUPER_ADMIN ||
      !(await this.passwordMatches(password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const accessToken = await this.jwt.signAsync({ sub: user.id, role: user.role });
    return {
      accessToken,
      user: { id: user.id, fullName: user.fullName, email: user.email, phoneNumber: user.phoneNumber },
    };
  }

  private async passwordMatches(password: string, storedHash: string): Promise<boolean> {
    const [algorithm, saltHex, hashHex] = storedHash.split('$');
    if (algorithm !== 'scrypt' || !/^[a-f0-9]{32}$/i.test(saltHex ?? '') || !/^[a-f0-9]{128}$/i.test(hashHex ?? '')) {
      return false;
    }

    const expected = Buffer.from(hashHex, 'hex');
    const actual = await deriveKey(password, Buffer.from(saltHex, 'hex'));
    return timingSafeEqual(actual, expected);
  }
}