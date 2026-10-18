export type DeliveryOption = 'standard' | 'express';
export type PaymentOption = 'cod' | 'mobile_money';
export type OrderStatus = 'CONFIRMED' | 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  shop: string;
}

export interface StoredOrder {
  id: string;
  createdAt: string;
  status: OrderStatus;
  deliveryOption: DeliveryOption;
  paymentOption: PaymentOption;
  paymentStatus: 'PENDING';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

const CART_KEY = 'malick-buss-cart';
const ORDERS_KEY = 'malick-buss-orders';

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  CONFIRMED: ['PREPARING', 'CANCELLED'],
  PREPARING: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: [],
  CANCELLED: [],
};

function readJson(key: string): unknown {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch {
    return null;
  }
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<CartItem>;
  return typeof item.id === 'string' && item.id.length > 0
    && typeof item.title === 'string' && item.title.length > 0
    && typeof item.price === 'number' && Number.isFinite(item.price) && item.price >= 0
    && Number.isSafeInteger(item.quantity) && item.quantity! >= 1
    && typeof item.image === 'string'
    && typeof item.shop === 'string';
}

function isStoredOrder(value: unknown): value is StoredOrder {
  if (!value || typeof value !== 'object') return false;
  const order = value as Partial<StoredOrder>;
  return typeof order.id === 'string' && typeof order.createdAt === 'string'
    && !Number.isNaN(Date.parse(order.createdAt))
    && ['CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].includes(order.status ?? '')
    && ['standard', 'express'].includes(order.deliveryOption ?? '')
    && ['cod', 'mobile_money'].includes(order.paymentOption ?? '')
    && ['PENDING', 'SUCCESS', 'FAILED'].includes(order.paymentStatus ?? '')
    && Array.isArray(order.items) && order.items.every(isCartItem)
    && [order.subtotal, order.shipping, order.total].every((amount) =>
      typeof amount === 'number' && Number.isFinite(amount) && amount >= 0
    );
}

export function getCartItems(): CartItem[] {
  const storedItems = readJson(CART_KEY);
  return Array.isArray(storedItems) ? storedItems.filter(isCartItem) : [];
}

export function saveCartItems(items: CartItem[]): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }
}

export function addCartItem(item: CartItem): void {
  const items = getCartItems();
  const existing = items.find((cartItem) => cartItem.id === item.id);
  const nextItems = existing
    ? items.map((cartItem) => cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
      : cartItem)
    : [...items, item];

  saveCartItems(nextItems);
}

export function getOrders(): StoredOrder[] {
  const storedOrders = readJson(ORDERS_KEY);
  return Array.isArray(storedOrders) ? storedOrders.filter(isStoredOrder) : [];
}

export function getOrder(orderId: string): StoredOrder | undefined {
  return getOrders().find((order) => order.id === orderId);
}

export function createOrder(
  items: CartItem[],
  deliveryOption: DeliveryOption,
  paymentOption: PaymentOption,
): StoredOrder {
  if (typeof window === 'undefined') throw new Error('La commande doit être créée dans le navigateur.');
  if (!Array.isArray(items) || items.length === 0) throw new Error('Le panier est vide.');
  if (!items.every(isCartItem)) {
    throw new Error('Le panier contient un article invalide.');
  }
  if (!['standard', 'express'].includes(deliveryOption)
    || !['cod', 'mobile_money'].includes(paymentOption)) {
    throw new Error('Le mode de livraison ou de paiement est invalide.');
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = deliveryOption === 'express' ? 5000 : 3000;
  const orders = getOrders();
  const now = new Date();
  let id: string;
  do {
    const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 8)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`.slice(-8).toUpperCase();
    id = `MB-${now.getFullYear()}-${suffix}`;
  } while (orders.some((order) => order.id === id));

  const order: StoredOrder = {
    id,
    createdAt: now.toISOString(),
    status: 'CONFIRMED',
    deliveryOption,
    paymentOption,
    paymentStatus: 'PENDING',
    items: items.map((item) => ({ ...item })),
    subtotal,
    shipping,
    total: subtotal + shipping,
  };

  window.localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
  saveCartItems([]);
  return order;
}

export function updateOrderStatus(orderId: string, nextStatus: OrderStatus): StoredOrder | undefined {
  const orders = getOrders();
  const currentOrder = orders.find((order) => order.id === orderId);
  if (!currentOrder || !ALLOWED_TRANSITIONS[currentOrder.status].includes(nextStatus)) return undefined;

  const updatedOrder = { ...currentOrder, status: nextStatus };
  window.localStorage.setItem(
    ORDERS_KEY,
    JSON.stringify(orders.map((order) => order.id === orderId ? updatedOrder : order)),
  );
  return updatedOrder;
}
