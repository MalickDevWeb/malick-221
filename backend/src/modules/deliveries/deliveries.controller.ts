import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { DeliveriesService } from './deliveries.service';

@ApiTags('Livraisons')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get('vendor/overview')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtenir le statut des livraisons pour le vendeur' })
  @ApiOkResponse({ description: 'Livraisons des sous-commandes des boutiques du compte connecté.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  overview(@CurrentUser() user: AuthenticatedUser) {
    return this.deliveriesService.getOverview(user.id);
  }
}
