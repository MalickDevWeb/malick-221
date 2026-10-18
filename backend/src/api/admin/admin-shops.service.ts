import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AdminShopsService {
  constructor(private readonly prisma: PrismaService) {}

  listShops() {
    return this.prisma.shop.findMany({
      include: {
        owner: {
          select: { id: true, fullName: true, email: true, phoneNumber: true, isActive: true },
        },
        _count: { select: { products: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateShopStatus(id: string, status: ShopStatus) {
    const shop = await this.prisma.shop.findUnique({ where: { id }, select: { id: true } });
    if (!shop) throw new NotFoundException('Boutique introuvable.');

    return this.prisma.shop.update({
      where: { id },
      data: { status },
      include: {
        owner: {
          select: { id: true, fullName: true, email: true, phoneNumber: true, isActive: true },
        },
        _count: { select: { products: true } },
      },
    });
  }
}