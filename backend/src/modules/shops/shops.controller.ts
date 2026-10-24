import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { Roles } from '../../common/auth/roles.decorator';
import { RolesGuard } from '../../common/auth/roles.guard';
import { CreateVendorShopDto } from './create-vendor-shop.dto';
import { ShopsService } from './shops.service';

@ApiTags('Boutiques (Shops)')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une boutique en attente de certification' })
  @ApiCreatedResponse({ description: 'Boutique créée avec le statut PENDING_VERIFICATION.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant ou invalide.' })
  @ApiForbiddenResponse({ description: 'Cette action est réservée aux vendeurs.' })
  create(@CurrentUser() user: AuthenticatedUser, @Body() body: CreateVendorShopDto) {
    return this.shopsService.createForVendor(user.id, body);
  }

  @Get('vendor/me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lister les boutiques du vendeur connecté' })
  @ApiOkResponse({ description: 'Boutiques appartenant exclusivement au vendeur authentifié.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant ou invalide.' })
  @ApiForbiddenResponse({ description: 'Cette action est réservée aux vendeurs.' })
  listMyShops(@CurrentUser() user: AuthenticatedUser) {
    return this.shopsService.findForVendor(user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les boutiques actives' })
  @ApiOkResponse({ description: 'Liste des boutiques actives avec le nombre de produits publiés.' })
  findAll() {
    return this.shopsService.findAllActive();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtenir la vitrine publique d’une boutique par son slug' })
  @ApiParam({ name: 'slug', example: 'qa-boutique-test', description: 'Identifiant lisible de la boutique.' })
  @ApiOkResponse({ description: 'Détails de la boutique et liste de ses produits publiés.' })
  @ApiNotFoundResponse({ description: 'Boutique introuvable.' })
  findBySlug(@Param('slug') slug: string) {
    return this.shopsService.findBySlug(slug);
  }
}

