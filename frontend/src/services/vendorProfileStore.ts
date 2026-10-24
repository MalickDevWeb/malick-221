/**
 * Service de persistance et synchronisation pour le Profil et la Boutique Vendeur
 * Permet la modification complète des informations du commerçant, de sa vitrine,
 * de ses coordonnées et de ses horaires, synchronisé en direct sur tout le portail.
 */

export interface VendorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  shopSlug: string;
  category: string;
  district: string;
  address: string;
  description: string;
  avatarUrl: string;
  coverUrl: string;
  rating: string;
  reviewsCount: number;
  followersCount: string;
  openingHours: string;
  deliveryZones: string;
  paymentMethods: string;
  returnPolicy: string;
  badge: string;
  isVerified: boolean;
  isVip: boolean;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'malick_buss_vendor_profile';

export const DEFAULT_PROFILE: VendorProfile = {
  id: 'vendor-001',
  name: 'Malick Diop',
  email: 'malick.diop@malickbuss.sn',
  phone: '+221 77 123 45 67',
  shopName: 'Style & Mode',
  shopSlug: 'style-and-mode',
  category: 'Mode & Prêt-à-porter',
  district: 'Dakar Plateau • Sandaga',
  address: 'Dakar, Avenue Ponty (Plateau)',
  description: 'Prêt-à-porter de luxe, Getzner Bazin Riche brodé, sneakers originales & maroquinerie sénégalaise haut de gamme.',
  avatarUrl: '/images/mockup/vendor_man_clean.jpg',
  coverUrl: '/images/boutiques/cover_style_mode.jpg',
  rating: '4,9',
  reviewsCount: 1240,
  followersCount: '2.4K',
  openingHours: 'Du Lundi au Samedi : 09h00 - 20h30 (Dimanche sur RDV)',
  deliveryZones: 'Dakar Express 24h & Banlieue (Thiès, Saint-Louis, Mbour, Touba...)',
  paymentMethods: 'Wave Sénégal, Orange Money & Espèces à la livraison',
  returnPolicy: 'Échange sous 48h en cas de problème de taille avec étiquette',
  badge: 'Vendeur Vérifié Or',
  isVerified: true,
  isVip: true,
  createdAt: '2025-01-15T10:00:00.000Z',
  updatedAt: new Date().toISOString(),
};

/**
 * Récupère le profil du vendeur connecté (localStorage avec fallback par défaut)
 */
export function getVendorProfile(): VendorProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch (err) {
    console.error('Erreur lecture vendor profile:', err);
    return DEFAULT_PROFILE;
  }
}

/**
 * Sauvegarde les modifications du profil vendeur et émet un événement
 */
export function saveVendorProfile(updates: Partial<VendorProfile>): VendorProfile {
  const current = getVendorProfile();
  const updated: VendorProfile = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('malick_profile_updated', { detail: updated }));
    } catch (err) {
      console.error('Erreur écriture vendor profile:', err);
    }
  }

  return updated;
}

/**
 * Enregistre une nouvelle boutique créée par un vendeur, la place en attente
 * et la synchronise directement avec la liste du Super Admin.
 */
export function registerNewVendorShop(params: {
  name: string;
  shopName: string;
  phone: string;
  category: string;
  district: string;
  description?: string;
  avatarUrl?: string;
}): VendorProfile {
  const slug = params.shopName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const newProfile: VendorProfile = {
    ...DEFAULT_PROFILE,
    id: `vendor-${Date.now()}`,
    name: params.name,
    shopName: params.shopName,
    shopSlug: slug || 'ma-boutique',
    phone: params.phone,
    email: `${slug}@malickbuss.sn`,
    category: params.category,
    district: params.district,
    address: `${params.district}, Dakar`,
    description: params.description || `Boutique officielle ${params.shopName}`,
    avatarUrl: params.avatarUrl || '',
    isVerified: false,
    badge: 'En attente de validation',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      // 1. Sauvegarde dans le profil commerçant
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      localStorage.setItem('malick_vendor_profile', JSON.stringify(newProfile));
      window.dispatchEvent(new CustomEvent('malick_profile_updated', { detail: newProfile }));

      // 2. Synchronisation dans malick_admin_shops pour le Super Admin
      const rawShops = localStorage.getItem('malick_admin_shops');
      const shops = rawShops ? JSON.parse(rawShops) : [];
      const newAdminShop = {
        id: `shop-${Date.now()}`,
        name: params.shopName,
        slug: slug || 'ma-boutique',
        status: 'PENDING_VERIFICATION',
        createdAt: new Date().toISOString(),
        owner: {
          fullName: params.name,
          email: `${slug}@malickbuss.sn`,
          phoneNumber: params.phone,
          isActive: true,
        },
        _count: { products: 0 },
      };
      const updatedShops = [newAdminShop, ...shops.filter((s: any) => s.slug !== slug)];
      localStorage.setItem('malick_admin_shops', JSON.stringify(updatedShops));
    } catch (err) {
      console.error('Erreur synchronisation boutique vendeur vers Super Admin:', err);
    }
  }

  return newProfile;
}

/**
 * Résout le contact WhatsApp exact et le nom d'une boutique (dynamique ou catalogue)
 */
export function resolveShopContact(shopNameOrSlug?: string): { name: string; phone: string } {
  const defaultShop = { name: 'Boutique Malick Buss', phone: '221771234567' };
  if (!shopNameOrSlug) return defaultShop;

  const clean = shopNameOrSlug.trim().toLowerCase();

  // 1. Boutique du profil vendeur actif (créé ou modifié en direct)
  if (typeof window !== 'undefined') {
    try {
      const activeVendor = getVendorProfile();
      if (
        activeVendor &&
        (activeVendor.shopName.toLowerCase() === clean ||
         activeVendor.shopSlug.toLowerCase() === clean)
      ) {
        const rawDigits = (activeVendor.phone || '').replace(/[^0-9]/g, '');
        const phone = rawDigits.startsWith('221') ? rawDigits : `221${rawDigits || '771234567'}`;
        return {
          name: activeVendor.shopName,
          phone,
        };
      }
    } catch {}
  }

  // 2. Annuaire officiel des boutiques de la marketplace
  const CATALOG: Record<string, { name: string; phone: string }> = {
    'style & mode': { name: 'Style & Mode', phone: '221771234567' },
    'style-and-mode': { name: 'Style & Mode', phone: '221771234567' },
    'beauty world': { name: 'Beauty World', phone: '221778901234' },
    'beauty-world': { name: 'Beauty World', phone: '221778901234' },
    'techzone': { name: 'TechZone', phone: '221765432109' },
    'kids world': { name: 'Kids World', phone: '221781112233' },
    'kids-world': { name: 'Kids World', phone: '221781112233' },
    'maison chic': { name: 'Maison Chic', phone: '221774445566' },
    'maison-chic': { name: 'Maison Chic', phone: '221774445566' },
    'sport max': { name: 'Sport Max', phone: '221769998877' },
    'sport-max': { name: 'Sport Max', phone: '221769998877' },
  };

  if (CATALOG[clean]) {
    return CATALOG[clean];
  }

  return { name: shopNameOrSlug, phone: '221771234567' };
}

