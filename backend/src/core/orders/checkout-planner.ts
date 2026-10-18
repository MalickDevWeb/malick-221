import { CheckoutPlan, CheckoutPricingPolicy, CheckoutProduct, CreateCheckoutCommand, PlannedSubOrder } from './order.types';
import { OrderError } from './order.errors';

export function buildCheckoutPlan(
  command: Pick<CreateCheckoutCommand, 'items'>,
  products: CheckoutProduct[],
  pricing: CheckoutPricingPolicy,
): CheckoutPlan {
  if (!command.items.length || command.items.length > 100) {
    throw new OrderError('INVALID_CHECKOUT', 'La commande doit contenir entre 1 et 100 lignes.');
  }
  if (!Number.isFinite(pricing.commissionRatePercent)
    || pricing.commissionRatePercent < 0
    || pricing.commissionRatePercent > 100
    || !Number.isSafeInteger(pricing.shippingFeePerShop)
    || pricing.shippingFeePerShop < 0
    || !Number.isSafeInteger(pricing.stockReservationMinutes)
    || pricing.stockReservationMinutes < 1
    || pricing.stockReservationMinutes > 60) {
    throw new OrderError('CHECKOUT_CONFIGURATION_INVALID', 'La politique de livraison ou de commission est invalide.');
  }

  const productsById = new Map(products.map((product) => [product.id, product]));
  const grouped = new Map<string, PlannedSubOrder>();

  for (const line of command.items) {
    if (!Number.isSafeInteger(line.quantity) || line.quantity < 1 || line.quantity > 100) {
      throw new OrderError('INVALID_CHECKOUT', 'Une quantité de produit est invalide.');
    }

    const product = productsById.get(line.productId);
    if (!product || !product.isPublished || !product.isShopActive) {
      throw new OrderError('PRODUCT_NOT_AVAILABLE', `Le produit ${line.productId} n'est plus disponible.`);
    }
    if (!Number.isSafeInteger(product.availableStock) || product.availableStock < line.quantity) {
      throw new OrderError('INSUFFICIENT_STOCK', `Le stock demandé pour « ${product.title} » n'est plus disponible.`);
    }

    const unitPrice = product.discountPrice !== null
      ? product.discountPrice
      : product.basePrice;
    if (!Number.isSafeInteger(unitPrice) || unitPrice < 0) {
      throw new OrderError('CHECKOUT_CONFIGURATION_INVALID', `Le prix du produit « ${product.title} » n'est pas valide.`);
    }

    let subOrder = grouped.get(product.shopId);
    if (!subOrder) {
      subOrder = {
        shopId: product.shopId,
        shopName: product.shopName,
        items: [],
        subtotalItems: 0,
        shippingFee: pricing.shippingFeePerShop,
        totalAmount: 0,
        commissionRate: pricing.commissionRatePercent,
        commissionAmount: 0,
        vendorNetEarning: 0,
      };
      grouped.set(product.shopId, subOrder);
    }

    const lineTotal = unitPrice * line.quantity;
    if (!Number.isSafeInteger(lineTotal)) {
      throw new OrderError('INVALID_CHECKOUT', 'Le montant de la commande dépasse la limite autorisée.');
    }
    subOrder.items.push({
      productId: product.id,
      title: product.title,
      quantity: line.quantity,
      unitPrice,
      lineTotal,
    });
    subOrder.subtotalItems += lineTotal;
  }

  const subOrders = [...grouped.values()];
  for (const subOrder of subOrders) {
    subOrder.commissionAmount = Math.round(subOrder.subtotalItems * subOrder.commissionRate / 100);
    subOrder.vendorNetEarning = subOrder.subtotalItems - subOrder.commissionAmount;
    subOrder.totalAmount = subOrder.subtotalItems + subOrder.shippingFee;
  }

  const grandTotal = subOrders.reduce((total, subOrder) => total + subOrder.totalAmount, 0);
  if (!Number.isSafeInteger(grandTotal)) {
    throw new OrderError('INVALID_CHECKOUT', 'Le montant de la commande dépasse la limite autorisée.');
  }

  return { subOrders, grandTotal };
}