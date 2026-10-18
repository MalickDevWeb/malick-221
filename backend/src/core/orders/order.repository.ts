import {
  CheckoutPricingPolicy,
  CreateCheckoutCommand,
  OrderView,
  VendorBalanceSummary,
  VendorCommissionLedgerEntry,
  VendorDashboardSummary,
  VendorSubOrderStatus,
  VendorSubOrderView,
  VendorWithdrawalRequestView,
} from './order.types';

export const ORDERS_REPOSITORY = Symbol('ORDERS_REPOSITORY');

export interface OrdersRepository {
  createCheckout(
    command: CreateCheckoutCommand,
    pricing: CheckoutPricingPolicy,
    requestFingerprint: string,
    orderNumber: string,
  ): Promise<OrderView>;
  listClientOrders(clientId: string): Promise<OrderView[]>;
  getClientOrder(clientId: string, orderId: string): Promise<OrderView>;
  listVendorSubOrders(ownerId: string): Promise<VendorSubOrderView[]>;
  getVendorSubOrder(ownerId: string, subOrderId: string): Promise<VendorSubOrderView>;
  getVendorDashboard(ownerId: string): Promise<VendorDashboardSummary>;
  listVendorCommissionLedger(ownerId: string): Promise<VendorCommissionLedgerEntry[]>;
  getVendorBalance(ownerId: string): Promise<VendorBalanceSummary>;
  listVendorWithdrawalRequests(ownerId: string): Promise<VendorWithdrawalRequestView[]>;
  createVendorWithdrawalRequest(
    ownerId: string,
    shopId: string,
    amount: number,
    paymentMethod: string,
    notes?: string,
  ): Promise<VendorWithdrawalRequestView>;
  transitionVendorSubOrder(
    ownerId: string,
    subOrderId: string,
    nextStatus: VendorSubOrderStatus,
    rejectionReason?: string,
  ): Promise<VendorSubOrderView>;
  expireUnpaidReservations(): Promise<number>;
}