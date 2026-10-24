import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { SubOrdersService } from './sub-orders.service';

@ApiTags('Sous-commandes')
@Controller('sub-orders')
export class SubOrdersController {
  constructor(private readonly subOrdersService: SubOrdersService) {}

  @Get('vendor')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lister les sous-commandes du vendeur' })
  @ApiOkResponse({ description: 'Sous-commandes appartenant aux boutiques du compte vendeur connecté.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  findBySeller(@CurrentUser() user: AuthenticatedUser) {
    return this.subOrdersService.findBySeller(user.id);
  }
}
