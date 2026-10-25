'use client';

import Link from 'next/link';
import { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import {
  Search,
  Star,
  Crown,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Store,
  X,
  Sparkles,
  Zap,
  Phone,
  MessageCircle,
  Truck,
  RotateCcw,
  Flame,
} from 'lucide-react';

interface Boutique {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  rating: string;
  ratingNum: number;
  reviews: string;
  reviewsCount: number;
  tags: string[];
  category: string;
  monogram: string;
  location: string;
  district: string;
  coverImage: string;
  productsCount: string;
  badge: string;
  whatsapp: string;
  isPromo?: boolean;
  promoBadge?: string;
  discountText?: string;
  isNew?: boolean;
  newBadge?: string;
}

const BOUTIQUES_DATA: Boutique[] = [
  {
    id: '1',
    name: 'Style & Mode',
    slug: 'style-and-mode',
    subtitle: 'Prêt-à-porter, sneakers haut de gamme & accessoires tendance...',
    rating: '4,9',
    ratingNum: 4.9,
    reviews: '(1,2k avis)',
    reviewsCount: 1240,
    tags: ['Mode', 'Chaussures', 'Accessoires', 'Artisanat', 'Promos'],
    category: 'Mode',
    monogram: 'SM',
    location: 'Dakar',
    district: 'Plateau • Rue Carnot',
    coverImage: '/images/boutiques/cover_style_mode.jpg',
    productsCount: '+ 340 articles',
    badge: '👑 Vendeur Officiel',
    whatsapp: '221771234567',
    isPromo: true,
    promoBadge: '🔥 -30% Solde Dakar',
    discountText: 'Jusqu’à -30% sur collection Bazin & Sneakers',
  },
  {
    id: '2',
    name: 'Beauty World',
    slug: 'beauty-world',
    subtitle: 'Parfums de luxe, soins bio & cosmétiques naturels certifiés...',
    rating: '4,8',
    ratingNum: 4.8,
    reviews: '(756 avis)',
    reviewsCount: 756,
    tags: ['Beauté', 'Parfums', 'Soins', 'Promos'],
    category: 'Beauté',
    monogram: 'BW',
    location: 'Dakar',
    district: 'Almadies • Route des Almadies',
    coverImage: '/images/boutiques/cover_beauty_world.jpg',
    productsCount: '+ 185 articles',
    badge: '✨ Coup de Cœur',
    whatsapp: '221778901234',
    isPromo: true,
    promoBadge: '🔥 Vente Flash Beauté',
    discountText: '1 Soin bio offert pour tout achat parfum de luxe',
  },
  {
    id: '3',
    name: 'TechZone',
    slug: 'techzone',
    subtitle: 'Smartphones récents, ordinateurs portables, audio & high-tech...',
    rating: '4,8',
    ratingNum: 4.8,
    reviews: '(980 avis)',
    reviewsCount: 980,
    tags: ['Électronique', 'Informatique', 'Accessoires', 'Promos'],
    category: 'Électronique',
    monogram: 'TZ',
    location: 'Dakar',
    district: 'Médina • Centenaire',
    coverImage: '/images/boutiques/cover_techzone.jpg',
    productsCount: '+ 210 articles',
    badge: '⚡ Top Ventes High-Tech',
    whatsapp: '221765432109',
    isPromo: true,
    promoBadge: '🔥 -25% Promo High-Tech',
    discountText: '-25% sur écouteurs sans fil & chargeurs rapides',
  },
  {
    id: '4',
    name: 'Kids World',
    slug: 'kids-world',
    subtitle: 'Jeux d’éveil, vêtements enfants de marque, rentrée & puériculture...',
    rating: '4,8',
    ratingNum: 4.8,
    reviews: '(523 avis)',
    reviewsCount: 523,
    tags: ['Enfants', 'Jouets', 'Vêtements', 'Nouveauté'],
    category: 'Enfants',
    monogram: 'KW',
    location: 'Dakar',
    district: 'Mermoz • VDN',
    coverImage: '/images/boutiques/cover_kids_world.jpg',
    productsCount: '+ 190 articles',
    badge: '🧸 Espace Famille',
    whatsapp: '221781112233',
    isNew: true,
    newBadge: '✨ Nouvelle Boutique 2026',
  },
  {
    id: '5',
    name: 'Maison Chic',
    slug: 'maison-chic',
    subtitle: 'Salons contemporains, déco artisanale sénégalaise & mobilier design...',
    rating: '4,7',
    ratingNum: 4.7,
    reviews: '(421 avis)',
    reviewsCount: 421,
    tags: ['Maison', 'Décoration', 'Mobilier', 'Artisanat', 'Nouveauté'],
    category: 'Maison',
    monogram: 'MC',
    location: 'Dakar',
    district: 'Ngor • Virage',
    coverImage: '/images/boutiques/cover_maison_chic.jpg',
    productsCount: '+ 140 articles',
    badge: '🎨 Design & Confort',
    whatsapp: '221774445566',
    isNew: true,
    newBadge: '✨ Nouveau Déco Dakar',
  },
  {
    id: '6',
    name: 'Sport Max',
    slug: 'sport-max',
    subtitle: 'Équipements fitness, maillots officiels, running & nutrition sportive...',
    rating: '4,6',
    ratingNum: 4.6,
    reviews: '(367 avis)',
    reviewsCount: 367,
    tags: ['Sport', 'Fitness', 'Accessoires', 'Promos', 'Nouveauté'],
    category: 'Sport',
    monogram: 'SM',
    location: 'Dakar',
    district: 'Fann Résidence • Corniche',
    coverImage: '/images/boutiques/cover_sport_max.jpg',
    productsCount: '+ 165 articles',
    badge: '⚽ Performance Pro',
    whatsapp: '221769998877',
    isPromo: true,
    promoBadge: '🔥 -20% Flash Fitness',
    discountText: '-20% sur les maillots officiels & running',
    isNew: true,
    newBadge: '✨ Nouveau Sport',
  },
];

const CATEGORIES_LIST = [
  { label: 'Toutes', icon: 'solar:widget-2-bold-duotone', iconColor: 'text-amber-500' },
  { label: 'Bons Plans', icon: 'solar:fire-bold-duotone', iconColor: 'text-rose-500' },
  { label: 'Nouveautés', icon: 'solar:star-shine-bold-duotone', iconColor: 'text-amber-500' },
  { label: 'Mode', icon: 'solar:t-shirt-bold-duotone', iconColor: 'text-indigo-500' },
  { label: 'Beauté', icon: 'solar:magic-stick-3-bold-duotone', iconColor: 'text-pink-500' },
  { label: 'Électronique', icon: 'solar:devices-bold-duotone', iconColor: 'text-sky-500' },
  { label: 'Maison', icon: 'solar:armchair-2-bold-duotone', iconColor: 'text-emerald-500' },
  { label: 'Enfants', icon: 'ph:baby-duotone', iconColor: 'text-purple-500' },
  { label: 'Sport', icon: 'solar:running-round-bold-duotone', iconColor: 'text-teal-500' },
  { label: 'Artisanat', icon: 'solar:palette-round-bold-duotone', iconColor: 'text-amber-600' },
];

function ShopsListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filterParam = searchParams.get('filter');
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');
  const queryParam = searchParams.get('q');

  const [search, setSearch] = useState(queryParam || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (filterParam === 'promos') return 'Bons Plans';
    if (sortParam === 'newest') return 'Nouveautés';
    if (categoryParam) return categoryParam;
    return 'Toutes';
  });
  const [sortBy, setSortBy] = useState<'rating' | 'newest' | 'reviews' | 'name'>(
    sortParam === 'newest' ? 'newest' : 'rating'
  );

  useEffect(() => {
    if (filterParam === 'promos') {
      setSelectedCategory('Bons Plans');
    } else if (sortParam === 'newest') {
      setSelectedCategory('Nouveautés');
      setSortBy('newest');
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('Toutes');
      if (!sortParam) {
        setSortBy('rating');
      }
    }

    if (queryParam !== null) {
      setSearch(queryParam);
    } else {
      setSearch('');
    }
  }, [filterParam, categoryParam, sortParam, queryParam]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Toutes: BOUTIQUES_DATA.length,
      'Bons Plans': BOUTIQUES_DATA.filter((b) => b.isPromo || b.tags.includes('Promos')).length,
      Nouveautés: BOUTIQUES_DATA.filter((b) => b.isNew || b.tags.includes('Nouveauté')).length,
    };
    BOUTIQUES_DATA.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
      b.tags.forEach((tag) => {
        if (tag === 'Artisanat') {
          counts['Artisanat'] = (counts['Artisanat'] || 0) + 1;
        }
      });
    });
    return counts;
  }, []);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredBoutiques = useMemo(() => {
    return BOUTIQUES_DATA.filter((boutique) => {
      let matchesCategory = true;
      if (selectedCategory === 'Bons Plans') {
        matchesCategory = Boolean(boutique.isPromo || boutique.tags.includes('Promos'));
      } else if (selectedCategory === 'Nouveautés') {
        matchesCategory = Boolean(boutique.isNew || boutique.tags.includes('Nouveauté'));
      } else if (selectedCategory !== 'Toutes') {
        matchesCategory =
          boutique.category.toLowerCase() === selectedCategory.toLowerCase() ||
          boutique.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());
      }

      const matchesSearch =
        !normalizedSearch ||
        boutique.name.toLowerCase().includes(normalizedSearch) ||
        boutique.subtitle.toLowerCase().includes(normalizedSearch) ||
        boutique.district.toLowerCase().includes(normalizedSearch) ||
        boutique.location.toLowerCase().includes(normalizedSearch) ||
        boutique.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'newest') return Number(b.id) - Number(a.id);
      if (sortBy === 'rating') return b.ratingNum - a.ratingNum;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return a.name.localeCompare(b.name);
    });
  }, [normalizedSearch, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    router.push('/boutiques');
  };

  const handleSelectCategory = (catLabel: string) => {
    if (selectedCategory === catLabel && catLabel !== 'Toutes') {
      router.push('/boutiques');
    } else if (catLabel === 'Bons Plans') {
      router.push('/boutiques?filter=promos');
    } else if (catLabel === 'Nouveautés') {
      router.push('/boutiques?sort=newest');
    } else if (catLabel === 'Toutes') {
      router.push('/boutiques');
    } else {
      router.push(`/boutiques?category=${encodeURIComponent(catLabel)}`);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* ================= 1. HERO BANNER SANS BANDES NOIRES + EFFET SHIMMER ================= */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-slate-200/60 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-900/10">
          <img
            src="/images/boutiques/dakar_sunset_banner.png"
            alt="Les meilleures boutiques du Sénégal, réunies ici"
            className="w-full h-auto object-cover block"
          />

          {/* Effet Shimmer lumineux au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Halo d'ambiance doré subtil */}
          <div className="absolute -inset-px rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-amber-400/40 transition-colors duration-500 pointer-events-none" />
        </div>

        {/* ================= 2. BARRE DE RECHERCHE, FILTRES & TRI ================= */}
        <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-3.5">
          {/* Ligne 1 : Recherche & Tri */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Champ de recherche avec micro-interaction */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2.2px]" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une boutique, catégorie, marque, quartier..."
                className="w-full bg-[#f8fafc] text-xs pl-11 pr-10 py-2.5 rounded-full border border-slate-200/80 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 transition hover:rotate-90 cursor-pointer"
                  aria-label="Effacer la recherche"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sélecteur de Tri */}
            <div className="flex items-center justify-end gap-2 text-xs font-semibold text-slate-500 shrink-0">
              <span className="whitespace-nowrap">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer transition shadow-2xs"
              >
                <option value="rating">Mieux notées ★</option>
                <option value="newest">Nouveautés ✨</option>
                <option value="reviews">Plus d&apos;avis</option>
                <option value="name">Alphabétique (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Séparateur subtil et propre */}
          <div className="h-px bg-slate-100 w-full" />

          {/* Ligne 2 : FILTRES AVEC 'BONS PLANS' ET 'NOUVEAUTÉS' DYNAMIQUES */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCategory === cat.label;
              const count = categoryCounts[cat.label] || 0;
              const isPromoTab = cat.label === 'Bons Plans';
              const isNewTab = cat.label === 'Nouveautés';

              let activeStyles = 'text-slate-950 font-black bg-gradient-to-r from-amber-400 to-amber-300 shadow-xs border border-amber-500/30 ring-2 ring-amber-400/20';
              if (isPromoTab) {
                activeStyles = 'text-white font-black bg-gradient-to-r from-rose-600 to-amber-500 shadow-xs border border-rose-600 ring-2 ring-rose-400/30';
              } else if (isNewTab) {
                activeStyles = 'text-slate-950 font-black bg-gradient-to-r from-amber-400 to-amber-300 shadow-xs border border-amber-500/30 ring-2 ring-amber-400/20';
              }

              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => handleSelectCategory(cat.label)}
                  className={`group relative text-xs font-bold px-3.5 py-2 rounded-full whitespace-nowrap transition-all duration-200 flex items-center gap-2 select-none shrink-0 cursor-pointer ${
                    isActive
                      ? activeStyles
                      : 'text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 shadow-2xs'
                  }`}
                >
                  <Icon
                    icon={cat.icon}
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? isPromoTab
                          ? 'text-white'
                          : 'text-slate-950'
                        : cat.iconColor
                    }`}
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? isPromoTab ? 'bg-white/20 text-white' : 'bg-slate-950/15 text-slate-950'
                        : 'bg-slate-200/80 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 3. BANNIÈRE DÉDIÉE SI BONS PLANS OU NOUVEAUTÉS ================= */}
        {selectedCategory === 'Bons Plans' && (
          <div className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white p-4 sm:p-5 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Icon icon="solar:fire-bold-duotone" className="w-4 h-4 text-white" />
                <span>Ventes Flash & Bons Plans Dakar</span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight">
                Profitez de réductions jusqu’à -50% dans les boutiques de Dakar
              </h3>
              <p className="text-xs text-rose-100 font-medium">
                Offres exclusives valables sur Malick Buss avec livraison express 24h.
              </p>
            </div>
            <span className="shrink-0 bg-white text-rose-600 font-extrabold text-xs px-4 py-2 rounded-full shadow-md">
              {filteredBoutiques.length} boutiques en promo
            </span>
          </div>
        )}

        {selectedCategory === 'Nouveautés' && (
          <div className="bg-gradient-to-r from-[#0c1a35] via-[#162a52] to-amber-500/80 text-white p-4 sm:p-5 rounded-3xl shadow-lg border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Icon icon="solar:star-shine-bold-duotone" className="w-4 h-4 text-amber-400" />
                <span>Nouveautés Dakar</span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight">
                Les dernières boutiques et collections arrivées sur la marketplace
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                Découvrez les nouveaux arrivages et les commerces récemment certifiés.
              </p>
            </div>
            <span className="shrink-0 bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-full shadow-md">
              {filteredBoutiques.length} nouvelles boutiques
            </span>
          </div>
        )}

        {/* ================= 4. TITRE DE SECTION AVEC COMPTEUR DYNAMIQUE ================= */}
        <div className="flex items-center justify-between pt-1 px-1">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                {selectedCategory === 'Bons Plans' ? (
                  <>
                    <Flame className="w-5 h-5 text-rose-500 stroke-[2.2px]" />
                    <span>🔥 Bons Plans & Réductions Dakar</span>
                  </>
                ) : selectedCategory === 'Nouveautés' ? (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-500 stroke-[2.2px]" />
                    <span>✨ Dernières Nouveautés à Dakar</span>
                  </>
                ) : selectedCategory === 'Artisanat' ? (
                  <>
                    <Crown className="w-5 h-5 text-amber-500 stroke-[2.2px]" />
                    <span>🇸🇳 Artisanat & Créations Sénégalaises</span>
                  </>
                ) : (
                  <>
                    <Store className="w-5 h-5 text-amber-500 stroke-[2.2px]" />
                    <span>Boutiques vérifiées à Dakar</span>
                  </>
                )}
              </h2>
              <span className="text-xs font-extrabold bg-amber-400/20 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                {filteredBoutiques.length} {filteredBoutiques.length > 1 ? 'disponibles' : 'disponible'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Commandez en 2 clics avec Wave, Orange Money ou paiement à la livraison.
            </p>
          </div>

          {/* Bouton reset / voir tout */}
          {selectedCategory !== 'Toutes' || search ? (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition select-none shadow-xs active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Afficher tout ({BOUTIQUES_DATA.length})</span>
            </button>
          ) : (
            <div className="text-xs font-bold text-slate-400 hidden sm:flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Catalogue 100% vérifié</span>
            </div>
          )}
        </div>

        {/* ================= 5. GRILLE DES BOUTIQUES ================= */}
        {filteredBoutiques.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoutiques.map((shop) => (
              <div
                key={shop.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Couverture Panoramique avec Zoom fluide au survol */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={shop.coverImage}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Gradient protecteur élégant */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20 pointer-events-none" />

                    {/* Badge Boutique Vérifiée / Promo / Nouveauté */}
                    {shop.isPromo && shop.promoBadge ? (
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md shadow-rose-950/40 backdrop-blur-xs">
                        <Flame className="w-3.5 h-3.5 stroke-[2.5px] fill-amber-300" />
                        <span>{shop.promoBadge}</span>
                      </div>
                    ) : shop.newBadge ? (
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
                        <Sparkles className="w-3.5 h-3.5 stroke-[2.5px]" />
                        <span>{shop.newBadge}</span>
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#059669] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md shadow-emerald-900/30 backdrop-blur-xs">
                        <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5px]" />
                        <span>Boutique vérifiée</span>
                      </div>
                    )}

                    {/* Badges Localisation & Articles */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                      <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{shop.location}</span>
                      </span>
                      <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                        {shop.productsCount}
                      </span>
                    </div>

                    {/* Monogramme Circulaire */}
                    <div className="absolute -bottom-6 left-5 z-20 w-12 h-12 rounded-full bg-slate-950 text-white border-2 border-white flex flex-col items-center justify-center shadow-lg group-hover:border-amber-400 transition-colors">
                      <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400 -mb-0.5" />
                      <span className="font-black text-xs tracking-tight leading-none">
                        {shop.monogram}
                      </span>
                    </div>

                    {/* Badge de distinction en bas à droite de l'image */}
                    <div className="absolute bottom-2.5 right-3 z-10 text-[10px] font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-400/30">
                      {shop.badge}
                    </div>
                  </div>

                  {/* Informations de la Boutique */}
                  <div className="pt-8 px-5 pb-3 space-y-2">
                    {/* Titre & Note */}
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/boutiques/${shop.slug}/produits`}
                        className="font-extrabold text-base text-slate-900 group-hover:text-amber-600 transition flex items-center gap-1.5 truncate"
                      >
                        <span className="truncate">{shop.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                      </Link>

                      <div className="flex items-center gap-1 text-xs font-black text-slate-950 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        <span>{shop.rating}</span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {shop.reviews}
                        </span>
                      </div>
                    </div>

                    {/* Quartier / Adresse */}
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{shop.district}</span>
                    </div>

                    {/* Sous-titre descriptif */}
                    <p className="text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">
                      {shop.subtitle}
                    </p>

                    {/* Offre Promo Spéciale en avant */}
                    {shop.discountText && (
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-100">
                        <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{shop.discountText}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags & Boutons d'actions */}
                <div className="px-5 pb-5 pt-3 space-y-3 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {shop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-amber-50 group-hover:text-amber-800 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    {/* Bouton Visiter les produits / Pleine largeur */}
                    <Link
                      href={`/boutiques/${shop.slug}/produits`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0c1527] hover:bg-amber-400 text-white hover:text-slate-950 font-extrabold text-xs py-3 px-4 rounded-2xl transition-all duration-200 shadow-xs group/btn"
                    >
                      <span>Visiter les produits</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ================= ÉTAT VIDE ÉLÉGANT AVEC BOUTON DE RÉINITIALISATION ================= */
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/90 shadow-xs max-w-md mx-auto space-y-4 my-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <Store className="w-8 h-8 stroke-[1.8px]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">
                Aucune boutique trouvée
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Aucun résultat pour cette recherche ou catégorie. Réinitialisez le filtre pour voir toutes nos boutiques.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-full transition shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Voir toutes les boutiques ({BOUTIQUES_DATA.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopsListPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#f8f9fa] min-h-screen py-16 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ShopsListContent />
    </Suspense>
  );
}
