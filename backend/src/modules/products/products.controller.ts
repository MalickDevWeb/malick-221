import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('Produits (Products)')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les articles du catalogue avec recherche et filtres' })
  @ApiQuery({ name: 'search', required: false, description: 'Recherche par mot-clé' })
  @ApiQuery({ name: 'shopSlug', required: false, description: 'Filtrer par boutique' })
  @ApiResponse({ status: 200, description: 'Catalogue des articles disponibles' })
  findAll(
    @Query('search') search?: string,
    @Query('shopSlug') shopSlug?: string,
  ) {
    return this.productsService.findAll({ search, shopSlug });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir la fiche détaillée d’un article' })
  @ApiResponse({ status: 200, description: 'Détails du produit' })
  @ApiResponse({ status: 404, description: 'Produit introuvable' })
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }
}

