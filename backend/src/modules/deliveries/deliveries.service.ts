import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DeliveriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(userId: string) {
    const shipments = await this.prisma.subOrder.findMany({
      where: {
        shop: { ownerId: userId },
        status: { in: [OrderStatus.ACCEPTED, OrderStatus.PREPARING, OrderStatus.SHIPPED, OrderStatus.DELIVERED] },
      },
      include: {
        order: { select: { id: true, orderNumber: true, paymentStatus: true, status: true } },
        shop: { select: { id: true, name: true } },
        items: { select: { id: true, productTitleSnapshot: true, quantity: true, totalLinePrice: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return {
      totalShipments: shipments.length,
      shipments: shipments.map((item) => ({
        id: item.id,
        subOrderNumber: item.subOrderNumber,
        status: item.status,
        totalAmount: Number(item.totalAmount),
        shop: item.shop.name,
        itemCount: item.items.length,
        orderNumber: item.order.orderNumber,
      })),
    };
  }
}
