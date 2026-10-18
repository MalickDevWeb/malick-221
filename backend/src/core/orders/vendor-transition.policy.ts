import { OrderError } from './order.errors';
import { OrderStatus, PaymentMethod, PaymentStatus, VendorSubOrderStatus } from './order.types';

export function canAccrueCommission(
  current: OrderStatus,
  paymentStatus: PaymentStatus,
): boolean {
  return current === 'ACCEPTED' && paymentStatus === 'SUCCESS';
}

export function assertCommissionEligibility(
  current: OrderStatus,
  paymentStatus: PaymentStatus,
): void {
  if (!canAccrueCommission(current, paymentStatus)) {
    throw new OrderError(
      'PAYMENT_NOT_CONFIRMED',
      'La commission ne peut pas être calculée avant qu’une vente soit validée et confirmée.',
    );
  }
}

export function resolveCommissionStatusForTransition(nextStatus: VendorSubOrderStatus): 'PROVISIONAL' | 'EARNED' | 'DISPUTED_HOLD' {
  if (nextStatus === 'REJECTED') return 'DISPUTED_HOLD';
  if (nextStatus === 'SHIPPED') return 'EARNED';
  return 'PROVISIONAL';
}

export function assertVendorTransition(
  current: OrderStatus,
  paymentMethod: PaymentMethod,
  paymentStatus: PaymentStatus,
  next: VendorSubOrderStatus,
): void {
  const canStart = paymentMethod === 'CASH_ON_DELIVERY'
    ? current === 'TO_ACCEPT'
    : current === 'PAID' && paymentStatus === 'SUCCESS';

  if (next === 'REJECTED' && paymentStatus === 'SUCCESS') {
    throw new OrderError('PAYMENT_REFUND_REQUIRED', 'Un remboursement vérifié doit être effectué avant le refus de cette commande.');
  }

  if (next === 'ACCEPTED' && canStart) return;
  if (next === 'REJECTED' && canStart) return;
  if (next === 'PREPARING' && current === 'ACCEPTED') return;
  if (next === 'SHIPPED' && current === 'PREPARING') return;

  if (current === 'PENDING_PAYMENT') {
    throw new OrderError('PAYMENT_NOT_CONFIRMED', 'La commande ne peut pas être traitée avant la confirmation du paiement.');
  }
  throw new OrderError('INVALID_TRANSITION', `Transition vendeur interdite : ${current} vers ${next}.`);
}