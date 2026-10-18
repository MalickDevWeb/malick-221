import { Injectable, NotFoundException } from '@nestjs/common';
import {
  OrderStatus as PrismaOrderStatus,
  PaymentStatus,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { OrderError } from '../../core/orders/order.errors';
import { assertVendorTransition, resolveCommissionStatusForTransition } from '../../core/orders/vendor-transition.policy';
import {
  CheckoutPricingPolicy,
  CheckoutProduct,
  CreateCheckoutCommand,
  OrderView,
  VendorBalanceSummary,
  VendorCommissionLedgerEntry,
  VendorDashboardSummary,
  VendorSubOrderStatus,
  VendorSubOrderView,
  VendorWithdrawalRequestView,
} from '../../core/orders/order.types';
import { OrdersRepository } from '../../core/orders/order.repository';
import { buildCheckoutPlan } from '../../core/orders/checkout-planner';
import {
  mapPrismaOrder,
  mapPrismaVendorSubOrder,
  ORDER_WITH_LINES,
  VENDOR_SUB_ORDER_WITH_LINES,
} from './order-prisma.mapper';

interface LockedProduct {
  id: string;
  shopId: string;
  shopName: string;
  shopStatus: string;
  isPublished: boolean;
  title: string;
  basePrice: Prisma.Decimal;
  discountPrice: Prisma.Decimal | null;
  availableStock: number;
  stockQuantity: number;
  reservedQuantity: number;
}

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCheckout(
    command: CreateCheckoutCommand,
    pricing: CheckoutPricingPolicy,
    requestFingerprint: string,
    orderNumber: string,
  ): Promise<OrderView> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const client = await tx.user.findFirst({
          where: { id: command.clientId, isActive: true, role: 'CLIENT' },
          select: { id: true },
        });
        if (!client) throw new OrderError('FORBIDDEN', 'Un compte client actif est requis.');

        const existing = await tx.order.findUnique({
          where: {
            clientId_idempotencyKey: {
              clientId: command.clientId,
              idempotencyKey: command.idempotencyKey,
            },
          },
          include: ORDER_WITH_LINES,
        });
        if (existing) {
          if (existing.requestFingerprint !== requestFingerprint) {
            throw new OrderError('IDEMPOTENCY_CONFLICT', 'Cette clé d’idempotence a déjà servi pour une requête différente.');
          }
          return mapPrismaOrder(existing);
        }

        const productIds = command.items.map((item) => item.productId);
        const lockedProducts = await tx.$queryRaw<LockedProduct[]>(Prisma.sql`
          SELECT
            p."id",
            p."shopId",
            s."name" AS "shopName",
            s."status" AS "shopStatus",
            p."isPublished",
            p."title",
            p."basePrice",
            p."discountPrice",
            (p."stockQuantity" - p."reservedQuantity")::int AS "availableStock",
            p."stockQuantity",
            p."reservedQuantity"
          FROM "products" p
          INNER JOIN "shops" s ON s."id" = p."shopId"
          WHERE p."id" IN (${Prisma.join(productIds)})
          ORDER BY p."id"
          FOR UPDATE OF p
        `);

        const checkoutProducts: CheckoutProduct[] = lockedProducts.map((product) => ({
          id: product.id,
          shopId: product.shopId,
          shopName: product.shopName,
          isShopActive: product.shopStatus === 'ACTIVE',
          isPublished: product.isPublished,
          title: product.title,
          basePrice: product.basePrice.toNumber(),
          discountPrice: product.discountPrice?.toNumber() ?? null,
          availableStock: product.availableStock,
        }));
        const plan = buildCheckoutPlan(command, checkoutProducts, pricing);
        const now = new Date();
        const reservesOnlinePayment = command.paymentMethod !== 'CASH_ON_DELIVERY';
        const initialStatus = reservesOnlinePayment ? 'PENDING_PAYMENT' : 'TO_ACCEPT';
        const reservationExpiresAt = reservesOnlinePayment
          ? new Date(now.getTime() + pricing.stockReservationMinutes * 60_000)
          : null;
        const shippingAddressSnapshot: Prisma.InputJsonObject = {
          recipientName: command.shippingAddress.recipientName,
          phoneNumber: command.shippingAddress.phoneNumber,
          region: command.shippingAddress.region,
          city: command.shippingAddress.city,
          addressLine: command.shippingAddress.addressLine,
          ...(command.shippingAddress.instructions
            ? { instructions: command.shippingAddress.instructions }
            : {}),
        };

        const order = await tx.order.create({
          data: {
            clientId: command.clientId,
            idempotencyKey: command.idempotencyKey,
            requestFingerprint,
            orderNumber,
            grandTotal: plan.grandTotal,
            paymentMethod: command.paymentMethod,
            paymentStatus: 'PENDING',
            status: initialStatus,
            shippingAddressSnapshot,
            stockReservationExpiresAt: reservationExpiresAt,
            subOrders: {
              create: plan.subOrders.map((subOrder, index) => ({
                shopId: subOrder.shopId,
                subOrderNumber: `${orderNumber}-${index + 1}`,
                subtotalItems: subOrder.subtotalItems,
                shippingFee: subOrder.shippingFee,
                totalAmount: subOrder.totalAmount,
                commissionRateApplied: subOrder.commissionRate,
                commissionAmount: subOrder.commissionAmount,
                vendorNetEarning: subOrder.vendorNetEarning,
                status: initialStatus,
                items: {
                  create: subOrder.items.map((item) => ({
                    productId: item.productId,
                    productTitleSnapshot: item.title,
                    unitPriceSnapshot: item.unitPrice,
                    quantity: item.quantity,
                    totalLinePrice: item.lineTotal,
                  })),
                },
                commissions: {
                  create: {
                    baseAmount: subOrder.subtotalItems,
                    rate: subOrder.commissionRate,
                    commissionAmount: subOrder.commissionAmount,
                    status: 'ESTIMATED',
                  },
                },
              })),
            },
          },
        });

        for (const item of command.items) {
          const product = lockedProducts.find((candidate) => candidate.id === item.productId);
          if (!product || product.availableStock < item.quantity) {
            throw new OrderError('INSUFFICIENT_STOCK', 'Le stock demandé n’est plus disponible.');
          }
          await tx.product.update({
            where: { id: product.id },
            data: { reservedQuantity: { increment: item.quantity } },
          });
          await tx.stockMovement.create({
            data: {
              productId: product.id,
              orderId: order.id,
              type: 'RESERVED',
              quantity: item.quantity,
              stockQuantityBefore: product.stockQuantity,
              reservedQuantityBefore: product.reservedQuantity,
              reason: `Réservation de commande ${order.orderNumber}`,
            },
          });
          product.availableStock -= item.quantity;
          product.reservedQuantity += item.quantity;
        }

        const savedOrder = await tx.order.findUniqueOrThrow({
          where: { id: order.id },
          include: ORDER_WITH_LINES,
        });
        await tx.outboxEvent.create({
          data: {
            aggregateType: 'Order',
            aggregateId: order.id,
            eventType: 'order.checkout.created.v1',
            payload: {
              orderId: order.id,
              orderNumber: order.orderNumber,
              clientId: command.clientId,
              status: initialStatus,
              paymentMethod: command.paymentMethod,
              paymentStatus: 'PENDING',
              total: plan.grandTotal,
              subOrderIds: savedOrder.subOrders.map((subOrder) => subOrder.id),
            },
          },
        });
        return mapPrismaOrder(savedOrder);
      }, {
        maxWait: 5_000,
        timeout: 15_000,
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const existing = await this.prisma.order.findUnique({
          where: {
            clientId_idempotencyKey: {
              clientId: command.clientId,
              idempotencyKey: command.idempotencyKey,
            },
          },
          include: ORDER_WITH_LINES,
        });
        if (existing?.requestFingerprint === requestFingerprint) return mapPrismaOrder(existing);
        if (existing) throw new OrderError('IDEMPOTENCY_CONFLICT', 'Cette clé d’idempotence a déjà servi pour une requête différente.');
      }
      throw error;
    }
  }

  async listClientOrders(clientId: string): Promise<OrderView[]> {
    const orders = await this.prisma.order.findMany({
      where: { clientId },
      include: ORDER_WITH_LINES,
      orderBy: { createdAt: 'desc' },
    });
    return orders.map(mapPrismaOrder);
  }

  async getClientOrder(clientId: string, orderId: string): Promise<OrderView> {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, clientId },
      include: ORDER_WITH_LINES,
    });
    if (!order) throw new NotFoundException('Commande introuvable.');
    return mapPrismaOrder(order);
  }

  async listVendorSubOrders(ownerId: string): Promise<VendorSubOrderView[]> {
    const subOrders = await this.prisma.subOrder.findMany({
      where: { shop: { ownerId } },
      include: VENDOR_SUB_ORDER_WITH_LINES,
      orderBy: { createdAt: 'desc' },
    });
    return subOrders.map(mapPrismaVendorSubOrder);
  }

  async getVendorSubOrder(ownerId: string, subOrderId: string): Promise<VendorSubOrderView> {
    const subOrder = await this.prisma.subOrder.findFirst({
      where: { id: subOrderId, shop: { ownerId } },
      include: VENDOR_SUB_ORDER_WITH_LINES,
    });
    if (!subOrder) throw new NotFoundException('Sous-commande introuvable.');
    return mapPrismaVendorSubOrder(subOrder);
  }

  async getVendorDashboard(ownerId: string): Promise<VendorDashboardSummary> {
    const [pendingValidation, accepted, shipped, turnover, commissionDue, commissionPaid, recentOrders] = await Promise.all([
      this.prisma.subOrder.count({
        where: { shop: { ownerId }, status: { in: ['TO_ACCEPT', 'PAID'] } },
      }),
      this.prisma.subOrder.count({
        where: { shop: { ownerId }, status: 'ACCEPTED' },
      }),
      this.prisma.subOrder.count({
        where: { shop: { ownerId }, status: 'SHIPPED' },
      }),
      this.prisma.subOrder.aggregate({
        where: { shop: { ownerId }, status: { in: ['ACCEPTED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'COMPLETED'] } },
        _sum: { totalAmount: true },
      }),
      this.prisma.subOrder.aggregate({
        where: { shop: { ownerId }, status: { in: ['ACCEPTED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'COMPLETED'] } },
        _sum: { commissionAmount: true },
      }),
      this.prisma.commissionLedger.aggregate({
        where: { subOrder: { shop: { ownerId } }, status: 'PAID_OUT' },
        _sum: { commissionAmount: true },
      }),
      this.prisma.subOrder.findMany({
        where: { shop: { ownerId } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { shop: { select: { name: true } }, order: { select: { orderNumber: true } } },
      }),
    ]);

    return {
      pendingValidation,
      accepted,
      shipped,
      turnover: Number(turnover._sum.totalAmount ?? 0),
      commissionDue: Number(commissionDue._sum.commissionAmount ?? 0),
      commissionPaid: Number(commissionPaid._sum.commissionAmount ?? 0),
      recentOrders: recentOrders.map((subOrder) => ({
        id: subOrder.id,
        orderNumber: subOrder.order.orderNumber,
        shopName: subOrder.shop.name,
        total: Number(subOrder.totalAmount),
        status: subOrder.status,
        createdAt: subOrder.createdAt.toISOString(),
      })),
    };
  }

  async listVendorCommissionLedger(ownerId: string): Promise<VendorCommissionLedgerEntry[]> {
    const ledgers = await this.prisma.commissionLedger.findMany({
      where: { subOrder: { shop: { ownerId } } },
      orderBy: { createdAt: 'desc' },
      include: {
        subOrder: {
          select: {
            subOrderNumber: true,
            shop: { select: { name: true } },
          },
        },
      },
    });

    return ledgers.map((entry) => ({
      id: entry.id,
      orderNumber: entry.subOrder.subOrderNumber,
      shopName: entry.subOrder.shop.name,
      status: entry.status,
      baseAmount: Number(entry.baseAmount),
      rate: Number(entry.rate),
      commissionAmount: Number(entry.commissionAmount),
      createdAt: entry.createdAt.toISOString(),
    }));
  }

  async getVendorBalance(ownerId: string): Promise<VendorBalanceSummary> {
    const shops = await this.prisma.shop.findMany({
      where: { ownerId },
      select: {
        id: true,
        name: true,
        subOrders: {
          select: {
            totalAmount: true,
            commissionAmount: true,
            status: true,
          },
        },
      },
    });

    const pendingByShop = await this.prisma.withdrawalRequest.groupBy({
      by: ['shopId'],
      where: {
        status: { in: ['PENDING', 'APPROVED', 'PROCESSING'] },
      },
      _sum: { amount: true },
    });

    const summary = shops.map((shop) => {
      const earned = shop.subOrders.reduce((sum, subOrder) => sum + Number(subOrder.commissionAmount), 0);
      const pendingWithdrawal = pendingByShop.find((entry) => entry.shopId === shop.id)?._sum.amount
        ? Number(pendingByShop.find((entry) => entry.shopId === shop.id)?._sum.amount ?? 0)
        : 0;
      const available = Math.max(earned - pendingWithdrawal, 0);
      return {
        shopId: shop.id,
        shopName: shop.name,
        earned,
        pendingWithdrawal,
        available,
      };
    });

    return {
      totalEarned: summary.reduce((sum, item) => sum + item.earned, 0),
      totalPendingWithdrawal: summary.reduce((sum, item) => sum + item.pendingWithdrawal, 0),
      totalAvailable: summary.reduce((sum, item) => sum + item.available, 0),
      shops: summary,
    };
  }

  async listVendorWithdrawalRequests(ownerId: string): Promise<VendorWithdrawalRequestView[]> {
    const requests = await this.prisma.withdrawalRequest.findMany({
      where: { vendorId: ownerId },
      orderBy: { createdAt: 'desc' },
      include: { shop: { select: { name: true } } },
    });

    return requests.map((request) => ({
      id: request.id,
      shopId: request.shopId,
      shopName: request.shop.name,
      amount: Number(request.amount),
      fee: Number(request.fee),
      paymentMethod: request.paymentMethod,
      status: request.status,
      notes: request.notes ?? undefined,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
    }));
  }

  async createVendorWithdrawalRequest(
    ownerId: string,
    shopId: string,
    amount: number,
    paymentMethod: string,
    notes?: string,
  ): Promise<VendorWithdrawalRequestView> {
    const shop = await this.prisma.shop.findFirst({
      where: { id: shopId, ownerId },
      select: { id: true, name: true },
    });
    if (!shop) throw new NotFoundException('Boutique introuvable pour ce vendeur.');

    const balance = await this.getVendorBalance(ownerId);
    const shopBalance = balance.shops.find((item) => item.shopId === shopId);
    if (!shopBalance || amount > shopBalance.available) {
      throw new OrderError('INVALID_CHECKOUT', 'Le montant demandé dépasse le solde disponible de cette boutique.');
    }

    const request = await this.prisma.withdrawalRequest.create({
      data: {
        shopId,
        vendorId: ownerId,
        amount: amount.toFixed(2),
        fee: 0,
        paymentMethod,
        notes,
        status: 'PENDING',
      },
      include: { shop: { select: { name: true } } },
    });

    return {
      id: request.id,
      shopId: request.shopId,
      shopName: request.shop.name,
      amount: Number(request.amount),
      fee: Number(request.fee),
      paymentMethod: request.paymentMethod,
      status: request.status,
      notes: request.notes ?? undefined,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
    };
  }

  async transitionVendorSubOrder(
    ownerId: string,
    subOrderId: string,
    nextStatus: VendorSubOrderStatus,
    rejectionReason?: string,
  ): Promise<VendorSubOrderView> {
    return this.prisma.$transaction(async (tx) => {
      const current = await tx.subOrder.findFirst({
        where: { id: subOrderId, shop: { ownerId } },
        include: { order: true, items: true, commissions: true },
      });
      if (!current) throw new NotFoundException('Sous-commande introuvable.');
      assertVendorTransition(current.status, current.order.paymentMethod, current.order.paymentStatus, nextStatus);

      const transitionResult = await tx.subOrder.updateMany({
        where: { id: current.id, status: current.status },
        data: {
          status: nextStatus,
          rejectionReason: nextStatus === 'REJECTED' ? rejectionReason : null,
        },
      });
      if (transitionResult.count !== 1) {
        throw new OrderError('INVALID_TRANSITION', 'La commande a déjà été modifiée; rechargez son état actuel.');
      }

      const nextCommissionStatus = resolveCommissionStatusForTransition(nextStatus);
      if (nextCommissionStatus) {
        await tx.commissionLedger.updateMany({
          where: { subOrderId: current.id },
          data: { status: nextCommissionStatus },
        });
      }

      if (nextStatus === 'REJECTED' || nextStatus === 'SHIPPED') {
        for (const item of current.items) {
          const product = await tx.product.findUniqueOrThrow({ where: { id: item.productId } });
          if (product.reservedQuantity < item.quantity) {
            throw new OrderError('CHECKOUT_CONFIGURATION_INVALID', 'La réservation de stock est incohérente.');
          }
          await tx.product.update({
            where: { id: product.id },
            data: nextStatus === 'SHIPPED'
              ? {
                  stockQuantity: { decrement: item.quantity },
                  reservedQuantity: { decrement: item.quantity },
                }
              : { reservedQuantity: { decrement: item.quantity } },
          });
          await tx.stockMovement.create({
            data: {
              productId: product.id,
              orderId: current.orderId,
              actorId: ownerId,
              type: nextStatus === 'SHIPPED' ? 'FULFILLED' : 'RELEASED',
              quantity: item.quantity,
              stockQuantityBefore: product.stockQuantity,
              reservedQuantityBefore: product.reservedQuantity,
              reason: nextStatus === 'SHIPPED'
                ? `Expédition de ${current.subOrderNumber}`
                : `Refus de ${current.subOrderNumber}: ${rejectionReason}`,
            },
          });
        }
      }

      await tx.orderStatusHistory.create({
        data: {
          subOrderId: current.id,
          actorId: ownerId,
          fromStatus: current.status,
          toStatus: nextStatus,
          reason: rejectionReason,
        },
      });
      await tx.outboxEvent.create({
        data: {
          aggregateType: 'SubOrder',
          aggregateId: current.id,
          eventType: 'order.sub-order.status-changed.v1',
          payload: {
            orderId: current.orderId,
            subOrderId: current.id,
            subOrderNumber: current.subOrderNumber,
            actorId: ownerId,
            fromStatus: current.status,
            toStatus: nextStatus,
            reason: rejectionReason ?? null,
          },
        },
      });

      const siblingStatuses = await tx.subOrder.findMany({
        where: { orderId: current.orderId },
        select: { status: true },
      });
      await tx.order.update({
        where: { id: current.orderId },
        data: { status: this.aggregateOrderStatus(siblingStatuses.map((sibling) => sibling.status)) },
      });

      const result = await tx.subOrder.findUniqueOrThrow({
        where: { id: current.id },
        include: VENDOR_SUB_ORDER_WITH_LINES,
      });
      return mapPrismaVendorSubOrder(result);
    }, {
      maxWait: 5_000,
      timeout: 15_000,
      isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
    });
  }

  async expireUnpaidReservations(): Promise<number> {
    return this.prisma.$transaction(async (tx) => {
      const expiredOrders = await tx.$queryRaw<Array<{ id: string; orderNumber: string }>>(Prisma.sql`
        SELECT "id", "orderNumber"
        FROM "orders"
        WHERE "status" = 'PENDING_PAYMENT'::"OrderStatus"
          AND "stockReservationExpiresAt" <= NOW()
        ORDER BY "stockReservationExpiresAt", "id"
        LIMIT 50
        FOR UPDATE SKIP LOCKED
      `);

      for (const order of expiredOrders) {
        const subOrders = await tx.subOrder.findMany({
          where: { orderId: order.id },
          include: { items: true },
        });
        const quantities = new Map<string, number>();
        for (const subOrder of subOrders) {
          for (const item of subOrder.items) {
            quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);
          }
        }

        for (const [productId, quantity] of quantities) {
          const product = await tx.product.findUniqueOrThrow({ where: { id: productId } });
          const released = await tx.product.updateMany({
            where: { id: productId, reservedQuantity: { gte: quantity } },
            data: { reservedQuantity: { decrement: quantity } },
          });
          if (released.count !== 1) {
            throw new OrderError('CHECKOUT_CONFIGURATION_INVALID', 'La réservation de stock expirée est incohérente.');
          }
          await tx.stockMovement.create({
            data: {
              productId,
              orderId: order.id,
              type: 'RELEASED',
              quantity,
              stockQuantityBefore: product.stockQuantity,
              reservedQuantityBefore: product.reservedQuantity,
              reason: `Expiration du paiement ${order.orderNumber}`,
            },
          });
        }

        await tx.subOrder.updateMany({
          where: { orderId: order.id, status: 'PENDING_PAYMENT' },
          data: { status: 'CANCELLED' },
        });
        await tx.order.update({
          where: { id: order.id },
          data: { status: 'CANCELLED', paymentStatus: 'FAILED' },
        });
        await tx.outboxEvent.create({
          data: {
            aggregateType: 'Order',
            aggregateId: order.id,
            eventType: 'order.payment.expired.v1',
            payload: { orderId: order.id, orderNumber: order.orderNumber },
          },
        });
      }

      return expiredOrders.length;
    }, {
      maxWait: 5_000,
      timeout: 15_000,
      isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
    });
  }

  private aggregateOrderStatus(statuses: PrismaOrderStatus[]): PrismaOrderStatus {
    if (statuses.every((status) => status === 'REJECTED' || status === 'CANCELLED' || status === 'REFUNDED')) {
      return 'CANCELLED';
    }
    if (statuses.some((status) => status === 'PREPARING')) return 'PREPARING';
    if (statuses.some((status) => status === 'SHIPPED')) return 'SHIPPED';
    if (statuses.some((status) => status === 'DELIVERED')) return 'DELIVERED';
    if (statuses.every((status) => status === 'COMPLETED' || status === 'REJECTED' || status === 'CANCELLED')) {
      return 'COMPLETED';
    }
    if (statuses.some((status) => status === 'ACCEPTED')) return 'ACCEPTED';
    return 'TO_ACCEPT';
  }
}