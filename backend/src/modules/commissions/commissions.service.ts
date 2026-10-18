import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CommissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(userId: string) {
    const [totalCommission, paidCommission, pendingCommission] = await Promise.all([
      this.prisma.commissionLedger.aggregate({
        where: { subOrder: { shop: { ownerId: userId } } },
        _sum: { commissionAmount: true },
      }),
      this.prisma.commissionLedger.aggregate({
        where: {
          subOrder: { shop: { ownerId: userId } },
          status: 'PAID_OUT',
        },
        _sum: { commissionAmount: true },
      }),
      this.prisma.commissionLedger.aggregate({
        where: {
          subOrder: { shop: { ownerId: userId } },
          status: { in: ['ESTIMATED', 'PROVISIONAL', 'EARNED'] },
        },
        _sum: { commissionAmount: true },
      }),
    ]);

    return {
      totalCommission: Number(totalCommission._sum.commissionAmount ?? 0),
      paidCommission: Number(paidCommission._sum.commissionAmount ?? 0),
      pendingCommission: Number(pendingCommission._sum.commissionAmount ?? 0),
    };
  }

  async findByVendor(userId: string) {
    return this.prisma.commissionLedger.findMany({
      where: { subOrder: { shop: { ownerId: userId } } },
      include: {
        subOrder: {
          select: {
            id: true,
            subOrderNumber: true,
            status: true,
            totalAmount: true,
            shop: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { effectiveDate: 'desc' },
    });
  }
}
