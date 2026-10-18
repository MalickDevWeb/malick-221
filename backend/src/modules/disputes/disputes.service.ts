import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DisputesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { clientId: userId },
      select: { id: true, orderNumber: true, status: true, grandTotal: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return {
      totalDisputes: orders.filter((order) => order.status === 'DISPUTED').length,
      orders: orders.filter((order) => order.status === 'DISPUTED' || order.status === 'REFUNDED'),
    };
  }
}
