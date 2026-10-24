import * as assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { test } from 'node:test';
import { PrismaClient } from '@prisma/client';
import { apiRequest, login } from './api-test-helpers';

const prisma = new PrismaClient();

test('administration, retraits et webhook de paiement simulé', async () => {
  const adminToken = await login('qa.admin@malickbuss.sn', '/admin/auth/login');
  const shop = await prisma.shop.findUniqueOrThrow({ where: { slug: 'qa-boutique-test' } });
  const vendor = await prisma.user.findUniqueOrThrow({ where: { email: 'qa.vendor@malickbuss.sn' } });
  const product = await prisma.product.findFirstOrThrow({
    where: { shopId: shop.id, slug: 'article-test-api' },
  });
  const withdrawal = await prisma.withdrawalRequest.create({
    data: {
      shopId: shop.id,
      vendorId: vendor.id,
      amount: 1,
      fee: 0,
      paymentMethod: 'WAVE',
      status: 'PENDING',
      notes: `API test ${randomUUID()}`,
    },
  });

  try {
    assert.equal((await apiRequest('GET', '/admin/dashboard', { token: adminToken })).status, 200);
    const adminProducts = await apiRequest('GET', '/admin/products', { token: adminToken });
    assert.equal(adminProducts.status, 200);
    assert.ok(adminProducts.data.some((item: { id: string }) => item.id === product.id));

    const hiddenProduct = await apiRequest('PATCH', `/admin/products/${product.id}/visibility`, {
      token: adminToken,
      body: { isPublished: false, reason: 'Validation API de modération' },
    });
    assert.equal(hiddenProduct.status, 200);
    assert.equal(hiddenProduct.data.isPublished, false);
    assert.equal(hiddenProduct.data.shop.owner.fullName, vendor.fullName);
    const publicProducts = await apiRequest('GET', '/products?shopSlug=qa-boutique-test');
    assert.ok(!publicProducts.data.some((item: { id: string }) => item.id === product.id));
    assert.equal((await apiRequest('GET', `/products/${product.id}`)).status, 404);

    const visibleProduct = await apiRequest('PATCH', `/admin/products/${product.id}/visibility`, {
      token: adminToken,
      body: { isPublished: true, reason: 'Fin de validation API de modération' },
    });
    assert.equal(visibleProduct.status, 200);
    assert.equal((await apiRequest('GET', `/products/${product.id}`)).status, 200);

    assert.equal((await apiRequest('GET', '/admin/shops', { token: adminToken })).status, 200);
    assert.equal((await apiRequest('PATCH', `/admin/shops/${shop.id}/status`, {
      token: adminToken,
      body: { status: 'ACTIVE' },
    })).status, 200);

    assert.equal((await apiRequest('GET', '/admin/withdrawals', { token: adminToken })).status, 200);
    assert.equal((await apiRequest('GET', `/admin/withdrawals/${withdrawal.id}/audit`, { token: adminToken })).status, 200);
    const approved = await apiRequest('PATCH', `/admin/withdrawals/${withdrawal.id}/status`, {
      token: adminToken,
      body: { status: 'APPROVED' },
    });
    assert.equal(approved.status, 200);

    const payout = await apiRequest('POST', `/admin/withdrawals/${withdrawal.id}/process`, {
      token: adminToken,
    });
    assert.equal(payout.status, 201);
    assert.equal(payout.data.status, 'PROCESSING');

    const confirmation = await apiRequest('POST', `/admin/withdrawals/${withdrawal.id}/confirm`, {
      token: adminToken,
    });
    assert.equal(confirmation.status, 201);
    assert.equal(confirmation.data.confirmed, false, 'La gateway simulée attend une confirmation externe.');

    const webhook = await apiRequest('POST', '/payments/webhooks/wave', {
      body: { reference: `missing-${randomUUID()}`, status: 'CONFIRMED' },
    });
    assert.equal(webhook.status, 201);
    assert.equal(webhook.data.success, false, 'La référence inconnue ne clôture pas un retrait.');
  } finally {
    await prisma.product.update({ where: { id: product.id }, data: { isPublished: true } });
    await prisma.withdrawalAuditLog.deleteMany({ where: { withdrawalRequestId: withdrawal.id } });
    await prisma.withdrawalRequest.delete({ where: { id: withdrawal.id } });
    await prisma.$disconnect();
  }
});
