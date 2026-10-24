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

function getPhoneLookupCandidates(rawPhone: string): string[] {
  const trimmed = rawPhone.trim();
  const digitsOnly = trimmed.replace(/\D/g, '');
  const candidates = new Set<string>();

  if (trimmed) {
    candidates.add(trimmed);
  }
  if (digitsOnly) {
    candidates.add(digitsOnly);
    if (digitsOnly.length === 9) {
      candidates.add(`+221${digitsOnly}`);
      candidates.add(`221${digitsOnly}`);
      candidates.add(`00221${digitsOnly}`);
    } else if (digitsOnly.startsWith('221') && digitsOnly.length === 12) {
      const local = digitsOnly.slice(3);
      candidates.add(`+${digitsOnly}`);
      candidates.add(digitsOnly);
      candidates.add(local);
    }
  }

  return Array.from(candidates);
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    const fullName = dto.fullName.trim();
    const rawPhone = dto.phoneNumber.trim();
    const email = dto.email?.trim().toLowerCase() ?? null;

    if (!fullName || !rawPhone) {
      throw new ConflictException('Le nom complet et le numéro de téléphone sont obligatoires.');
    }

    const phoneCandidates = getPhoneLookupCandidates(rawPhone);

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          ...phoneCandidates.map((p) => ({ phoneNumber: p })),
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException('Un compte existe déjà avec ce numéro ou cet email.');
    }

    const digitsOnly = rawPhone.replace(/\D/g, '');
    const canonicalPhone = digitsOnly.length === 9
      ? `+221${digitsOnly}`
      : (digitsOnly.startsWith('221') && digitsOnly.length === 12
        ? `+${digitsOnly}`
        : rawPhone);

    const passwordHash = await this.hashPassword(dto.password);
    const user = await this.prisma.user.create({
      data: {
        fullName,
        phoneNumber: canonicalPhone,
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
    const phoneCandidates = getPhoneLookupCandidates(identity);
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: identity.toLowerCase() },
          ...phoneCandidates.map((p) => ({ phoneNumber: p })),
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
