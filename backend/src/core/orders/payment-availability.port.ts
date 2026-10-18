import { PaymentMethod } from './order.types';

export const PAYMENT_AVAILABILITY = Symbol('PAYMENT_AVAILABILITY');

export interface PaymentAvailabilityPort {
  assertAvailable(method: PaymentMethod): void;
}