import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthResponseDto, CurrentUserResponseDto } from './dto/auth-response.dto';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Créer un compte client ou vendeur' })
  @ApiCreatedResponse({ description: 'Compte créé et jeton d’accès émis.', type: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Données invalides ou rôle autre que CLIENT/VENDOR.' })
  @ApiConflictResponse({ description: 'Un compte existe déjà avec cet e-mail ou ce numéro.' })
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Se connecter avec un email ou un numéro de téléphone' })
  @ApiOkResponse({ description: 'Authentification réussie.', type: AuthResponseDto })
  @ApiBadRequestResponse({ description: 'Format ou champs requis invalides.' })
  @ApiUnauthorizedResponse({ description: 'Identifiants invalides ou compte inactif.' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer l’utilisateur courant' })
  @ApiOkResponse({ description: 'Identifiant et rôle du compte authentifié.', type: CurrentUserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Jeton manquant, invalide ou expiré.' })
  me(@CurrentUser() user: AuthenticatedUser) {
    return {
      id: user.id,
      role: user.role,
    };
  }
}
