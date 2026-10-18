import { OrderView, VendorSubOrderView } from '../../core/orders/order.types';

export class OrdersResponseMapper {
  static toClientOrder(order: OrderView) {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      payment: {
        method: order.paymentMethod,
        status: order.paymentStatus,
      },
      total: order.total,
      shippingAddress: order.shippingAddress,
      subOrders: order.subOrders.map((subOrder) => ({
        id: subOrder.id,
        orderNumber: subOrder.orderNumber,
        shop: { id: subOrder.shopId, name: subOrder.shopName },
        status: subOrder.status,
        subtotal: subOrder.subtotal,
        shippingFee: subOrder.shippingFee,
        total: subOrder.total,
        items: subOrder.items,
        createdAt: subOrder.createdAt,
      })),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  static toVendorSubOrder(subOrder: VendorSubOrderView) {
    return {
      id: subOrder.id,
      orderId: subOrder.orderId,
      orderNumber: subOrder.orderNumber,
      shop: { id: subOrder.shopId, name: subOrder.shopName },
      status: subOrder.status,
      payment: {
        method: subOrder.paymentMethod,
        status: subOrder.paymentStatus,
      },
      shippingAddress: subOrder.shippingAddress,
      subtotal: subOrder.subtotal,
      shippingFee: subOrder.shippingFee,
      total: subOrder.total,
      items: subOrder.items,
      createdAt: subOrder.createdAt,
    };
  }
}