import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { clientId: userId },
      select: { id: true, grandTotal: true, status: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return {
      totalOrders: orders.length,
      orders,
      totalAmount: orders.reduce((sum, order) => sum + Number(order.grandTotal), 0),
    };
  }
}
