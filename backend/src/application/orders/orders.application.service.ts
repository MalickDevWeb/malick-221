import { createHash, randomUUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { CheckoutPolicyPort, CHECKOUT_POLICY } from '../../core/orders/checkout-policy.port';
import { OrderError } from '../../core/orders/order.errors';
import { PAYMENT_AVAILABILITY, PaymentAvailabilityPort } from '../../core/orders/payment-availability.port';
import { ORDERS_REPOSITORY, OrdersRepository } from '../../core/orders/order.repository';
import {
  CreateCheckoutCommand,
  OrderView,
  VendorBalanceSummary,
  VendorCommissionLedgerEntry,
  VendorDashboardSummary,
  VendorSubOrderStatus,
  VendorSubOrderView,
  VendorWithdrawalRequestView,
} from '../../core/orders/order.types';

@Injectable()
export class OrdersApplicationService {
  constructor(
    @Inject(ORDERS_REPOSITORY) private readonly orders: OrdersRepository,
    @Inject(CHECKOUT_POLICY) private readonly checkoutPolicy: CheckoutPolicyPort,
    @Inject(PAYMENT_AVAILABILITY) private readonly paymentAvailability: PaymentAvailabilityPort,
  ) {}

  async createCheckout(
    clientId: string,
    idempotencyKey: string,
    input: Omit<CreateCheckoutCommand, 'clientId' | 'idempotencyKey'>,
  ): Promise<OrderView> {
    if (!idempotencyKey || idempotencyKey.length > 128) {
      throw new OrderError('INVALID_CHECKOUT', 'Un en-tête Idempotency-Key valide est obligatoire.');
    }
    this.paymentAvailability.assertAvailable(input.paymentMethod);

    const combinedItems = new Map<string, number>();
    for (const item of input.items) {
      combinedItems.set(item.productId, (combinedItems.get(item.productId) ?? 0) + item.quantity);
    }
    const items = [...combinedItems.entries()]
      .map(([productId, quantity]) => ({ productId, quantity }))
      .sort((left, right) => left.productId.localeCompare(right.productId));
    const command: CreateCheckoutCommand = {
      ...input,
      clientId,
      idempotencyKey,
      items,
    };
    const canonicalRequest = JSON.stringify({
      paymentMethod: command.paymentMethod,
      shippingAddress: command.shippingAddress,
      items: command.items,
    });
    const requestFingerprint = createHash('sha256').update(canonicalRequest).digest('hex');

    return this.orders.createCheckout(
      command,
      this.checkoutPolicy.getPricingPolicy(),
      requestFingerprint,
      `MB-${new Date().getUTCFullYear()}-${randomUUID().replace(/-/g, '').slice(0, 12).toUpperCase()}`,
    );
  }

  listClientOrders(clientId: string): Promise<OrderView[]> {
    return this.orders.listClientOrders(clientId);
  }

  getClientOrder(clientId: string, orderId: string): Promise<OrderView> {
    return this.orders.getClientOrder(clientId, orderId);
  }

  listVendorSubOrders(ownerId: string): Promise<VendorSubOrderView[]> {
    return this.orders.listVendorSubOrders(ownerId);
  }

  getVendorSubOrder(ownerId: string, subOrderId: string): Promise<VendorSubOrderView> {
    return this.orders.getVendorSubOrder(ownerId, subOrderId);
  }

  getVendorDashboard(ownerId: string): Promise<VendorDashboardSummary> {
    return this.orders.getVendorDashboard(ownerId);
  }

  listVendorCommissionLedger(ownerId: string): Promise<VendorCommissionLedgerEntry[]> {
    return this.orders.listVendorCommissionLedger(ownerId);
  }

  getVendorBalance(ownerId: string): Promise<VendorBalanceSummary> {
    return this.orders.getVendorBalance(ownerId);
  }

  listVendorWithdrawalRequests(ownerId: string): Promise<VendorWithdrawalRequestView[]> {
    return this.orders.listVendorWithdrawalRequests(ownerId);
  }

  createVendorWithdrawalRequest(
    ownerId: string,
    shopId: string,
    amount: number,
    paymentMethod: string,
    notes?: string,
  ): Promise<VendorWithdrawalRequestView> {
    if (!shopId?.trim()) {
      throw new OrderError('INVALID_CHECKOUT', 'Une boutique est obligatoire pour une demande de retrait.');
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new OrderError('INVALID_CHECKOUT', 'Le montant du retrait doit être strictement positif.');
    }
    if (!['WAVE', 'ORANGE_MONEY', 'FREE_MONEY'].includes(paymentMethod)) {
      throw new OrderError('INVALID_CHECKOUT', 'Méthode de retrait non prise en charge.');
    }
    return this.orders.createVendorWithdrawalRequest(ownerId, shopId, amount, paymentMethod, notes?.trim());
  }

  transitionVendorSubOrder(
    ownerId: string,
    subOrderId: string,
    nextStatus: VendorSubOrderStatus,
    rejectionReason?: string,
  ): Promise<VendorSubOrderView> {
    if (nextStatus === 'REJECTED' && !rejectionReason?.trim()) {
      throw new OrderError('INVALID_TRANSITION', 'Un motif est obligatoire pour refuser une sous-commande.');
    }
    return this.orders.transitionVendorSubOrder(ownerId, subOrderId, nextStatus, rejectionReason?.trim());
  }

  expireUnpaidReservations(): Promise<number> {
    return this.orders.expireUnpaidReservations();
  }
}