import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiTags('Catégories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les produits phares regroupés par boutique' })
  @ApiOkResponse({ description: 'Jusqu’à 12 produits publiés avec les informations de leur boutique.' })
  findAll() {
    return this.categoriesService.findFeatured();
  }
}
