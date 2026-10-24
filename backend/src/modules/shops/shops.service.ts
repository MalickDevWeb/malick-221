import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { ShopStatus } from '@prisma/client';
import { CreateVendorShopDto } from './create-vendor-shop.dto';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  createForVendor(ownerId: string, input: CreateVendorShopDto) {
    const slugBase = input.name
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 100);

    return this.prisma.shop.create({
      data: {
        ownerId,
        name: input.name.trim(),
        slug: `${slugBase || 'boutique'}-${randomUUID().slice(0, 8)}`,
        description: input.description?.trim() || null,
        status: ShopStatus.PENDING_VERIFICATION,
      },
    });
  }

  findForVendor(ownerId: string) {
    return this.prisma.shop.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllActive() {
    return this.prisma.shop.findMany({
      where: { status: ShopStatus.ACTIVE },
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isPublished: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!shop) {
      throw new NotFoundException(`Boutique introuvable avec le slug : ${slug}`);
    }

    return shop;
  }
}

