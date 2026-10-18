import { Injectable } from '@nestjs/common';
import { OrderStatus, PaymentStatus, ShopStatus, UserRole } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const paidOrderStatuses: OrderStatus[] = [
      OrderStatus.PAID,
      OrderStatus.TO_ACCEPT,
      OrderStatus.ACCEPTED,
      OrderStatus.PREPARING,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
      OrderStatus.COMPLETED,
    ];

    const [
      vendors,
      activeShops,
      pendingShops,
      products,
      ordersToday,
      salesToday,
      commissionsToday,
      recentOrders,
    ] = await Promise.all([
      this.prisma.user.count({ where: { role: UserRole.VENDOR } }),
      this.prisma.shop.count({ where: { status: ShopStatus.ACTIVE } }),
      this.prisma.shop.count({ where: { status: ShopStatus.PENDING_VERIFICATION } }),
      this.prisma.product.count(),
      this.prisma.order.count({ where: { createdAt: { gte: today } } }),
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: today },
          paymentStatus: PaymentStatus.SUCCESS,
          status: { in: paidOrderStatuses },
        },
        _sum: { grandTotal: true },
      }),
      this.prisma.commissionLedger.aggregate({
        where: { createdAt: { gte: today } },
        _sum: { commissionAmount: true },
      }),
      this.prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          orderNumber: true,
          grandTotal: true,
          status: true,
          createdAt: true,
          subOrders: {
            take: 1,
            select: { shop: { select: { name: true } } },
          },
        },
      }),
    ]);

    return {
      metrics: {
        vendors,
        activeShops,
        pendingShops,
        products,
        ordersToday,
        salesToday: Number(salesToday._sum.grandTotal ?? 0),
        commissionsToday: Number(commissionsToday._sum.commissionAmount ?? 0),
      },
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        amount: Number(order.grandTotal),
        status: order.status,
        createdAt: order.createdAt,
        shopName: order.subOrders[0]?.shop.name ?? 'Commande marketplace',
      })),
    };
  }
}