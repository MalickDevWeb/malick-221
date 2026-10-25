import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductCondition, ShopStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { CreateVendorProductDto } from './create-vendor-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createForVendor(ownerId: string, input: CreateVendorProductDto) {
    const shop = await this.prisma.shop.findFirst({
      where: { id: input.shopId, ownerId },
      select: { id: true, name: true, status: true },
    });
    if (!shop) throw new NotFoundException('Boutique introuvable.');
    if (shop.status === ShopStatus.SUSPENDED || shop.status === ShopStatus.REJECTED) {
      throw new BadRequestException('Cette boutique ne peut pas publier de produits.');
    }
    if (input.discountPrice !== undefined && input.discountPrice >= input.basePrice) {
      throw new BadRequestException('Le prix remisé doit être inférieur au prix de base.');
    }

    const slugBase = input.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 120);

    return this.prisma.product.create({
      data: {
        shopId: shop.id,
        title: input.title.trim(),
        slug: `${slugBase}-${randomUUID().slice(0, 8)}`,
        description: input.description?.trim() || null,
        category: input.category.trim(),
        imageUrl: input.imageUrl ?? null,
        additionalImageUrls: input.additionalImageUrls ?? [],
        basePrice: input.basePrice,
        discountPrice: input.discountPrice ?? null,
        condition: input.condition ?? ProductCondition.NEUF,
        stockQuantity: input.stockQuantity,
        isPublished: shop.status === ShopStatus.ACTIVE,
      },
      include: { shop: { select: { id: true, name: true, status: true } } },
    });
  }

  async findAll(query?: { search?: string; shopSlug?: string }) {
    const where: any = { isPublished: true, shop: { status: ShopStatus.ACTIVE } };

    if (query?.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query?.shopSlug) {
      where.shop.slug = query.shopSlug;
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

    if (!product.isPublished || product.shop.status !== ShopStatus.ACTIVE) {
      throw new NotFoundException(`Produit introuvable avec l'identifiant : ${id}`);
    }

    return product;
  }
}

