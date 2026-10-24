import * as assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { test } from 'node:test';
import { PrismaClient } from '@prisma/client';
import { apiRequest, login, testPassword } from './api-test-helpers';

const prisma = new PrismaClient();

test('authentification, rôles et routes publiques', async () => {
  const clientToken = await login('qa.client@malickbuss.sn');
  const adminToken = await login('qa.admin@malickbuss.sn', '/admin/auth/login');
  const registrationEmail = `api-test-${randomUUID()}@example.test`;
  let registeredUserId: string | undefined;

  try {
    for (const [method, path] of [
      ['GET', '/shops'],
      ['GET', '/shops/qa-boutique-test'],
      ['GET', '/products?shopSlug=qa-boutique-test'],
      ['GET', '/categories'],
    ]) {
      assert.equal((await apiRequest(method, path)).status, 200, `${method} ${path}`);
    }

    const products = await apiRequest('GET', '/products?shopSlug=qa-boutique-test');
    const productId = products.data[0].id as string;
    assert.equal((await apiRequest('GET', `/products/${productId}`)).status, 200);

    const registration = await apiRequest('POST', '/auth/register', {
      body: {
        fullName: 'API Test User',
        phoneNumber: `+221770${String(Date.now()).slice(-6)}`,
        email: registrationEmail,
        password: testPassword,
        role: 'CLIENT',
      },
    });
    assert.equal(registration.status, 201);
    registeredUserId = registration.data.user.id;
    assert.ok(registration.data.accessToken);

    const currentUser = await apiRequest('GET', '/auth/me', { token: clientToken });
    assert.equal(currentUser.status, 200);
    assert.equal(currentUser.data.role, 'CLIENT');
    assert.equal((await apiRequest('GET', '/users/me', { token: clientToken })).status, 200);
    assert.equal((await apiRequest('GET', '/cart/summary', { token: clientToken })).status, 200);

    assert.equal((await apiRequest('GET', '/orders/me')).status, 401);
    assert.equal((await apiRequest('GET', '/admin/dashboard', { token: clientToken })).status, 403);
    assert.equal((await apiRequest('GET', '/admin/dashboard', { token: adminToken })).status, 200);
    assert.equal((await apiRequest('POST', '/auth/login', {
      body: { identity: 'missing@example.test', password: 'WrongPassword2026!' },
    })).status, 401);
    assert.equal((await apiRequest('POST', '/auth/register', {
      body: {
        fullName: 'Escalade de rôle',
        phoneNumber: `+221770${String(Date.now() + 1).slice(-6)}`,
        email: `role-test-${randomUUID()}@example.test`,
        password: testPassword,
        role: 'SUPER_ADMIN',
      },
    })).status, 400);
  } finally {
    if (registeredUserId) await prisma.user.delete({ where: { id: registeredUserId } });
    await prisma.$disconnect();
  }
});

test('création et accès isolé aux boutiques vendeur', async () => {
  const suffix = randomUUID();
  const registration = await apiRequest('POST', '/auth/register', {
    body: {
      fullName: 'Vendeur Boutique API',
      phoneNumber: `+22177${suffix.replace(/\D/g, '').slice(0, 8)}`,
      email: `vendor-shop-${suffix}@example.test`,
      password: testPassword,
      role: 'VENDOR',
    },
  });
  assert.equal(registration.status, 201);
  const vendorToken = registration.data.accessToken as string;
  const vendorId = registration.data.user.id as string;
  let shopId: string | undefined;

  try {
    const createdShop = await apiRequest('POST', '/shops', {
      token: vendorToken,
      body: { name: 'Boutique API en attente', description: 'Demande de certification test.' },
    });
    assert.equal(createdShop.status, 201);
    assert.equal(createdShop.data.status, 'PENDING_VERIFICATION');
    assert.equal(createdShop.data.ownerId, vendorId);
    shopId = createdShop.data.id;

    const ownShops = await apiRequest('GET', '/shops/vendor/me', { token: vendorToken });
    assert.equal(ownShops.status, 200);
    assert.ok(ownShops.data.some((shop: { id: string }) => shop.id === shopId));

    const clientToken = await login('qa.client@malickbuss.sn');
    assert.equal((await apiRequest('GET', '/shops/vendor/me', { token: clientToken })).status, 403);
    assert.equal((await apiRequest('POST', '/shops', {
      token: clientToken,
      body: { name: 'Boutique interdite' },
    })).status, 403);
  } finally {
    if (shopId) await prisma.shop.delete({ where: { id: shopId } });
    await prisma.user.delete({ where: { id: vendorId } });
  }
});
