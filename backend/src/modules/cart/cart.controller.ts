import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { CartService } from './cart.service';

@ApiTags('Panier')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Récupérer un résumé du panier et des commandes récentes du client' })
  @ApiOkResponse({ description: 'Résumé du panier et commandes récentes du client connecté.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  summary(@CurrentUser() user: AuthenticatedUser) {
    return this.cartService.getSummary(user.id);
  }
}
