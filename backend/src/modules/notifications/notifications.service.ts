import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getRecent(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { clientId: userId },
      select: { id: true, orderNumber: true, status: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return orders.map((order) => ({
      id: order.id,
      title: 'Commande mise à jour',
      message: `Votre commande ${order.orderNumber} est maintenant en statut ${order.status}.`,
      createdAt: order.createdAt,
    }));
  }
}
