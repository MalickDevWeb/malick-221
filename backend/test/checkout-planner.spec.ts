import * as assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildCheckoutPlan } from '../src/core/orders/checkout-planner';
import { OrderError } from '../src/core/orders/order.errors';
import { CheckoutProduct } from '../src/core/orders/order.types';

const products: CheckoutProduct[] = [
  {
    id: 'product-a',
    shopId: 'shop-a',
    shopName: 'Boutique A',
    isShopActive: true,
    isPublished: true,
    title: 'Chemise',
    basePrice: 12_000,
    discountPrice: 10_000,
    availableStock: 3,
  },
  {
    id: 'product-b',
    shopId: 'shop-b',
    shopName: 'Boutique B',
    isShopActive: true,
    isPublished: true,
    title: 'Sac',
    basePrice: 20_000,
    discountPrice: null,
    availableStock: 3,
  },
];

const pricing = {
  commissionRatePercent: 10,
  shippingFeePerShop: 3_000,
  stockReservationMinutes: 15,
};

test('splits a multi-shop basket and excludes shipping from commission', () => {
  const plan = buildCheckoutPlan({
    items: [
      { productId: 'product-a', quantity: 1 },
      { productId: 'product-b', quantity: 2 },
    ],
  }, products, pricing);

  assert.equal(plan.subOrders.length, 2);
  assert.equal(plan.subOrders[0].commissionAmount, 1_000);
  assert.equal(plan.subOrders[0].totalAmount, 13_000);
  assert.equal(plan.subOrders[1].commissionAmount, 4_000);
  assert.equal(plan.grandTotal, 56_000);
});

test('rejects unpublished products and insufficient stock', () => {
  assert.throws(
    () => buildCheckoutPlan({ items: [{ productId: 'product-a', quantity: 1 }] }, [
      { ...products[0], isPublished: false },
    ], pricing),
    (error: unknown) => error instanceof OrderError && error.code === 'PRODUCT_NOT_AVAILABLE',
  );
  assert.throws(
    () => buildCheckoutPlan({ items: [{ productId: 'product-a', quantity: 4 }] }, products, pricing),
    (error: unknown) => error instanceof OrderError && error.code === 'INSUFFICIENT_STOCK',
  );
});

test('rejects invalid amounts and pricing configuration', () => {
  assert.throws(
    () => buildCheckoutPlan({ items: [{ productId: 'product-a', quantity: 1 }] }, [
      { ...products[0], discountPrice: 10_000.5 },
    ], pricing),
    (error: unknown) => error instanceof OrderError && error.code === 'CHECKOUT_CONFIGURATION_INVALID',
  );
  assert.throws(
    () => buildCheckoutPlan({ items: [] }, products, pricing),
    (error: unknown) => error instanceof OrderError && error.code === 'INVALID_CHECKOUT',
  );
});