import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { Roles } from '../../common/auth/roles.decorator';
import { RolesGuard } from '../../common/auth/roles.guard';
import { OrdersApplicationService } from '../../application/orders/orders.application.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CreateVendorWithdrawalDto } from './dto/create-vendor-withdrawal.dto';
import { TransitionSubOrderDto } from './dto/transition-sub-order.dto';
import { OrderExceptionFilter } from './order-exception.filter';
import { OrdersResponseMapper } from './orders.response.mapper';

@ApiTags('Commandes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(OrderExceptionFilter)
@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersApplicationService) {}

  @Post('checkout')
  @Roles('CLIENT')
  @ApiOperation({ summary: 'Créer une commande et réserver son stock' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiCreatedResponse({ description: 'Commande créée; le stock demandé est réservé.' })
  @ApiBadRequestResponse({ description: 'Panier, adresse ou mode de paiement invalide.' })
  @ApiConflictResponse({ description: 'Stock indisponible ou clé d’idempotence réutilisée avec un autre panier.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Seul un compte CLIENT peut créer une commande.' })
  async checkout(
    @CurrentUser() user: AuthenticatedUser,
    @Headers('idempotency-key') idempotencyKey: string,
    @Body() body: CreateCheckoutDto,
  ) {
    const order = await this.orders.createCheckout(user.id, idempotencyKey, body);
    return OrdersResponseMapper.toClientOrder(order);
  }

  @Get('me')
  @Roles('CLIENT')
  @ApiOperation({ summary: 'Lister les commandes du client connecté' })
  @ApiOkResponse({ description: 'Commandes appartenant au client authentifié.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes CLIENT.' })
  async listMine(@CurrentUser() user: AuthenticatedUser) {
    const orders = await this.orders.listClientOrders(user.id);
    return orders.map(OrdersResponseMapper.toClientOrder);
  }

  @Get('me/:id')
  @Roles('CLIENT')
  @ApiOperation({ summary: 'Consulter une commande appartenant au client connecté' })
  @ApiParam({ name: 'id', description: 'UUID de la commande.' })
  @ApiOkResponse({ description: 'Commande et sous-commandes du client authentifié.' })
  @ApiNotFoundResponse({ description: 'Commande introuvable pour ce client.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes CLIENT.' })
  async getMine(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return OrdersResponseMapper.toClientOrder(await this.orders.getClientOrder(user.id, id));
  }

  @Get('vendor/sub-orders')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Lister les sous-commandes des boutiques du vendeur connecté' })
  @ApiOkResponse({ description: 'Sous-commandes limitées aux boutiques appartenant au vendeur authentifié.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes VENDOR.' })
  async listVendorSubOrders(@CurrentUser() user: AuthenticatedUser) {
    const subOrders = await this.orders.listVendorSubOrders(user.id);
    return subOrders.map(OrdersResponseMapper.toVendorSubOrder);
  }

  @Get('vendor/sub-orders/:id')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Consulter une sous-commande de ses boutiques' })
  @ApiParam({ name: 'id', description: 'UUID de la sous-commande.' })
  @ApiOkResponse({ description: 'Détail accessible uniquement si la boutique appartient au vendeur authentifié.' })
  @ApiNotFoundResponse({ description: 'Sous-commande introuvable pour ce vendeur.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes VENDOR.' })
  async getVendorSubOrder(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return OrdersResponseMapper.toVendorSubOrder(await this.orders.getVendorSubOrder(user.id, id));
  }

  @Get('vendor/dashboard')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Obtenir le tableau de bord vendeur: ventes, validation et commissions' })
  @ApiOkResponse({ description: 'Indicateurs et commandes récentes des boutiques du vendeur.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes VENDOR.' })
  async getVendorDashboard(@CurrentUser() user: AuthenticatedUser) {
    return this.orders.getVendorDashboard(user.id);
  }

  @Get('vendor/commissions')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Lister les commissions calculées pour les sous-commandes du vendeur' })
  @ApiOkResponse({ description: 'Ledger des commissions lié aux boutiques du vendeur authentifié.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes VENDOR.' })
  async listVendorCommissions(@CurrentUser() user: AuthenticatedUser) {
    return this.orders.listVendorCommissionLedger(user.id);
  }

  @Get('vendor/balance')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Obtenir la balance et les soldes disponibles par boutique' })
  @ApiOkResponse({ description: 'Montants gagnés, déjà demandés et disponibles par boutique.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes VENDOR.' })
  async getVendorBalance(@CurrentUser() user: AuthenticatedUser) {
    return this.orders.getVendorBalance(user.id);
  }

  @Get('vendor/withdrawals')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Lister les demandes de retrait du vendeur' })
  @ApiOkResponse({ description: 'Demandes de retrait appartenant au vendeur authentifié.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes VENDOR.' })
  async listVendorWithdrawals(@CurrentUser() user: AuthenticatedUser) {
    return this.orders.listVendorWithdrawalRequests(user.id);
  }

  @Post('vendor/withdrawals')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Créer une demande de retrait sur un solde disponible' })
  @ApiCreatedResponse({ description: 'Demande de retrait créée au statut PENDING.' })
  @ApiBadRequestResponse({ description: 'Montant invalide ou supérieur au solde disponible.' })
  @ApiNotFoundResponse({ description: 'Boutique absente ou non détenue par ce vendeur.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes VENDOR.' })
  async createVendorWithdrawal(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: CreateVendorWithdrawalDto,
  ) {
    return this.orders.createVendorWithdrawalRequest(
      user.id,
      body.shopId,
      body.amount,
      body.paymentMethod,
      body.notes,
    );
  }

  @Patch('vendor/sub-orders/:id/status')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Faire avancer une sous-commande selon la machine d’état' })
  @ApiParam({ name: 'id', description: 'UUID de la sous-commande.' })
  @ApiOkResponse({ description: 'Sous-commande mise à jour si la transition est autorisée.' })
  @ApiBadRequestResponse({ description: 'Statut ou motif invalide.' })
  @ApiConflictResponse({ description: 'Transition interdite ou paiement/remboursement requis.' })
  @ApiNotFoundResponse({ description: 'Sous-commande introuvable pour ce vendeur.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
  @ApiForbiddenResponse({ description: 'Cette route est réservée aux comptes VENDOR.' })
  async transitionVendorSubOrder(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: TransitionSubOrderDto,
  ) {
    const subOrder = await this.orders.transitionVendorSubOrder(user.id, id, body.status, body.reason);
    return OrdersResponseMapper.toVendorSubOrder(subOrder);
  }
}