import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './admin-login.dto';
import { AdminAuthResponseDto } from '../../modules/auth/dto/auth-response.dto';

@ApiTags('Administration')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly auth: AdminAuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authentifier un compte Super Admin' })
  @ApiOkResponse({ description: 'Authentification Super Admin réussie.', type: AdminAuthResponseDto })
  @ApiBadRequestResponse({ description: 'Format ou champs requis invalides.' })
  @ApiUnauthorizedResponse({ description: 'Identifiants invalides ou compte non Super Admin.' })
  login(@Body() body: AdminLoginDto) {
    return this.auth.login(body.identity, body.password);
  }
}