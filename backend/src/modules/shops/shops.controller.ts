import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ShopsService } from './shops.service';

@ApiTags('Boutiques (Shops)')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les boutiques actives' })
  @ApiResponse({ status: 200, description: 'Liste des boutiques actives' })
  findAll() {
    return this.shopsService.findAllActive();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Obtenir la vitrine publique d’une boutique par son slug' })
  @ApiResponse({ status: 200, description: 'Détails de la boutique et catalogue' })
  @ApiResponse({ status: 404, description: 'Boutique introuvable' })
  findBySlug(@Param('slug') slug: string) {
    return this.shopsService.findBySlug(slug);
  }
}

