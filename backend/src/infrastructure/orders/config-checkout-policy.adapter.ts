import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CheckoutPolicyPort } from '../../core/orders/checkout-policy.port';
import { CheckoutPricingPolicy } from '../../core/orders/order.types';

@Injectable()
export class ConfigCheckoutPolicyAdapter implements CheckoutPolicyPort {
  constructor(private readonly config: ConfigService) {}

  getPricingPolicy(): CheckoutPricingPolicy {
    return {
      commissionRatePercent: this.readNumber('DEFAULT_COMMISSION_PERCENTAGE', 10),
      shippingFeePerShop: this.readNumber('DEFAULT_SHIPPING_FEE_PER_SHOP', 3000),
      stockReservationMinutes: this.readNumber('STOCK_RESERVATION_MINUTES', 15),
    };
  }

  private readNumber(key: string, fallback: number): number {
    const value = this.config.get<string>(key);
    if (value === undefined || value === '') return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : Number.NaN;
  }
}