import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ShopStatus } from '@prisma/client';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

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

