import { Module } from '@nestjs/common';
import { OrdersApplicationService } from '../../application/orders/orders.application.service';
import { StockReservationExpiryWorker } from '../../application/orders/stock-reservation-expiry.worker';
import { CHECKOUT_POLICY } from '../../core/orders/checkout-policy.port';
import { ORDERS_REPOSITORY } from '../../core/orders/order.repository';
import { PAYMENT_AVAILABILITY } from '../../core/orders/payment-availability.port';
import { AuthModule } from '../../common/auth/auth.module';
import { ConfigCheckoutPolicyAdapter } from '../../infrastructure/orders/config-checkout-policy.adapter';
import { PrismaOrdersRepository } from '../../infrastructure/orders/prisma-orders.repository';
import { CodOnlyPaymentAdapter } from '../../infrastructure/orders/cod-only-payment.adapter';
import { OrdersController } from './orders.controller';

@Module({
  imports: [AuthModule],
  controllers: [OrdersController],
  providers: [
    OrdersApplicationService,
    StockReservationExpiryWorker,
    PrismaOrdersRepository,
    ConfigCheckoutPolicyAdapter,
    CodOnlyPaymentAdapter,
    { provide: ORDERS_REPOSITORY, useExisting: PrismaOrdersRepository },
    { provide: CHECKOUT_POLICY, useExisting: ConfigCheckoutPolicyAdapter },
    { provide: PAYMENT_AVAILABILITY, useExisting: CodOnlyPaymentAdapter },
  ],
  exports: [OrdersApplicationService],
})
export class OrdersModule {}