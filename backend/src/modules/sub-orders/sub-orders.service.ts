import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SubOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySeller(userId: string) {
    return this.prisma.subOrder.findMany({
      where: { shop: { ownerId: userId } },
      include: {
        order: { select: { id: true, orderNumber: true, status: true } },
        shop: { select: { id: true, name: true } },
        items: { select: { id: true, productTitleSnapshot: true, quantity: true, totalLinePrice: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
