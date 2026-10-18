import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (error, key) => {
      if (error) reject(error);
      else resolve(key as Buffer);
    });
  });
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const fullName = dto.fullName.trim();
    const phoneNumber = dto.phoneNumber.trim();
    const email = dto.email?.trim().toLowerCase() ?? null;

    if (!fullName || !phoneNumber) {
      throw new ConflictException('Le nom complet et le numéro de téléphone sont obligatoires.');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { phoneNumber },
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('Un compte existe déjà avec ce numéro ou cet email.');
    }

    const passwordHash = await this.hashPassword(dto.password);
    const user = await this.prisma.user.create({
      data: {
        fullName,
        phoneNumber,
        email,
        passwordHash,
        role: dto.role ?? UserRole.CLIENT,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
        isActive: true,
      },
    });

    const accessToken = await this.jwt.signAsync({ sub: user.id, role: user.role });

    return {
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const identity = dto.identity.trim();
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: identity.toLowerCase() },
          { phoneNumber: identity },
        ],
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        passwordHash: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive || !(await this.passwordMatches(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const accessToken = await this.jwt.signAsync({ sub: user.id, role: user.role });

    return {
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16);
    const key = await deriveKey(password, salt);
    return `scrypt$${salt.toString('hex')}$${key.toString('hex')}`;
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
