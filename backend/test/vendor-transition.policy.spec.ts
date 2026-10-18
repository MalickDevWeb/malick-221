import * as assert from 'node:assert/strict';
import { test } from 'node:test';
import { OrderError } from '../src/core/orders/order.errors';
import {
  assertCommissionEligibility,
  assertVendorTransition,
  canAccrueCommission,
  resolveCommissionStatusForTransition,
} from '../src/core/orders/vendor-transition.policy';

test('allows COD orders to be accepted before collection', () => {
  assert.doesNotThrow(() => assertVendorTransition('TO_ACCEPT', 'CASH_ON_DELIVERY', 'PENDING', 'ACCEPTED'));
});

test('requires a successful online payment before vendor acceptance', () => {
  assert.throws(
    () => assertVendorTransition('PENDING_PAYMENT', 'WAVE', 'PENDING', 'ACCEPTED'),
    (error: unknown) => error instanceof OrderError && error.code === 'PAYMENT_NOT_CONFIRMED',
  );
});

test('requires a refund before rejecting a paid order', () => {
  assert.throws(
    () => assertVendorTransition('PAID', 'WAVE', 'SUCCESS', 'REJECTED'),
    (error: unknown) => error instanceof OrderError && error.code === 'PAYMENT_REFUND_REQUIRED',
  );
});

test('only advances accepted orders into preparation and shipment', () => {
  assert.doesNotThrow(() => assertVendorTransition('ACCEPTED', 'CASH_ON_DELIVERY', 'PENDING', 'PREPARING'));
  assert.doesNotThrow(() => assertVendorTransition('PREPARING', 'CASH_ON_DELIVERY', 'PENDING', 'SHIPPED'));
  assert.throws(
    () => assertVendorTransition('TO_ACCEPT', 'CASH_ON_DELIVERY', 'PENDING', 'SHIPPED'),
    (error: unknown) => error instanceof OrderError && error.code === 'INVALID_TRANSITION',
  );
});

test('requires a vendor validation before a commission can be earned', () => {
  assert.equal(canAccrueCommission('TO_ACCEPT', 'SUCCESS'), false);
  assert.equal(canAccrueCommission('ACCEPTED', 'SUCCESS'), true);
  assert.equal(resolveCommissionStatusForTransition('ACCEPTED'), 'PROVISIONAL');
  assert.equal(resolveCommissionStatusForTransition('SHIPPED'), 'EARNED');
  assert.equal(resolveCommissionStatusForTransition('REJECTED'), 'DISPUTED_HOLD');
  assert.throws(
    () => assertCommissionEligibility('TO_ACCEPT', 'SUCCESS'),
    (error: unknown) => error instanceof OrderError && error.code === 'PAYMENT_NOT_CONFIRMED',
  );
});