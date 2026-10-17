import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { search?: string; shopSlug?: string }) {
    const where: any = { isPublished: true };

    if (query?.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query?.shopSlug) {
      where.shop = { slug: query.shopSlug };
    }

    return this.prisma.product.findMany({
      where,
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        shop: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Produit introuvable avec l'identifiant : ${id}`);
    }

    return product;
  }
}

