import * as assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { test } from 'node:test';
import { PrismaClient } from '@prisma/client';
import { apiRequest, login } from './api-test-helpers';

const prisma = new PrismaClient();

test('checkout client, données vendeur isolées et transitions', async () => {
  const clientToken = await login('qa.client@malickbuss.sn');
  const vendorToken = await login('qa.vendor@malickbuss.sn');
  const adminToken = await login('qa.admin@malickbuss.sn', '/admin/auth/login');
  const shop = await prisma.shop.findUniqueOrThrow({ where: { slug: 'qa-boutique-test' } });
  const product = await prisma.product.findFirstOrThrow({
    where: { shop: { slug: 'qa-boutique-test' }, isPublished: true },
  });
  const originalStock = product.stockQuantity;
  const originalReserved = product.reservedQuantity;
  let orderId: string | undefined;
  let withdrawalId: string | undefined;
  let subOrderIds: string[] = [];
  const createdProductIds: string[] = [];

  try {
    const certifiedProduct = await apiRequest('POST', '/products', {
      token: vendorToken,
      body: {
        shopId: shop.id,
        title: `Produit boutique active ${randomUUID()}`,
        category: 'Accessoires',
        imageUrl: 'https://images.example.test/product.jpg',
        additionalImageUrls: ['https://images.example.test/product-detail.jpg'],
        basePrice: 12500,
        stockQuantity: 4,
      },
    });
    assert.equal(certifiedProduct.status, 201);
    assert.equal(certifiedProduct.data.isPublished, true);
    assert.equal(certifiedProduct.data.category, 'Accessoires');
    assert.equal(certifiedProduct.data.imageUrl, 'https://images.example.test/product.jpg');
    createdProductIds.push(certifiedProduct.data.id);

    assert.equal((await apiRequest('POST', '/products', {
      token: clientToken,
      body: { shopId: shop.id, title: 'Refus client', basePrice: 1000, stockQuantity: 1 },
    })).status, 403);

    await prisma.shop.update({ where: { id: shop.id }, data: { status: 'PENDING_VERIFICATION' } });
    const pendingProduct = await apiRequest('POST', '/products', {
      token: vendorToken,
      body: {
        shopId: shop.id,
        title: `Produit boutique en attente ${randomUUID()}`,
        basePrice: 15000,
        stockQuantity: 2,
      },
    });
    assert.equal(pendingProduct.status, 201);
    assert.equal(pendingProduct.data.isPublished, false);
    createdProductIds.push(pendingProduct.data.id);
    await prisma.shop.update({ where: { id: shop.id }, data: { status: 'ACTIVE' } });
    const publishedProducts = await apiRequest('GET', '/products?shopSlug=qa-boutique-test');
    assert.ok(!publishedProducts.data.some((item: { id: string }) => item.id === pendingProduct.data.id));
    assert.equal((await apiRequest('GET', `/products/${pendingProduct.data.id}`)).status, 404);

    const checkout = await apiRequest('POST', '/orders/checkout', {
      token: clientToken,
      headers: { 'Idempotency-Key': `api-test-${randomUUID()}` },
      body: {
        paymentMethod: 'CASH_ON_DELIVERY',
        shippingAddress: {
          recipientName: 'Client QA',
          phoneNumber: '+221773456789',
          region: 'Dakar',
          city: 'Dakar',
          addressLine: 'Rue 10, Médina',
        },
        items: [{ productId: product.id, quantity: 1 }],
      },
    });
    assert.equal(checkout.status, 201);
    orderId = checkout.data.id;
    subOrderIds = checkout.data.subOrders.map((item: { id: string }) => item.id);
    const subOrder = checkout.data.subOrders[0];
    assert.ok(orderId && subOrder);
    assert.equal(subOrder.status, 'TO_ACCEPT');

    assert.equal((await apiRequest('GET', '/orders/me', { token: clientToken })).status, 200);
    assert.equal((await apiRequest('GET', `/orders/me/${orderId}`, { token: clientToken })).status, 200);
    assert.equal((await apiRequest('GET', '/orders/vendor/sub-orders', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', `/orders/vendor/sub-orders/${subOrder.id}`, { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/orders/vendor/dashboard', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/orders/vendor/commissions', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/orders/vendor/balance', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/orders/vendor/withdrawals', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/sub-orders/vendor', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/commissions/vendor/overview', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/commissions/vendor/history', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/deliveries/vendor/overview', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/disputes/overview', { token: vendorToken })).status, 200);
    assert.equal((await apiRequest('GET', '/notifications/recent', { token: vendorToken })).status, 200);

    for (const status of ['ACCEPTED', 'PREPARING', 'SHIPPED']) {
      const transition = await apiRequest('PATCH', `/orders/vendor/sub-orders/${subOrder.id}/status`, {
        token: vendorToken,
        body: { status },
      });
      assert.equal(transition.status, 200, `Transition vers ${status}`);
      assert.equal(transition.data.status, status);
    }

    const withdrawal = await apiRequest('POST', '/orders/vendor/withdrawals', {
      token: vendorToken,
      body: { shopId: subOrder.shop.id, amount: 1, paymentMethod: 'WAVE', notes: 'API test temporaire' },
    });
    assert.equal(withdrawal.status, 201);
    withdrawalId = withdrawal.data.id;
    assert.equal((await apiRequest('GET', '/orders/vendor/withdrawals', { token: vendorToken })).status, 200);
  } finally {
    await prisma.shop.update({ where: { id: shop.id }, data: { status: 'ACTIVE' } });
    if (createdProductIds.length) {
      await prisma.product.deleteMany({ where: { id: { in: createdProductIds } } });
    }
    if (withdrawalId) {
      await prisma.withdrawalAuditLog.deleteMany({ where: { withdrawalRequestId: withdrawalId } });
      await prisma.withdrawalRequest.delete({ where: { id: withdrawalId } });
    }
    if (orderId) {
      await prisma.orderStatusHistory.deleteMany({ where: { subOrderId: { in: subOrderIds } } });
      await prisma.commissionLedger.deleteMany({ where: { subOrderId: { in: subOrderIds } } });
      await prisma.orderItem.deleteMany({ where: { subOrderId: { in: subOrderIds } } });
      await prisma.stockMovement.deleteMany({ where: { orderId } });
      await prisma.outboxEvent.deleteMany({ where: { aggregateId: orderId } });
      await prisma.subOrder.deleteMany({ where: { id: { in: subOrderIds } } });
      await prisma.order.delete({ where: { id: orderId } });
    }
    await prisma.product.update({
      where: { id: product.id },
      data: { stockQuantity: originalStock, reservedQuantity: originalReserved },
    });
    await prisma.$disconnect();
  }
});
