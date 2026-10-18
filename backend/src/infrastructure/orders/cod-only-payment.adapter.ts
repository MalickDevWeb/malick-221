import { Injectable } from '@nestjs/common';
import { OrderError } from '../../core/orders/order.errors';
import { PaymentAvailabilityPort } from '../../core/orders/payment-availability.port';
import { PaymentMethod } from '../../core/orders/order.types';

@Injectable()
export class CodOnlyPaymentAdapter implements PaymentAvailabilityPort {
  assertAvailable(method: PaymentMethod): void {
    if (method !== 'CASH_ON_DELIVERY') {
      throw new OrderError(
        'PAYMENT_PROVIDER_UNAVAILABLE',
        'Le paiement mobile n’est pas configuré. Choisissez le paiement à la livraison.',
      );
    }
  }
}