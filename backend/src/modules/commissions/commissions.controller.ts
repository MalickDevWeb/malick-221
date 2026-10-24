import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
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
  @ApiOkResponse({ description: 'Totaux de commissions du vendeur connecté.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  overview(@CurrentUser() user: AuthenticatedUser) {
    return this.commissionsService.getOverview(user.id);
  }

  @Get('vendor/history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lister l’historique des commissions du vendeur' })
  @ApiOkResponse({ description: 'Entrées du ledger de commissions des boutiques du vendeur connecté.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  history(@CurrentUser() user: AuthenticatedUser) {
    return this.commissionsService.findByVendor(user.id);
  }
}
