import { OrderStatus as PrismaOrderStatus, PaymentMethod as PrismaPaymentMethod, PaymentStatus as PrismaPaymentStatus, Prisma } from '@prisma/client';
import {
  OrderView,
  ShippingAddressSnapshot,
  SubOrderView,
  VendorSubOrderView,
} from '../../core/orders/order.types';

export const ORDER_WITH_LINES = {
  subOrders: {
    include: {
      shop: { select: { id: true, name: true } },
      items: true,
    },
    orderBy: { createdAt: 'asc' },
  },
} satisfies Prisma.OrderInclude;

export const VENDOR_SUB_ORDER_WITH_LINES = {
  shop: { select: { id: true, name: true } },
  items: true,
  order: {
    select: {
      id: true,
      orderNumber: true,
      paymentMethod: true,
      paymentStatus: true,
      shippingAddressSnapshot: true,
    },
  },
} satisfies Prisma.SubOrderInclude;

export type PrismaOrderWithLines = Prisma.OrderGetPayload<{ include: typeof ORDER_WITH_LINES }>;
export type PrismaVendorSubOrderWithLines = Prisma.SubOrderGetPayload<{
  include: typeof VENDOR_SUB_ORDER_WITH_LINES;
}>;

const asAmount = (amount: Prisma.Decimal): number => Number(amount);

function toSubOrderView(subOrder: PrismaOrderWithLines['subOrders'][number]): SubOrderView {
  return {
    id: subOrder.id,
    orderNumber: subOrder.subOrderNumber,
    shopId: subOrder.shop.id,
    shopName: subOrder.shop.name,
    status: subOrder.status,
    subtotal: asAmount(subOrder.subtotalItems),
    shippingFee: asAmount(subOrder.shippingFee),
    total: asAmount(subOrder.totalAmount),
    createdAt: subOrder.createdAt.toISOString(),
    items: subOrder.items.map((item) => ({
      productId: item.productId,
      title: item.productTitleSnapshot,
      unitPrice: asAmount(item.unitPriceSnapshot),
      quantity: item.quantity,
      total: asAmount(item.totalLinePrice),
    })),
  };
}

export function mapPrismaOrder(order: PrismaOrderWithLines): OrderView {
  const address = order.shippingAddressSnapshot;
  if (!address || typeof address !== 'object' || Array.isArray(address)) {
    throw new Error(`Adresse de livraison invalide pour la commande ${order.orderNumber}.`);
  }

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status as PrismaOrderStatus,
    paymentMethod: order.paymentMethod as PrismaPaymentMethod,
    paymentStatus: order.paymentStatus as PrismaPaymentStatus,
    total: asAmount(order.grandTotal),
    shippingAddress: {
      recipientName: String(address.recipientName ?? ''),
      phoneNumber: String(address.phoneNumber ?? ''),
      region: String(address.region ?? ''),
      city: String(address.city ?? ''),
      addressLine: String(address.addressLine ?? ''),
      ...(typeof address.instructions === 'string' ? { instructions: address.instructions } : {}),
    } satisfies ShippingAddressSnapshot,
    subOrders: order.subOrders.map(toSubOrderView),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  };
}

export function mapPrismaVendorSubOrder(subOrder: PrismaVendorSubOrderWithLines): VendorSubOrderView {
  const address = subOrder.order.shippingAddressSnapshot;
  if (!address || typeof address !== 'object' || Array.isArray(address)) {
    throw new Error(`Adresse de livraison invalide pour la commande ${subOrder.order.orderNumber}.`);
  }

  return {
    id: subOrder.id,
    orderId: subOrder.orderId,
    orderNumber: subOrder.order.orderNumber,
    shopId: subOrder.shop.id,
    shopName: subOrder.shop.name,
    status: subOrder.status as PrismaOrderStatus,
    subtotal: asAmount(subOrder.subtotalItems),
    shippingFee: asAmount(subOrder.shippingFee),
    total: asAmount(subOrder.totalAmount),
    paymentMethod: subOrder.order.paymentMethod as PrismaPaymentMethod,
    paymentStatus: subOrder.order.paymentStatus as PrismaPaymentStatus,
    shippingAddress: {
      recipientName: String(address.recipientName ?? ''),
      phoneNumber: String(address.phoneNumber ?? ''),
      region: String(address.region ?? ''),
      city: String(address.city ?? ''),
      addressLine: String(address.addressLine ?? ''),
      ...(typeof address.instructions === 'string' ? { instructions: address.instructions } : {}),
    },
    createdAt: subOrder.createdAt.toISOString(),
    items: subOrder.items.map((item) => ({
      productId: item.productId,
      title: item.productTitleSnapshot,
      unitPrice: asAmount(item.unitPriceSnapshot),
      quantity: item.quantity,
      total: asAmount(item.totalLinePrice),
    })),
  };
}