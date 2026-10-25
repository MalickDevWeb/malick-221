const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const VENDOR_ACCESS_TOKEN_KEY = 'malick-vendor-token';
export const VENDOR_SHOP_ID_KEY = 'malick-vendor-shop-id';

export interface VendorAuthResult {
  accessToken: string;
  user: {
    id: string;
    fullName: string;
    email: string | null;
    phoneNumber: string;
    role: string;
  };
}

export interface VendorShop {
  id: string;
  name: string;
  slug: string;
  status: 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';
}

export interface CreatedVendorProduct {
  id: string;
  title: string;
  category: string;
  description: string | null;
  basePrice: number | string;
  discountPrice: number | string | null;
  condition: 'NEUF' | 'TRES_BON_ETAT' | 'BON_ETAT';
  stockQuantity: number;
  imageUrl: string | null;
  additionalImageUrls: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export class VendorApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    let message = Array.isArray(payload?.message)
      ? payload.message.join(' ')
      : payload?.message || 'La requête a échoué. Vérifie les informations saisies.';

    if (message.includes('phoneNumber must match') || message.includes('regular expression')) {
      message = 'Le numéro de téléphone est invalide. Veuillez renseigner un numéro valide (ex: 77 123 45 67 ou +221 77 123 45 67).';
    } else if (response.status === 413 || message.toLowerCase().includes('entity too large')) {
      message = 'Les photos ou données envoyées sont trop volumineuses. Veuillez choisir une photo plus légère.';
    }
    throw new VendorApiError(response.status, message);
  }
  return response.json() as Promise<T>;
}

export function loginVendor(identity: string, password: string) {
  return request<VendorAuthResult>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity, password }),
  });
}

export function registerVendor(input: { fullName: string; phoneNumber: string; password: string }) {
  return request<VendorAuthResult>('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, role: 'VENDOR' }),
  });
}

export function createVendorShop(token: string, name: string, description?: string) {
  return request<VendorShop>('/shops', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
}

export function getVendorShops(token: string) {
  return request<VendorShop[]>('/shops/vendor/me', {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
}

export function createVendorProduct(token: string, input: {
  shopId: string;
  title: string;
  category: string;
  description?: string;
  basePrice: number;
  discountPrice?: number;
  condition: 'NEUF' | 'TRES_BON_ETAT' | 'BON_ETAT';
  stockQuantity: number;
  imageUrl: string;
  additionalImageUrls: string[];
}) {
  return request<CreatedVendorProduct>('/products', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
}