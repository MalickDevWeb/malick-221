// Rôles utilisateurs
export enum UserRole {
  CLIENT = 'CLIENT',
  VENDOR = 'VENDOR',
  COURIER = 'COURIER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  SUPPORT = 'SUPPORT',
}

// Statuts d'une boutique (validation KYC)
export enum ShopStatus {
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED',
}

// États du cycle de vie d'une commande / sous-commande
export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAID = 'PAID',
  TO_ACCEPT = 'TO_ACCEPT', // Paiement à la livraison
  ACCEPTED = 'ACCEPTED',
  PREPARING = 'PREPARING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  DISPUTED = 'DISPUTED',
  REFUNDED = 'REFUNDED',
}

// Méthodes de paiement adaptées au Sénégal
export enum PaymentMethod {
  WAVE = 'WAVE',
  ORANGE_MONEY = 'ORANGE_MONEY',
  FREE_MONEY = 'FREE_MONEY',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

// Statuts des paiements
export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
}

// Statuts des commissions de la plateforme
export enum CommissionStatus {
  ESTIMATED = 'ESTIMATED',
  PROVISIONAL = 'PROVISIONAL',
  EARNED = 'EARNED',
  PAID_OUT = 'PAID_OUT',
  ADJUSTED = 'ADJUSTED',
  DISPUTED_HOLD = 'DISPUTED_HOLD',
}

// État des articles du catalogue
export enum ProductCondition {
  NEUF = 'NEUF',
  TRES_BON_ETAT = 'TRES_BON_ETAT',
  BON_ETAT = 'BON_ETAT',
}

