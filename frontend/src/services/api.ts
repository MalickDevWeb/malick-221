const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface Shop {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  status: string;
  _count?: {
    products: number;
  };
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  basePrice: string | number;
  discountPrice: string | number | null;
  condition: 'NEUF' | 'TRES_BON_ETAT' | 'BON_ETAT';
  stockQuantity: number;
  shop?: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  };
}

export async function getShops(): Promise<Shop[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/shops`, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('Erreur lors du chargement des boutiques');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getShopBySlug(slug: string): Promise<(Shop & { products: Product[] }) | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/shops/${slug}`, { next: { revalidate: 10 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProducts(query?: { search?: string; shopSlug?: string }): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (query?.search) params.append('search', query.search);
    if (query?.shopSlug) params.append('shopSlug', query.shopSlug);

    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error('Erreur lors du chargement des produits');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function formatFCFA(amount: string | number | null): string {
  if (amount === null || amount === undefined) return '';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('fr-FR').format(num) + ' FCFA';
}
