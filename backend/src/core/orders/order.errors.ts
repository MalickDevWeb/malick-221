export type OrderErrorCode =
  | 'INVALID_CHECKOUT'
  | 'PRODUCT_NOT_AVAILABLE'
  | 'INSUFFICIENT_STOCK'
  | 'IDEMPOTENCY_CONFLICT'
  | 'ORDER_NOT_FOUND'
  | 'FORBIDDEN'
  | 'INVALID_TRANSITION'
  | 'PAYMENT_NOT_CONFIRMED'
  | 'PAYMENT_REFUND_REQUIRED'
  | 'PAYMENT_PROVIDER_UNAVAILABLE'
  | 'CHECKOUT_CONFIGURATION_INVALID';

export class OrderError extends Error {
  constructor(
    public readonly code: OrderErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'OrderError';
  }
}