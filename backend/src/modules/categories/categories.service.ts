import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.groupBy({
      by: ['shopId'],
      _count: { _all: true },
    });
  }

  async findFeatured() {
    return this.prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 12,
      include: {
        shop: { select: { id: true, name: true, slug: true } },
      },
    });
  }
}
