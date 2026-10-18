import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { CommissionsService } from './commissions.service';

@ApiTags('Commissions')
@Controller('commissions')
export class CommissionsController {
  constructor(private readonly commissionsService: CommissionsService) {}

  @Get('vendor/overview')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtenir la synthèse des commissions du vendeur' })
  overview(@CurrentUser() user: AuthenticatedUser) {
    return this.commissionsService.getOverview(user.id);
  }

  @Get('vendor/history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lister l’historique des commissions du vendeur' })
  history(@CurrentUser() user: AuthenticatedUser) {
    return this.commissionsService.findByVendor(user.id);
  }
}
