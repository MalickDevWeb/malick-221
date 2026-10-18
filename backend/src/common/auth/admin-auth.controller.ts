import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './admin-login.dto';

@ApiTags('Administration')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly auth: AdminAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authentifier un compte Super Admin' })
  login(@Body() body: AdminLoginDto) {
    return this.auth.login(body.identity, body.password);
  }
}