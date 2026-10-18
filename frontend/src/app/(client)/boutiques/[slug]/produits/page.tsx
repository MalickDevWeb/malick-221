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
} from 'lucide-react';
import { formatFCFA } from '../../../../../services/api';
import { addCartItem, createOrder } from '../../../../../services/order-flow';
import { getVendorProducts } from '../../../../../services/productStore';

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
      whatsapp: '221771234567',
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
    },
    'techzone': {
      name: 'TechZone',
      monogram: 'TZ',
      slug: 'techzone',
      badge: '⚡ Top Ventes High-Tech',
      rating: '4,8',
      reviewsCount: 980,
      district: 'Médina • Centenaire',
      whatsapp: '221765432109',
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
    },
  };

  const boutiqueInfo = BOUTIQUES_INFO[params.slug] || {
    name: 'Style & Mode',
    monogram: 'SM',
    slug: params.slug,
    badge: '👑 Vendeur Officiel',
    rating: '4,9',
    reviewsCount: 1240,
    district: 'Dakar Plateau',
    whatsapp: '221771234567',
  };

  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // Action 1 : Ajouter au panier rapide avec toast
  const handleAddToCart = (product: ProductItem) => {
    addCartItem({
      id: `${boutiqueInfo.slug}-${product.id}`,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
      shop: boutiqueInfo.name,
    });
    setToastMessage(`✓ ${product.title} ajouté au panier !`);
    setTimeout(() => setToastMessage(null), 3000);
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

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased select-none pb-16">
      {/* ================= 1. EN-TÊTE ULTRA COMPACT & CLAIR ================= */}
      <section className="bg-white border-b border-slate-200/90 shadow-2xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Gauche : Bouton Retour + Identité Boutique */}
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <Link
                href="/boutiques"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-700 flex items-center justify-center transition shrink-0"
                title="Retour aux boutiques"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.2px]" />
              </Link>

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#071328] text-white flex flex-col items-center justify-center shrink-0 border border-amber-400 shadow-xs">
                <span className="text-[11px] font-black text-amber-300 leading-none">
                  {boutiqueInfo.monogram}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-sm sm:text-base font-black text-slate-900 truncate">
                    {boutiqueInfo.name}
                  </h1>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span className="hidden sm:inline">Boutique Vérifiée</span>
                    <span className="sm:hidden">✓</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="truncate">{boutiqueInfo.district}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 font-bold text-slate-900">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {boutiqueInfo.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Droite : WhatsApp + Panier */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://wa.me/${boutiqueInfo.whatsapp}?text=${encodeURIComponent(
                  `Bonjour ${boutiqueInfo.name}, je souhaite commander sur Malick Buss !`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-full transition shadow-xs active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              <Link
                href="/panier"
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-full transition"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Panier</span>
              </Link>
            </div>
          </div>

          {/* Ligne 2 : Filtres de Rayons & Recherche Rapide */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2.5 mt-2 border-t border-slate-100">
            {/* Rayons / Catégories avec zéro scrollbar */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition shrink-0 ${
                    activeCategory === cat
                      ? 'bg-[#0c1527] text-amber-400 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Recherche compacte */}
            <div className="relative sm:w-60 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un article..."
                className="w-full bg-[#f8fafc] text-xs pl-8 pr-3 py-1.5 rounded-full border border-slate-200 focus:border-amber-400 focus:bg-white focus:outline-none transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. CATALOGUE DES PRODUITS : CLAIR, NET & ACHAT 2 CLICS DIRECT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
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
                    className="w-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-[11px] py-1.5 px-3 rounded-full transition flex items-center justify-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Ajouter au panier</span>
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
