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
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { Roles } from '../../common/auth/roles.decorator';
import { RolesGuard } from '../../common/auth/roles.guard';
import { OrdersApplicationService } from '../../application/orders/orders.application.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
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
  async listMine(@CurrentUser() user: AuthenticatedUser) {
    const orders = await this.orders.listClientOrders(user.id);
    return orders.map(OrdersResponseMapper.toClientOrder);
  }

  @Get('me/:id')
  @Roles('CLIENT')
  @ApiOperation({ summary: 'Consulter une commande appartenant au client connecté' })
  async getMine(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return OrdersResponseMapper.toClientOrder(await this.orders.getClientOrder(user.id, id));
  }

  @Get('vendor/sub-orders')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Lister les sous-commandes des boutiques du vendeur connecté' })
  async listVendorSubOrders(@CurrentUser() user: AuthenticatedUser) {
    const subOrders = await this.orders.listVendorSubOrders(user.id);
    return subOrders.map(OrdersResponseMapper.toVendorSubOrder);
  }

  @Get('vendor/sub-orders/:id')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Consulter une sous-commande de ses boutiques' })
  async getVendorSubOrder(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return OrdersResponseMapper.toVendorSubOrder(await this.orders.getVendorSubOrder(user.id, id));
  }

  @Get('vendor/dashboard')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Obtenir le tableau de bord vendeur: ventes, validation et commissions' })
  async getVendorDashboard(@CurrentUser() user: AuthenticatedUser) {
    return this.orders.getVendorDashboard(user.id);
  }

  @Get('vendor/commissions')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Lister les commissions calculées pour les sous-commandes du vendeur' })
  async listVendorCommissions(@CurrentUser() user: AuthenticatedUser) {
    return this.orders.listVendorCommissionLedger(user.id);
  }

  @Get('vendor/balance')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Obtenir la balance et les soldes disponibles par boutique' })
  async getVendorBalance(@CurrentUser() user: AuthenticatedUser) {
    return this.orders.getVendorBalance(user.id);
  }

  @Get('vendor/withdrawals')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Lister les demandes de retrait du vendeur' })
  async listVendorWithdrawals(@CurrentUser() user: AuthenticatedUser) {
    return this.orders.listVendorWithdrawalRequests(user.id);
  }

  @Post('vendor/withdrawals')
  @Roles('VENDOR')
  @ApiOperation({ summary: 'Créer une demande de retrait sur un solde disponible' })
  async createVendorWithdrawal(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: { shopId: string; amount: number; paymentMethod: string; notes?: string },
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
  async transitionVendorSubOrder(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: TransitionSubOrderDto,
  ) {
    const subOrder = await this.orders.transitionVendorSubOrder(user.id, id, body.status, body.reason);
    return OrdersResponseMapper.toVendorSubOrder(subOrder);
  }
}