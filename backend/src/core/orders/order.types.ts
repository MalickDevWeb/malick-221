export type PaymentMethod = 'WAVE' | 'ORANGE_MONEY' | 'FREE_MONEY' | 'CASH_ON_DELIVERY';

export type OrderStatus =
  | 'DRAFT'
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'TO_ACCEPT'
  | 'ACCEPTED'
  | 'PREPARING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'REFUNDED'
  | 'REJECTED';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';

export interface ShippingAddressSnapshot {
  recipientName: string;
  phoneNumber: string;
  region: string;
  city: string;
  addressLine: string;
  instructions?: string;
}

export interface CheckoutLineInput {
  productId: string;
  quantity: number;
}

export interface CreateCheckoutCommand {
  clientId: string;
  idempotencyKey: string;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddressSnapshot;
  items: CheckoutLineInput[];
}

export interface CheckoutPricingPolicy {
  commissionRatePercent: number;
  shippingFeePerShop: number;
  stockReservationMinutes: number;
}

export interface CheckoutProduct {
  id: string;
  shopId: string;
  shopName: string;
  isShopActive: boolean;
  isPublished: boolean;
  title: string;
  basePrice: number;
  discountPrice: number | null;
  availableStock: number;
}

export interface PlannedOrderItem {
  productId: string;
  title: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PlannedSubOrder {
  shopId: string;
  shopName: string;
  items: PlannedOrderItem[];
  subtotalItems: number;
  shippingFee: number;
  totalAmount: number;
  commissionRate: number;
  commissionAmount: number;
  vendorNetEarning: number;
}

export interface CheckoutPlan {
  subOrders: PlannedSubOrder[];
  grandTotal: number;
}

export interface OrderItemView {
  productId: string;
  title: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface SubOrderView {
  id: string;
  orderNumber: string;
  shopId: string;
  shopName: string;
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  total: number;
  items: OrderItemView[];
  createdAt: string;
}

export interface OrderView {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  total: number;
  shippingAddress: ShippingAddressSnapshot;
  subOrders: SubOrderView[];
  createdAt: string;
  updatedAt: string;
}

export type VendorSubOrderStatus = 'ACCEPTED' | 'PREPARING' | 'SHIPPED' | 'REJECTED';

export interface VendorSubOrderView extends SubOrderView {
  orderId: string;
  orderNumber: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddressSnapshot;
}

export interface VendorDashboardSummary {
  pendingValidation: number;
  accepted: number;
  shipped: number;
  turnover: number;
  commissionDue: number;
  commissionPaid: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    shopName: string;
    total: number;
    status: OrderStatus;
    createdAt: string;
  }>;
}

export interface VendorCommissionLedgerEntry {
  id: string;
  orderNumber: string;
  shopName: string;
  status: string;
  baseAmount: number;
  rate: number;
  commissionAmount: number;
  createdAt: string;
}

export interface VendorBalanceItem {
  shopId: string;
  shopName: string;
  earned: number;
  pendingWithdrawal: number;
  available: number;
}

export interface VendorBalanceSummary {
  totalEarned: number;
  totalPendingWithdrawal: number;
  totalAvailable: number;
  shops: VendorBalanceItem[];
}

export interface VendorWithdrawalRequestView {
  id: string;
  shopId: string;
  shopName: string;
  amount: number;
  fee: number;
  paymentMethod: string;
  status: 'PENDING' | 'APPROVED' | 'PROCESSING' | 'PAID' | 'REJECTED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}