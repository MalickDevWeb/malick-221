const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface AdminDashboardData {
  metrics: {
    vendors: number;
    activeShops: number;
    pendingShops: number;
    products: number;
    ordersToday: number;
    salesToday: number;
    commissionsToday: number;
  };
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    amount: number;
    status: string;
    createdAt: string;
    shopName: string;
  }>;
}

export interface AdminShop {
  id: string;
  name: string;
  slug: string;
  status: 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';
  createdAt: string;
  owner: { fullName: string; email: string | null; phoneNumber: string; isActive: boolean };
  _count: { products: number };
}

export class AdminApiError extends Error {
  constructor(public readonly status: number) {
    super('La requête administrateur a échoué.');
  }
}

export async function adminLogin(identity: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/admin/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity, password }),
  });

  if (!response.ok) throw new AdminApiError(response.status);
  return response.json() as Promise<{
    accessToken: string;
    user: { id: string; fullName: string; email: string | null; phoneNumber: string };
  }>;
}

export async function getAdminDashboard(token: string): Promise<AdminDashboardData> {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!response.ok) throw new AdminApiError(response.status);
  return response.json();
}

export async function getAdminShops(token: string): Promise<AdminShop[]> {
  const response = await fetch(`${API_BASE_URL}/admin/shops`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!response.ok) throw new AdminApiError(response.status);
  return response.json();
}

export async function updateAdminShopStatus(
  token: string,
  shopId: string,
  status: AdminShop['status'],
): Promise<AdminShop> {
  const response = await fetch(`${API_BASE_URL}/admin/shops/${shopId}/status`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new AdminApiError(response.status);
  return response.json();
}