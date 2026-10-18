'use client';

import React, { useState } from 'react';
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

  // Boutique Info
  const boutiqueInfo = {
    name: params.slug === 'techzone' ? 'TechZone' : params.slug === 'beauty-world' ? 'Beauty World' : 'Style & Mode',
    slug: params.slug,
    badge: 'Commerçant Vérifié 👑',
    rating: '4,9',
    reviewsCount: 1240,
    location: 'Dakar Plateau • Rue Carnot x Avenue Ponty',
    deliveryTime: 'Livraison 24h Dakar',
    whatsapp: '221771234567',
    phone: '+221 77 123 45 67',
    coverImage: '/images/boutiques/cover_style_mode.jpg',
    description: 'Boutique officielle de prêt-à-porter sénégalais, Bazin riche brodé, sneakers authentiques et maroquinerie de luxe.',
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

  const categories = ['Tous', 'Boubous & Bazin', 'Chaussures', 'Homme', 'Femme', 'Accessoires'];

  const filteredProducts = products
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
      {/* ================= 1. HEADER PRESTIGE DE LA BOUTIQUE ================= */}
      <section className="bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Fil d'Ariane & Retour */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Link
              href="/boutiques"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-amber-600 transition group"
            >
              <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition">
                <ArrowLeft className="w-4 h-4 stroke-[2.2px]" />
              </div>
              <span>Retour à toutes les boutiques</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[11px] font-bold px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Boutique Ouverte en direct</span>
              </span>
            </div>
          </div>

          {/* Carte d'Identité Boutique */}
          <div className="pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              {/* Monogramme / Logo */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#071328] text-white flex flex-col items-center justify-center flex-shrink-0 shadow-md border-2 border-amber-400">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">MB VIP</span>
                <span className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white">SM</span>
              </div>

              {/* Titre, Adresse & Étoiles */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {boutiqueInfo.name}
                  </h1>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                    {boutiqueInfo.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium max-w-xl">
                  {boutiqueInfo.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    {boutiqueInfo.location}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-black text-slate-950 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{boutiqueInfo.rating}</span>
                    <span className="text-[10px] font-medium text-slate-400">({boutiqueInfo.reviewsCount} avis)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'Action Directe (WhatsApp & Contact) */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <a
                href={`https://wa.me/${boutiqueInfo.whatsapp}?text=Bonjour%20${encodeURIComponent(boutiqueInfo.name)}%2C%20je%20souhaite%20commander%20un%20article%20sur%20Malick%20Buss`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-full transition shadow-xs active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Boutique</span>
              </a>

              <a
                href={`tel:${boutiqueInfo.whatsapp}`}
                className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-full transition"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Appeler</span>
              </a>
            </div>
          </div>

          {/* Bandeau de Réassurance Achat Rapide */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Livraison express à Dakar en 24h chrono</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Paiement Wave, Orange Money ou Espèces à la remise</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Garantie authenticité & échange sous 48h</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. RECHERCHE ET RAYONS DE LA BOUTIQUE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Recherche interne à la boutique */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Rechercher dans ${boutiqueInfo.name}...`}
                className="w-full bg-[#f4f5f7] focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-200/80 focus:border-amber-400 focus:outline-none transition"
              />
            </div>

            {/* Nombre d'articles */}
            <div className="text-xs font-semibold text-slate-500">
              <strong className="text-slate-900 font-black">{filteredProducts.length}</strong> article{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
            </div>
          </div>

          {/* Filtres Rayons en Capsules */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-full transition flex-shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#0c1527] text-amber-400 shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. GRILLE DES PRODUITS OPTIMISÉE POUR ACHAT RAPIDE ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-2xs space-y-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Aucun article trouvé</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Aucun produit ne correspond à vos filtres actuels. Réinitialisez la recherche pour voir tous les articles de {boutiqueInfo.name}.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Tous');
                setSearchTerm('');
              }}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-full transition"
            >
              Voir tout le catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Produit & Badge */}
                <div>
                  <div className="relative aspect-[4/4] sm:aspect-[4/4.2] w-full overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badge État */}
                    {product.tag && (
                      <span className="absolute top-2.5 left-2.5 z-10 bg-slate-950/85 backdrop-blur-md text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                        {product.tag}
                      </span>
                    )}

                    {/* Bouton WhatsApp Direct Flottant sur Image */}
                    <a
                      href={`https://wa.me/${boutiqueInfo.whatsapp}?text=Bonjour%20${encodeURIComponent(boutiqueInfo.name)}%2C%20je%20veux%20commander%20l'article%20%3A%20${encodeURIComponent(product.title)}%20(${formatFCFA(product.price)})`}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md opacity-90 hover:opacity-100 hover:scale-105 transition"
                      title="Commander directement sur WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Détails Produit */}
                  <div className="p-3.5 sm:p-4 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {product.category}
                    </span>

                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition line-clamp-2 leading-snug min-h-[2.5rem]">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-slate-800 font-black ml-1 text-xs">{product.rating}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Prix en grand FCFA */}
                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="text-sm sm:text-base font-black text-slate-950">
                        {formatFCFA(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatFCFA(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ================= BOUTONS D'ACHAT EN 2 CLICS MAX ================= */}
                <div className="p-3 sm:p-4 pt-0 space-y-2">
                  {/* Bouton Acheter Directement en 2 Clics */}
                  <button
                    onClick={() => handleOpenExpressBuy(product)}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs py-2.5 px-3 rounded-full transition shadow-xs flex items-center justify-center gap-1.5 tracking-tight"
                  >
                    <Zap className="w-3.5 h-3.5 stroke-[2.5px] fill-slate-950" />
                    <span>Acheter en 2 Clics</span>
                  </button>

                  {/* Bouton Ajouter au Panier */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs py-2 px-3 rounded-full transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
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
