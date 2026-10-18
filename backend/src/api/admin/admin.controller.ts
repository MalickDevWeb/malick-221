import { Controller, Get, Param, Patch, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { Roles } from '../../common/auth/roles.decorator';
import { RolesGuard } from '../../common/auth/roles.guard';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminShopsService } from './admin-shops.service';
import { AdminWithdrawalService } from './admin-withdrawals.service';
import { UpdateShopStatusDto } from './update-shop-status.dto';
import { UpdateWithdrawalStatusDto } from './update-withdrawal-status.dto';

@ApiTags('Administration')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly dashboard: AdminDashboardService,
    private readonly shops: AdminShopsService,
    private readonly withdrawals: AdminWithdrawalService,
  ) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Obtenir les indicateurs de la marketplace' })
  getDashboard() {
    return this.dashboard.getDashboard();
  }

  @Get('shops')
  @ApiOperation({ summary: 'Lister les boutiques et leur statut de vérification' })
  listShops() {
    return this.shops.listShops();
  }

  @Patch('shops/:id/status')
  @ApiOperation({ summary: 'Modifier le statut de vérification d’une boutique' })
  updateShopStatus(@Param('id') id: string, @Body() body: UpdateShopStatusDto) {
    return this.shops.updateShopStatus(id, body.status);
  }

  @Get('withdrawals')
  @ApiOperation({ summary: 'Lister les demandes de retrait en attente et traitées' })
  listWithdrawals() {
    return this.withdrawals.listWithdrawals();
  }

  @Patch('withdrawals/:id/status')
  @ApiOperation({ summary: 'Approuver ou rejeter une demande de retrait vendeur' })
  updateWithdrawalStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: UpdateWithdrawalStatusDto,
  ) {
    return this.withdrawals.updateWithdrawalStatus(id, body.status, body.reason, user.id);
  }

  @Post('withdrawals/:id/process')
  @ApiOperation({ summary: 'Déclencher le décaissement externe d’une demande approuvée' })
  processWithdrawalPayout(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.withdrawals.executeWithdrawalPayout(id, user.id);
  }

  @Post('withdrawals/:id/confirm')
  @ApiOperation({ summary: 'Confirmer le paiement externe et clôturer le retrait vendeur' })
  confirmWithdrawalPayout(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.withdrawals.confirmExternalPayout(id, user.id);
  }

  @Get('withdrawals/:id/audit')
  @ApiOperation({ summary: 'Obtenir l’historique d’audit d’un retrait vendeur' })
  getWithdrawalAudit(@Param('id') id: string) {
    return this.withdrawals.getWithdrawalAudit(id);
  }
}