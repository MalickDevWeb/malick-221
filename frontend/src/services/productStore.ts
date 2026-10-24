/**
 * Service ProductStore pour l'espace Vendeur Malick Buss
 * Fournit un CRUD complet, réactif et persistant pour la gestion des produits
 */

export interface VendorProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  status: 'Actif' | 'Stock Faible' | 'Rupture' | 'Désactivé' | 'En attente de validation';
  image: string;
  additionalImages?: string[];
  description?: string;
  condition?: 'NEUF' | 'TRES_BON_ETAT' | 'BON_ETAT';
  createdAt: string;
  updatedAt: string;
  shopId?: string;
  shopName?: string;
}

const STORAGE_KEY = 'malick_buss_vendor_products';

const DEFAULT_PRODUCTS: VendorProduct[] = [
  {
    id: 'prod-1',
    title: 'Ensemble Boubou Soie & Bazin Getzner Riche',
    category: 'Vêtements',
    price: 28500,
    discountPrice: 32000,
    stock: 15,
    status: 'Actif',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    ],
    description: 'Boubou traditionnel dakarois de haute couture, brodé main avec du fil doré de qualité supérieure.',
    condition: 'NEUF',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString(),
    shopName: 'Style & Mode Dakar',
  },
  {
    id: 'prod-2',
    title: 'Sneakers Dakar Urban Street Édition Limitée',
    category: 'Chaussures',
    price: 22000,
    stock: 4,
    status: 'Stock Faible',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    additionalImages: [],
    description: 'Sneakers urbaines respirantes, semelle amortissante confort spécial longues marches.',
    condition: 'NEUF',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    shopName: 'Style & Mode Dakar',
  },
  {
    id: 'prod-3',
    title: 'Robe Brodée Cérémonie Dakar Chic',
    category: 'Vêtements',
    price: 35000,
    discountPrice: 42000,
    stock: 9,
    status: 'Actif',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    additionalImages: [],
    description: 'Tenue de soirée et mariages raffinée, finitions soignées en satin et organza.',
    condition: 'NEUF',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date().toISOString(),
    shopName: 'Style & Mode Dakar',
  },
  {
    id: 'prod-4',
    title: 'Sac à Main Cuir Thiès Artisanal Premium',
    category: 'Accessoires',
    price: 15000,
    stock: 12,
    status: 'Actif',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
    additionalImages: [],
    description: 'Maroquinerie sénégalaise authentique 100% cuir de vachette tanné à Thiès.',
    condition: 'NEUF',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date().toISOString(),
    shopName: 'Style & Mode Dakar',
  },
  {
    id: 'prod-5',
    title: 'Chemise Lin Homme Style Dakar Médina',
    category: 'Vêtements',
    price: 18000,
    stock: 0,
    status: 'Rupture',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    additionalImages: [],
    description: 'Chemise légère et élégante, parfaite pour le climat dakarois.',
    condition: 'NEUF',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    updatedAt: new Date().toISOString(),
    shopName: 'Style & Mode Dakar',
  },
  {
    id: 'prod-6',
    title: 'Sandales Cuir Sénégalais Fait Main',
    category: 'Chaussures',
    price: 12500,
    stock: 18,
    status: 'Actif',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80',
    additionalImages: [],
    description: 'Sandales artisanales souples, coutures renforcées et finitions prestige.',
    condition: 'NEUF',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    updatedAt: new Date().toISOString(),
    shopName: 'Style & Mode Dakar',
  },
];

function calculateStatus(stock: number, isExplicitlyDisabled = false): VendorProduct['status'] {
  if (isExplicitlyDisabled) return 'Désactivé';
  if (stock <= 0) return 'Rupture';
  if (stock <= 5) return 'Stock Faible';
  return 'Actif';
}

export function getVendorProducts(): VendorProduct[] {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_PRODUCTS;
  } catch (err) {
    console.error('Erreur lecture produits localStorage:', err);
    return DEFAULT_PRODUCTS;
  }
}

export function saveVendorProducts(products: VendorProduct[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('malick_products_updated'));
  } catch (err) {
    console.error('Erreur sauvegarde produits localStorage:', err);
  }
}

export function getVendorProductById(id: string): VendorProduct | undefined {
  const products = getVendorProducts();
  return products.find((p) => p.id === id);
}

export function addVendorProduct(
  data: Omit<VendorProduct, 'createdAt' | 'updatedAt'> & { id?: string }
): VendorProduct {
  const products = getVendorProducts();

  const newProduct: VendorProduct = {
    ...data,
    id: data.id ?? `prod-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    status: data.status ?? calculateStatus(data.stock),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedList = [newProduct, ...products];
  saveVendorProducts(updatedList);
  return newProduct;
}

export function updateVendorProduct(
  id: string,
  updates: Partial<Omit<VendorProduct, 'id' | 'createdAt'>>
): VendorProduct | null {
  const products = getVendorProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = products[index];
  const nextStock = updates.stock !== undefined ? updates.stock : existing.stock;
  const isCurrentlyDisabled = updates.status === 'Désactivé' || (updates.status === undefined && existing.status === 'Désactivé');
  const remainsPending = updates.status === undefined && existing.status === 'En attente de validation';

  const updatedProduct: VendorProduct = {
    ...existing,
    ...updates,
    stock: nextStock,
    status: remainsPending
      ? existing.status
      : updates.status && updates.status !== 'Actif' && updates.status !== 'Stock Faible' && updates.status !== 'Rupture'
        ? updates.status
        : calculateStatus(nextStock, isCurrentlyDisabled && updates.status !== 'Actif'),
    updatedAt: new Date().toISOString(),
  };

  products[index] = updatedProduct;
  saveVendorProducts([...products]);
  return updatedProduct;
}

export function deleteVendorProduct(id: string): boolean {
  const products = getVendorProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;

  saveVendorProducts(filtered);
  return true;
}

export function toggleVendorProductStatus(id: string): VendorProduct | null {
  const product = getVendorProductById(id);
  if (!product) return null;

  const nextStatus = product.status === 'Désactivé' ? calculateStatus(product.stock) : 'Désactivé';
  return updateVendorProduct(id, { status: nextStatus });
}

