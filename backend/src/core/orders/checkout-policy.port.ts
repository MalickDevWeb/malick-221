import { CheckoutPricingPolicy } from './order.types';

export const CHECKOUT_POLICY = Symbol('CHECKOUT_POLICY');

export interface CheckoutPolicyPort {
  getPricingPolicy(): CheckoutPricingPolicy;
}