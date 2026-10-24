import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
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
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminOperationsService } from './admin-operations.service';
import { AdminShopsService } from './admin-shops.service';
import { AdminWithdrawalService } from './admin-withdrawals.service';
import { UpdateProductVisibilityDto } from './admin-operations.dto';
import { UpdateShopStatusDto } from './update-shop-status.dto';
import { UpdateWithdrawalStatusDto } from './update-withdrawal-status.dto';

@ApiTags('Administration')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant, invalide ou expiré.' })
@ApiForbiddenResponse({ description: 'Cette API est réservée aux comptes SUPER_ADMIN.' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly dashboard: AdminDashboardService,
    private readonly shops: AdminShopsService,
    private readonly withdrawals: AdminWithdrawalService,
    private readonly operations: AdminOperationsService,
  ) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Obtenir les indicateurs de la marketplace' })
  @ApiOkResponse({ description: 'Volumes, ventes et commissions agrégés de la marketplace.' })
  getDashboard() {
    return this.dashboard.getDashboard();
  }

  @Get('shops')
  @ApiOperation({ summary: 'Lister les boutiques et leur statut de vérification' })
  @ApiOkResponse({ description: 'Boutiques, propriétaires, statut et nombre de produits.' })
  listShops() {
    return this.shops.listShops();
  }

  @Patch('shops/:id/status')
  @ApiOperation({ summary: 'Modifier le statut de vérification d’une boutique' })
  @ApiParam({ name: 'id', description: 'UUID de la boutique.' })
  @ApiOkResponse({ description: 'Boutique mise à jour avec son propriétaire.' })
  @ApiBadRequestResponse({ description: 'Statut de boutique invalide.' })
  @ApiNotFoundResponse({ description: 'Boutique introuvable.' })
  updateShopStatus(@Param('id') id: string, @Body() body: UpdateShopStatusDto) {
    return this.shops.updateShopStatus(id, body.status);
  }

  @Get('products')
  @ApiOperation({ summary: 'Lister les produits pour modération' })
  @ApiOkResponse({ description: 'Produits, boutiques et propriétaires associés.' })
  listProducts() {
    return this.operations.listProducts();
  }

  @Patch('products/:id/visibility')
  @ApiOperation({ summary: 'Publier ou masquer un produit après modération' })
  @ApiParam({ name: 'id', description: 'UUID du produit.' })
  @ApiOkResponse({ description: 'Visibilité du produit mise à jour et décision auditée.' })
  @ApiBadRequestResponse({ description: 'Statut de publication ou motif invalide.' })
  @ApiNotFoundResponse({ description: 'Produit introuvable.' })
  updateProductVisibility(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: UpdateProductVisibilityDto,
  ) {
    return this.operations.updateProductVisibility(id, body.isPublished, body.reason, user.id);
  }

  @Get('withdrawals')
  @ApiOperation({ summary: 'Lister les demandes de retrait en attente et traitées' })
  @ApiOkResponse({ description: 'Demandes, boutique, vendeur et historique d’audit.' })
  listWithdrawals() {
    return this.withdrawals.listWithdrawals();
  }

  @Patch('withdrawals/:id/status')
  @ApiOperation({ summary: 'Approuver ou rejeter une demande de retrait vendeur' })
  @ApiParam({ name: 'id', description: 'UUID de la demande de retrait.' })
  @ApiOkResponse({ description: 'Statut du retrait mis à jour avec entrée d’audit.' })
  @ApiBadRequestResponse({ description: 'Transition de statut invalide ou motif requis.' })
  @ApiNotFoundResponse({ description: 'Demande de retrait introuvable.' })
  updateWithdrawalStatus(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() body: UpdateWithdrawalStatusDto,
  ) {
    return this.withdrawals.updateWithdrawalStatus(id, body.status, body.reason, user.id);
  }

  @Post('withdrawals/:id/process')
  @ApiOperation({ summary: 'Déclencher le décaissement externe d’une demande approuvée' })
  @ApiParam({ name: 'id', description: 'UUID de la demande de retrait.' })
  @ApiCreatedResponse({ description: 'Décaissement transmis au provider; le retrait passe à PROCESSING.' })
  @ApiBadRequestResponse({ description: 'Retrait non payable, coordonnées absentes ou provider indisponible.' })
  @ApiNotFoundResponse({ description: 'Demande de retrait introuvable.' })
  processWithdrawalPayout(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.withdrawals.executeWithdrawalPayout(id, user.id);
  }

  @Post('withdrawals/:id/confirm')
  @ApiOperation({ summary: 'Confirmer le paiement externe et clôturer le retrait vendeur' })
  @ApiParam({ name: 'id', description: 'UUID de la demande de retrait.' })
  @ApiCreatedResponse({ description: 'Résultat du contrôle provider; confirmed indique si le paiement est définitif.' })
  @ApiBadRequestResponse({ description: 'Retrait déjà clôturé ou transition impossible.' })
  @ApiNotFoundResponse({ description: 'Demande de retrait introuvable.' })
  confirmWithdrawalPayout(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.withdrawals.confirmExternalPayout(id, user.id);
  }

  @Get('withdrawals/:id/audit')
  @ApiOperation({ summary: 'Obtenir l’historique d’audit d’un retrait vendeur' })
  @ApiParam({ name: 'id', description: 'UUID de la demande de retrait.' })
  @ApiOkResponse({ description: 'Événements d’audit ordonnés, avec les informations de leur acteur.' })
  @ApiNotFoundResponse({ description: 'Demande de retrait introuvable.' })
  getWithdrawalAudit(@Param('id') id: string) {
    return this.withdrawals.getWithdrawalAudit(id);
  }
}