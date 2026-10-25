'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  X,
  Plus,
  Minus,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Crown,
  Home,
  Store,
} from 'lucide-react';
import { Icon } from '@iconify/react';
import { formatFCFA } from '../../../../../services/api';
import { addCartItem, createOrder } from '../../../../../services/order-flow';
import { getVendorProducts } from '../../../../../services/productStore';
import { getVendorProfile } from '../../../../../services/vendorProfileStore';

interface ProductItem {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: string;
  reviewsCount: number;
  image: string;
  tag?: string;
  inStock: boolean;
}

export default function ShopProductsListingPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    try {
      const p = getVendorProfile();
      setProfile(p);
    } catch {}
  }, []);

  // Boutique Info Dynamique
  const BOUTIQUES_INFO: Record<string, any> = {
    'style-and-mode': {
      name: 'Style & Mode',
      monogram: 'SM',
      slug: 'style-and-mode',
      badge: '👑 Vendeur Officiel',
      rating: '4,9',
      reviewsCount: 1240,
      district: 'Dakar Plateau • Sandaga',
      whatsapp: '221771719013',
      coverImage: '/images/boutiques/cover_style_mode.jpg',
    },
    'beauty-world': {
      name: 'Beauty World',
      monogram: 'BW',
      slug: 'beauty-world',
      badge: '✨ Coup de Cœur',
      rating: '4,8',
      reviewsCount: 756,
      district: 'Almadies • Dakar',
      whatsapp: '221778901234',
      coverImage: '/images/boutiques/cover_beauty_world.jpg',
    },
    'techzone': {
      name: 'TechZone',
      monogram: 'TZ',
      slug: 'techzone',
      badge: '⚡ Top Ventes High-Tech',
      isVerified: false,
      rating: '4.8',
      reviewsCount: 980,
      district: 'Médina • Centenaire',
      whatsapp: '221765432109',
      coverImage: '/images/boutiques/cover_techzone.jpg',
    },
    'kids-world': {
      name: 'Kids World',
      monogram: 'KW',
      slug: 'kids-world',
      badge: '🧸 Espace Famille',
      rating: '4,8',
      reviewsCount: 523,
      district: 'Mermoz • VDN',
      whatsapp: '221781112233',
      coverImage: '/images/boutiques/cover_kids_world.jpg',
    },
    'maison-chic': {
      name: 'Maison Chic',
      monogram: 'MC',
      slug: 'maison-chic',
      badge: '🎨 Design & Confort',
      rating: '4,7',
      reviewsCount: 421,
      district: 'Ngor • Virage',
      whatsapp: '221774445566',
      coverImage: '/images/boutiques/cover_maison_chic.jpg',
    },
    'sport-max': {
      name: 'Sport Max',
      monogram: 'SM',
      slug: 'sport-max',
      badge: '⚽ Performance Pro',
      rating: '4,6',
      reviewsCount: 367,
      district: 'Fann Résidence • Corniche',
      whatsapp: '221769998877',
      coverImage: '/images/boutiques/cover_sport_max.jpg',
    },
  };

  const boutiqueInfo = (() => {
    if (profile && (profile.shopSlug === params.slug || params.slug === 'style-and-mode')) {
      const rawPhone = profile.phone ? profile.phone.replace(/[^0-9]/g, '') : '221771719013';
      const cleanPhone = rawPhone.startsWith('221') ? rawPhone : `221${rawPhone}`;
      return {
        name: profile.shopName || 'Style & Mode',
        monogram: (profile.shopName || 'SM').substring(0, 2).toUpperCase(),
        slug: params.slug,
        badge: profile.isVerified ? '👑 Vendeur Officiel' : '⏳ En attente de validation',
        isVerified: profile.isVerified,
        rating: profile.rating || '4,9',
        reviewsCount: profile.reviewsCount || 1240,
        district: profile.district || profile.address || 'Dakar Plateau • Sandaga',
        whatsapp: cleanPhone,
        avatarUrl: profile.avatarUrl,
        coverImage: profile.coverImage || BOUTIQUES_INFO[params.slug]?.coverImage || '/images/boutiques/cover_techzone.jpg',
      };
    }
    return (
      BOUTIQUES_INFO[params.slug] || {
        name: 'TechZone',
        monogram: 'TZ',
        slug: params.slug,
        badge: '⚡ Top Ventes High-Tech',
        isVerified: false,
        rating: '4.8',
        reviewsCount: 980,
        district: 'Médina • Centenaire',
        whatsapp: '221771719013',
        coverImage: '/images/boutiques/cover_techzone.jpg',
      }
    );
  })();

  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // État Achat Express 2 Clics
  const [expressModalProduct, setExpressModalProduct] = useState<ProductItem | null>(null);
  const [expressQuantity, setExpressQuantity] = useState(1);
  const [expressPayment, setExpressPayment] = useState<'WAVE' | 'OM' | 'CASH'>('WAVE');
  const [expressPhone, setExpressPhone] = useState('+221 77 ');
  const [expressAddress, setExpressAddress] = useState('Dakar Plateau');
  const [expressSuccess, setExpressSuccess] = useState(false);

  const products: ProductItem[] = [
    {
      id: 'p1',
      title: 'Ensemble Boubou Bazin Getzner Riche Brodé',
      category: 'Boubous & Bazin',
      price: 32000,
      originalPrice: 38000,
      rating: '4.9',
      reviewsCount: 318,
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
      tag: 'Bestseller 🔥',
      inStock: true,
    },
    {
      id: 'p2',
      title: 'Sneakers Dakar Urban Street Premium',
      category: 'Chaussures',
      price: 22000,
      originalPrice: 26000,
      rating: '4.8',
      reviewsCount: 184,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
      tag: 'Promo -15%',
      inStock: true,
    },
    {
      id: 'p3',
      title: 'Robe Brodée Cérémonie Dakar Chic',
      category: 'Femme',
      price: 28500,
      rating: '4.9',
      reviewsCount: 92,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
      tag: 'Nouveau ✨',
      inStock: true,
    },
    {
      id: 'p4',
      title: 'Sac à Main Cuir Thiès Artisanal Luxe',
      category: 'Accessoires',
      price: 16500,
      rating: '4.8',
      reviewsCount: 76,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
      tag: 'Fait Main 🇸🇳',
      inStock: true,
    },
    {
      id: 'p5',
      title: 'Chemise en Lin Brodé Coupe Sénégalaise',
      category: 'Homme',
      price: 18000,
      originalPrice: 21000,
      rating: '4.7',
      reviewsCount: 64,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
    {
      id: 'p6',
      title: 'Sandales en Cuir Véritable Fait Main',
      category: 'Chaussures',
      price: 12500,
      rating: '4.8',
      reviewsCount: 142,
      image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80',
      tag: 'Stock Limité',
      inStock: true,
    },
    {
      id: 'p7',
      title: 'Veste Bomber Wax Artisanal Dakar',
      category: 'Homme',
      price: 24000,
      rating: '4.9',
      reviewsCount: 53,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
    {
      id: 'p8',
      title: 'Montre Bracelet Cuir & Cadran Doré',
      category: 'Accessoires',
      price: 14500,
      rating: '4.7',
      reviewsCount: 41,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
      inStock: true,
    },
  ];
 
  const [productsList, setProductsList] = useState<ProductItem[]>(products);

  useEffect(() => {
    const syncProducts = () => {
      try {
        const vendorProds = getVendorProducts();
        if (vendorProds && vendorProds.length > 0) {
          const activeVendorItems: ProductItem[] = vendorProds
            .filter((p) => p.status === 'Actif' || p.status === 'Stock Faible')
            .map((p) => ({
              id: p.id,
              title: p.title,
              category: p.category,
              price: p.price,
              originalPrice: p.discountPrice ? p.discountPrice : undefined,
              rating: '4.9',
              reviewsCount: 18,
              image: p.image || 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
              tag: p.discountPrice ? 'Promo 🔥' : (p.stock <= 5 ? 'Stock Limité ⚡' : 'Nouveau ✨'),
              inStock: p.stock > 0,
            }));

          const existingIds = new Set(activeVendorItems.map((p) => p.id));
          const combined = [...activeVendorItems, ...products.filter((p) => !existingIds.has(p.id))];
          setProductsList(combined);
        }
      } catch (err) {
        console.error('Error syncing products with store:', err);
      }
    };

    syncProducts();
    window.addEventListener('malick_products_updated', syncProducts);
    return () => window.removeEventListener('malick_products_updated', syncProducts);
  }, []);

  const categories = ['Tous', 'Boubous & Bazin', 'Chaussures', 'Homme', 'Femme', 'Accessoires'];

  const filteredProducts = productsList
    .filter((p) => {
      if (activeCategory === 'Tous') return true;
      return p.category === activeCategory;
    })
    .filter((p) => {
      if (!searchTerm.trim()) return true;
      return p.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

  // Action 1 : Ajouter au panier rapide avec toast et feedback bouton sans ouvrir le tiroir
  const handleAddToCart = (product: ProductItem) => {
    addCartItem({
      id: `${boutiqueInfo.slug}-${product.id}`,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      shop: boutiqueInfo.name,
    }, false);
    setAddedProductId(product.id);
    setToastMessage(`✓ ${product.title} ajouté au panier !`);
    setTimeout(() => setAddedProductId(null), 2500);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Action 2 : Achat Express en 2 Clics
  const handleOpenExpressBuy = (product: ProductItem) => {
    setExpressModalProduct(product);
    setExpressQuantity(1);
    setExpressSuccess(false);
  };

  const handleConfirmExpressOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expressModalProduct) return;

    // Enregistrement de la commande express
    const itemToBuy = {
      id: `${boutiqueInfo.slug}-${expressModalProduct.id}`,
      title: expressModalProduct.title,
      price: expressModalProduct.price,
      quantity: expressQuantity,
      image: expressModalProduct.image,
      shop: boutiqueInfo.name,
    };

    addCartItem(itemToBuy);
    createOrder([itemToBuy], 'express', expressPayment === 'CASH' ? 'cod' : 'mobile_money');

    setExpressSuccess(true);
    setTimeout(() => {
      setExpressSuccess(false);
      setExpressModalProduct(null);
      router.push('/confirmation');
    }, 1800);
  };

  const getCategoryIcon = (cat: string, isActive: boolean) => {
    switch (cat) {
      case 'Boubous & Bazin':
        return <Icon icon="solar:t-shirt-bold-duotone" className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-indigo-500'}`} />;
      case 'Chaussures':
        return <Icon icon="solar:walking-round-bold-duotone" className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-amber-500'}`} />;
      case 'Homme':
        return <Icon icon="solar:user-bold-duotone" className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-sky-500'}`} />;
      case 'Femme':
        return <Icon icon="solar:user-heart-bold-duotone" className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-pink-500'}`} />;
      case 'Accessoires':
        return <Icon icon="solar:bag-bold-duotone" className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-500'}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased select-none pb-16">
      {/* ================= 0. FIL D'ARIANE / NAVIGATION DE RETOUR ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 py-1">
          <nav className="flex items-center gap-1.5 sm:gap-2 flex-wrap" aria-label="Fil d'ariane">
            <Link
              href="/"
              className="hover:text-amber-600 transition flex items-center gap-1 text-slate-600 font-medium"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <Link
              href="/boutiques"
              className="hover:text-amber-600 transition flex items-center gap-1 text-slate-600 font-medium"
            >
              <Store className="w-3.5 h-3.5 text-amber-500" />
              <span>Boutiques</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-900 font-bold truncate max-w-[180px] sm:max-w-none">
              {boutiqueInfo.name}
            </span>
          </nav>

          {/* Bouton explicite pour sortir de la boutique */}
          <Link
            href="/boutiques"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 hover:text-slate-950 font-bold text-xs px-3 py-1.5 rounded-full border border-slate-200/90 shadow-2xs transition active:scale-95"
            title="Sortir de cette boutique et voir toutes les boutiques de Dakar"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-900 stroke-[2.5px]" />
            <span className="hidden sm:inline">Sortir de la boutique</span>
            <span className="sm:hidden">Sortir</span>
          </Link>
        </div>
      </div>

      {/* ================= 1. BANNIÈRE PANORAMIQUE OFFICIELLE DE LA BOUTIQUE ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3">
        <div className="relative h-44 sm:h-56 md:h-64 lg:h-72 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-slate-950">
          {/* Boutons flottants en haut de la bannière */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
            <Link
              href="/boutiques"
              className="inline-flex items-center gap-1.5 bg-black/60 hover:bg-black/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-md transition active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5px]" />
              <span>Toutes les boutiques</span>
            </Link>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 bg-black/40 hover:bg-black/70 backdrop-blur-md text-slate-200 hover:text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 shadow-xs transition"
            >
              <Home className="w-3 h-3" />
              <span>Accueil</span>
            </Link>
          </div>

          <img
            src={boutiqueInfo.coverImage || '/images/boutiques/cover_techzone.jpg'}
            alt={boutiqueInfo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ================= 2. CARTE D'IDENTITÉ & ACTIONS BOUTIQUE (FLOATING CARD) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-5">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            {/* Logo de la boutique */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#071328] border-2 border-white shadow-md flex items-center justify-center p-2 shrink-0 overflow-hidden">
              {boutiqueInfo.avatarUrl ? (
                <img src={boutiqueInfo.avatarUrl} alt={boutiqueInfo.name} className="w-full h-full object-cover" />
              ) : boutiqueInfo.slug === 'techzone' ? (
                <div className="text-center font-black">
                  <span className="text-white text-xs sm:text-base tracking-tight block">
                    Tech<span className="text-amber-400">Zone</span>
                  </span>
                  <span className="w-8 h-0.5 bg-amber-400 block mx-auto mt-1 rounded-full" />
                </div>
              ) : (
                <div className="text-center">
                  <Crown className="w-4 h-4 text-amber-400 fill-amber-400 mx-auto -mb-0.5" />
                  <span className="text-sm sm:text-base font-black text-amber-300 leading-none">
                    {boutiqueInfo.monogram}
                  </span>
                </div>
              )}
            </div>

            {/* Infos : Nom + Badge + Localisation & Note */}
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight truncate">
                  {boutiqueInfo.name}
                </h1>
                {boutiqueInfo.isVerified ? (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Boutique Vérifiée</span>
                  </span>
                ) : (
                  <span className="bg-amber-500/15 text-amber-800 border border-amber-400/40 text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>En vérification</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-1 truncate text-slate-700 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <span>{boutiqueInfo.district}</span>
                </span>
                <span className="text-slate-300 font-normal">|</span>
                <span className="flex items-center gap-1 font-bold text-slate-900">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  <span>{boutiqueInfo.rating}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Boutons Actions : WhatsApp Vert + Panier Bleu Marine */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <a
              href={`https://wa.me/${boutiqueInfo.whatsapp}?text=${encodeURIComponent(
                `Bonjour ${boutiqueInfo.name}, je souhaite commander sur Malick Buss !`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md shadow-emerald-500/20 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/panier"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#0c1527] hover:bg-[#16233b] active:scale-95 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2px]" />
              <span>Panier</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= 3. FILTRES DE RAYONS & RECHERCHE INTERNE ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Pilules de catégories */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0c1527] text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  {getCategoryIcon(cat, isActive)}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Champ de recherche dans cette boutique */}
          <div className="relative md:w-80 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher dans cette boutique..."
              className="w-full bg-white text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-200/90 focus:border-amber-400 focus:outline-none transition shadow-2xs font-medium placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* ================= 4. SÉPARATEUR DE SECTION BOUTIQUE ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <div className="relative flex items-center justify-center">
          <div className="w-24 sm:w-36 h-px bg-slate-200" />
          <div className="mx-4 flex flex-col items-center">
            <span className="text-xs sm:text-sm font-black text-slate-800 tracking-wide">
              Boutique {boutiqueInfo.name}
            </span>
            <span className="w-12 h-0.5 bg-amber-400 rounded-full mt-1" />
          </div>
          <div className="w-24 sm:w-36 h-px bg-slate-200" />
        </div>
      </div>

      {/* ================= 5. CATALOGUE DES PRODUITS ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-3">
          <p className="text-xs font-bold text-slate-500">
            Rayon : <span className="text-slate-900 font-black">{activeCategory}</span> ({filteredProducts.length} articles)
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/90 shadow-2xs space-y-3">
            <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-sm text-slate-900">Aucun article trouvé</h3>
            <button
              onClick={() => {
                setActiveCategory('Tous');
                setSearchTerm('');
              }}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-4 py-2 rounded-full transition"
            >
              Voir tout le catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4.5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-amber-400/80 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Produit & Badge */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge */}
                    {product.tag && (
                      <span className="absolute top-2 left-2 z-10 bg-slate-950/85 backdrop-blur-md text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                        {product.tag}
                      </span>
                    )}

                    {/* Bouton WhatsApp direct sur photo */}
                    <a
                      href={`https://wa.me/${boutiqueInfo.whatsapp}?text=${encodeURIComponent(
                        `Bonjour ${boutiqueInfo.name}, je souhaite commander : ${product.title} (${formatFCFA(product.price)})`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md transition hover:scale-110"
                      title="Commander sur WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Infos Produit */}
                  <div className="p-3 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                      {product.category}
                    </span>

                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition line-clamp-2 leading-snug">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-1 text-[11px] text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-slate-900 font-black">{product.rating}</span>
                      <span className="text-slate-400">({product.reviewsCount})</span>
                    </div>

                    {/* Prix */}
                    <div className="pt-1 flex items-baseline gap-1.5">
                      <span className="text-sm sm:text-base font-black text-slate-950">
                        {formatFCFA(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          {formatFCFA(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Boutons d'Action (Achat 2 Clics + Panier) */}
                <div className="p-3 pt-0 space-y-1.5">
                  <button
                    onClick={() => handleOpenExpressBuy(product)}
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-105 active:scale-95 text-slate-950 font-black text-xs py-2 px-3 rounded-full transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    <span>⚡ Acheter en 2 Clics</span>
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full active:scale-95 font-bold text-[11px] py-1.5 px-3 rounded-full transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
                      addedProductId === product.id
                        ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {addedProductId === product.id ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        <span>✓ Ajouté au panier !</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3 text-slate-600" />
                        <span>Ajouter au panier</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= TOAST NOTIFICATION FLOTTANT ================= */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c1527] text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <span className="text-xs font-bold text-slate-100">{toastMessage}</span>
          <Link
            href="/panier"
            className="ml-2 bg-amber-400 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full hover:bg-amber-300 transition"
          >
            Voir panier →
          </Link>
        </div>
      )}

      {/* ================= MODAL ACHAT EXPRESS EN 2 CLICS ================= */}
      {expressModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  ⚡ Achat Express en 2 Clics
                </span>
                <h3 className="font-black text-base sm:text-lg text-slate-900 mt-1">
                  Commander cet article immédiatement
                </h3>
              </div>
              <button
                onClick={() => setExpressModalProduct(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {expressSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-black text-lg text-slate-900">Commande Confirmée avec Succès !</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Votre commande a été transmise en direct à <strong className="text-slate-900">{boutiqueInfo.name}</strong>. Un coursier prendra contact avec vous sous peu.
                </p>
                <div className="inline-block bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-800">
                  Redirection vers le récapitulatif...
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmExpressOrder} className="space-y-4">
                {/* 1. Résumé Produit Sélectionné */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={expressModalProduct.image}
                      alt={expressModalProduct.title}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-white shadow-xs"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {expressModalProduct.title}
                      </h4>
                      <p className="text-xs text-amber-700 font-black">
                        {formatFCFA(expressModalProduct.price)}
                      </p>
                    </div>
                  </div>

                  {/* Sélecteur de Quantité */}
                  <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setExpressQuantity(Math.max(1, expressQuantity - 1))}
                      className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black text-slate-900 w-4 text-center">
                      {expressQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExpressQuantity(expressQuantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2. Coordonnées et Adresse à Dakar (Clic 1) */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Votre numéro de téléphone (Wave / OM)
                    </label>
                    <input
                      type="tel"
                      value={expressPhone}
                      onChange={(e) => setExpressPhone(e.target.value)}
                      placeholder="+221 77 000 00 00"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Quartier ou Adresse de livraison à Dakar
                    </label>
                    <input
                      type="text"
                      value={expressAddress}
                      onChange={(e) => setExpressAddress(e.target.value)}
                      placeholder="Ex: Almadies, Plateau, Ouakam, Mermoz, Maristes..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                {/* 3. Choix du Mode de Règlement */}
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">
                    Mode de règlement
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setExpressPayment('WAVE')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                        expressPayment === 'WAVE'
                          ? 'border-sky-500 bg-sky-50 text-sky-900 font-bold ring-2 ring-sky-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-black">Wave</span>
                      <span className="text-[9px] text-sky-700">1% sans frais</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpressPayment('OM')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                        expressPayment === 'OM'
                          ? 'border-orange-500 bg-orange-50 text-orange-900 font-bold ring-2 ring-orange-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-black">Orange Money</span>
                      <span className="text-[9px] text-orange-700">Instantané</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpressPayment('CASH')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition ${
                        expressPayment === 'CASH'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-black">À la livraison</span>
                      <span className="text-[9px] text-emerald-700">Espèces au coursier</span>
                    </button>
                  </div>
                </div>

                {/* Total et Confirmation (Clic 2) */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Sous-total ({expressQuantity} art.) + Livraison (2 000 F) :
                  </span>
                  <span className="text-base font-black text-slate-900">
                    {formatFCFA(expressModalProduct.price * expressQuantity + 2000)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 active:scale-95 text-slate-950 font-black py-3.5 rounded-full text-xs sm:text-sm transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 stroke-[2.5px] fill-slate-950" />
                  <span>Confirmer la commande express ({formatFCFA(expressModalProduct.price * expressQuantity + 2000)})</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
