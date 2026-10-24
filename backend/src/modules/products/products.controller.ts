import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator';
import { AuthenticatedUser } from '../../common/auth/authenticated-user';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { Roles } from '../../common/auth/roles.decorator';
import { RolesGuard } from '../../common/auth/roles.guard';
import { CreateVendorProductDto } from './create-vendor-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Produits (Products)')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('VENDOR')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un produit pour une boutique du vendeur connecté' })
  @ApiCreatedResponse({ description: 'Produit publié automatiquement si la boutique est active, sinon soumis à validation.' })
  @ApiUnauthorizedResponse({ description: 'Jeton Bearer manquant ou invalide.' })
  @ApiForbiddenResponse({ description: 'Cette action est réservée aux vendeurs propriétaires de la boutique.' })
  @ApiNotFoundResponse({ description: 'Boutique introuvable ou non détenue par le vendeur.' })
  create(@CurrentUser() user: AuthenticatedUser, @Body() body: CreateVendorProductDto) {
    return this.productsService.createForVendor(user.id, body);
  }

  @Get()
  @ApiOperation({ summary: 'Lister les articles du catalogue avec recherche et filtres' })
  @ApiQuery({ name: 'search', required: false, description: 'Recherche par mot-clé' })
  @ApiQuery({ name: 'shopSlug', required: false, description: 'Filtrer par boutique' })
  @ApiOkResponse({ description: 'Produits publiés, avec les informations publiques de leur boutique.' })
  findAll(
    @Query('search') search?: string,
    @Query('shopSlug') shopSlug?: string,
  ) {
    return this.productsService.findAll({ search, shopSlug });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir la fiche détaillée d’un article' })
  @ApiParam({ name: 'id', example: '067fa986-1943-4851-b140-1aaed90e9c75', description: 'UUID du produit.' })
  @ApiOkResponse({ description: 'Détails du produit et de sa boutique.' })
  @ApiNotFoundResponse({ description: 'Produit introuvable.' })
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }
}

