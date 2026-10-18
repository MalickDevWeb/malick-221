import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_ACCESS_SECRET') ?? config.get<string>('JWT_SECRET');
        if (!secret || secret.length < 32) {
          throw new Error('JWT_ACCESS_SECRET doit contenir au moins 32 caractères.');
        }
        return { secret, signOptions: { expiresIn: config.get<string>('JWT_EXPIRATION') ?? '15m' } };
      },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [JwtAuthGuard, RolesGuard, AdminAuthService],
  exports: [JwtModule, JwtAuthGuard, RolesGuard],
})
export class AuthModule {}