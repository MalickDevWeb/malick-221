'use client';

import React, { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronLeft,
  ChevronRight,
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

  // Carrousel de Bannières Publicitaires & Annonces Sponsorisées
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const AD_SLIDES = useMemo(
    () => [
      {
        id: 'sunset-banner',
        type: 'image' as const,
        image: '/images/boutiques/dakar_sunset_banner.png',
        alt: 'Les meilleures boutiques du Sénégal, réunies ici.',
        link: '/boutiques',
      },
      {
        id: 'flash-promo',
        type: 'promo' as const,
        tag: '⚡ VENTES FLASH & PUBLICITÉ',
        tagColor: 'bg-rose-500 text-white',
        title: "Jusqu'à -50% de réduction immédiate",
        highlight: 'sur les boutiques partenaires',
        subtitle:
          'Style & Mode, TechZone, Maison Chic : découvrez les meilleures offres avec livraison express 24h à Dakar.',
        ctaText: 'Profiter des réductions →',
        ctaLink: '/boutiques?filter=promos',
        bgGradient: 'from-rose-950 via-[#180a22] to-[#071328]',
        accentBadge: '🔥 Offre Limitée',
        coverImage: '/images/boutiques/cover_style_mode.jpg',
      },
      {
        id: 'star-techzone',
        type: 'promo' as const,
        tag: '👑 BOUTIQUE STAR DU MOIS',
        tagColor: 'bg-amber-400 text-slate-950 font-black',
        title: "TechZone Médina : Nouveautés High-Tech",
        highlight: 'Garanties 1 an',
        subtitle:
          'Smartphones, ordinateurs portables, écouteurs sans fil et accessoires high-tech. Livraison express en 2h à Dakar.',
        ctaText: 'Visiter la boutique TechZone →',
        ctaLink: '/boutiques/techzone/produits',
        bgGradient: 'from-[#071328] via-[#0c224a] to-[#061224]',
        accentBadge: '⚡ Vendeur Officiel Certifié',
        coverImage: '/images/boutiques/cover_techzone.jpg',
      },
      {
        id: 'sponsor-vendor',
        type: 'promo' as const,
        tag: '📢 ESPACE ANNONCEURS & COMMERÇANTS',
        tagColor: 'bg-emerald-500 text-white font-black',
        title: 'Faites votre publicité sur Malick Buss',
        highlight: '+50 000 clients à Dakar',
        subtitle:
          'Mettez votre boutique en tête de liste et multipliez vos ventes en ligne. 1er mois de visibilité sponsorisée offert !',
        ctaText: 'Devenir boutique vedette →',
        ctaLink: '/vendeur/accueil',
        bgGradient: 'from-[#052216] via-[#0c3a27] to-[#07172b]',
        accentBadge: '🚀 Boost Vendeur',
        coverImage: '/images/boutiques/cover_maison_chic.jpg',
      },
    ],
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % AD_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [AD_SLIDES.length]);

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
        {/* ================= 1. CARROUSEL DE BANNIÈRES PUBLICITAIRES & PROMOS ================= */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 group">
          <AnimatePresence mode="wait">
            {AD_SLIDES[currentAdIndex].type === 'image' ? (
              <motion.div
                key={AD_SLIDES[currentAdIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="relative w-full overflow-hidden bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-slate-900/10 cursor-pointer"
                onClick={() => router.push(AD_SLIDES[currentAdIndex].link)}
              >
                <img
                  src={AD_SLIDES[currentAdIndex].image}
                  alt={AD_SLIDES[currentAdIndex].alt}
                  className="w-full h-auto object-cover block"
                />
                {/* Effet Shimmer lumineux au survol */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              </motion.div>
            ) : (
              <motion.div
                key={AD_SLIDES[currentAdIndex].id}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.45 }}
                className={`relative w-full min-h-[190px] sm:min-h-[220px] md:min-h-[240px] bg-gradient-to-r ${AD_SLIDES[currentAdIndex].bgGradient} text-white p-5 sm:p-7 md:p-9 flex flex-col justify-center overflow-hidden`}
              >
                {/* Photo de fond stylisée en transparence */}
                {AD_SLIDES[currentAdIndex].coverImage && (
                  <div className="absolute inset-y-0 right-0 w-1/2 sm:w-2/5 overflow-hidden pointer-events-none">
                    <img
                      src={AD_SLIDES[currentAdIndex].coverImage}
                      alt="Illustration Publicité"
                      className="w-full h-full object-cover object-center opacity-30 sm:opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                  </div>
                )}

                {/* Contenu Texte de la Publicité */}
                <div className="relative z-10 max-w-xl space-y-2 sm:space-y-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs ${AD_SLIDES[currentAdIndex].tagColor}`}
                    >
                      {AD_SLIDES[currentAdIndex].tag}
                    </span>
                    {AD_SLIDES[currentAdIndex].accentBadge && (
                      <span className="text-[10px] sm:text-xs font-bold text-amber-300 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15">
                        {AD_SLIDES[currentAdIndex].accentBadge}
                      </span>
                    )}
                  </div>

                  <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight">
                    {AD_SLIDES[currentAdIndex].title}{' '}
                    {AD_SLIDES[currentAdIndex].highlight && (
                      <span className="text-amber-400 block sm:inline">
                        {AD_SLIDES[currentAdIndex].highlight}
                      </span>
                    )}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 font-medium leading-relaxed max-w-lg">
                    {AD_SLIDES[currentAdIndex].subtitle}
                  </p>

                  <div className="pt-1.5">
                    <Link
                      href={AD_SLIDES[currentAdIndex].ctaLink}
                      className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md transition-all active:scale-95 group/btn"
                    >
                      <span>{AD_SLIDES[currentAdIndex].ctaText}</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flèches de navigation Suivant / Précédent */}
          <button
            type="button"
            onClick={() =>
              setCurrentAdIndex(
                (prev) => (prev - 1 + AD_SLIDES.length) % AD_SLIDES.length
              )
            }
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 cursor-pointer shadow-md"
            aria-label="Publicité précédente"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
          </button>

          <button
            type="button"
            onClick={() =>
              setCurrentAdIndex((prev) => (prev + 1) % AD_SLIDES.length)
            }
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 cursor-pointer shadow-md"
            aria-label="Publicité suivante"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
          </button>

          {/* Indicateurs de pagination (Pills animées) */}
          <div className="absolute bottom-2.5 right-4 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {AD_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentAdIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentAdIndex === idx
                    ? 'w-6 h-1.5 bg-amber-400'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Aller au slide publicitaire ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ================= 2. BARRE UNIQUE DE FILTRES PAR RAYONS & TRI ================= */}
        <div className="bg-white p-2.5 sm:p-3 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* FILTRES AVEC ANIMATION MOTION DESIGN & SLIDING LAYOUTID */}
          <div className="relative flex items-center gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 px-0.5 flex-1 min-w-0">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCategory === cat.label;
              const count = categoryCounts[cat.label] || 0;
              const isPromoTab = cat.label === 'Bons Plans';
              const isNewTab = cat.label === 'Nouveautés';

              return (
                <motion.button
                  key={cat.label}
                  type="button"
                  whileHover={{ y: -1.5, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                  onClick={() => handleSelectCategory(cat.label)}
                  className={`group relative text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 select-none shrink-0 cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? isPromoTab
                        ? 'text-white font-black'
                        : 'text-slate-950 font-black'
                      : 'text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/90 shadow-2xs border border-transparent hover:border-slate-300/50'
                  }`}
                >
                  {/* Fond animé glissant (Motion Design Pill) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBoutiqueFilter"
                      className={`absolute inset-0 rounded-full shadow-md ${
                        isPromoTab
                          ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 shadow-rose-600/30 border border-rose-400'
                          : isNewTab
                          ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 shadow-amber-500/25 border border-amber-500/30'
                          : 'bg-gradient-to-r from-amber-400 to-amber-300 shadow-amber-500/25 border border-amber-500/30'
                      }`}
                      transition={{ type: 'spring', stiffness: 480, damping: 32 }}
                    />
                  )}

                  {/* Contenu de la pilule au-dessus de l'animation */}
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.span
                      animate={isActive ? { scale: [1, 1.25, 1], rotate: [0, -8, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="shrink-0 flex items-center"
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
                    </motion.span>

                    <span className="tracking-tight">{cat.label}</span>

                    <motion.span
                      layout
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? isPromoTab
                            ? 'bg-white/25 text-white'
                            : 'bg-slate-950/15 text-slate-950'
                          : 'bg-slate-200/80 text-slate-600 group-hover:bg-slate-300/80'
                      }`}
                    >
                      {count}
                    </motion.span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Séparateur vertical desktop */}
          <div className="hidden md:block w-px h-7 bg-slate-200 shrink-0" />

          {/* Sélecteur de Tri Compact */}
          <div className="flex items-center justify-between md:justify-end gap-2 text-xs font-semibold text-slate-500 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
            <span className="whitespace-nowrap text-slate-400 font-medium">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-full px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer transition shadow-2xs"
            >
              <option value="rating">Mieux notées ★</option>
              <option value="newest">Nouveautés ✨</option>
              <option value="reviews">Plus d&apos;avis</option>
              <option value="name">Nom (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Tag de recherche active si recherché depuis le header */}
        {search && (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full w-fit animate-in fade-in">
            <span>Recherche active : <strong className="text-slate-900 font-bold">&quot;{search}&quot;</strong></span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-slate-400 hover:text-slate-700 hover:rotate-90 transition p-0.5 cursor-pointer"
              title="Effacer la recherche"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

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
                        className="font-extrabold text-base text-slate-900 group-hover:text-amber-600 transition flex items-center gap-2 truncate"
                      >
                        <span className="truncate">{shop.name}</span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 shrink-0 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Vérifiée</span>
                        </span>
                      </Link>

                      <div className="flex items-center gap-1 text-xs font-black text-slate-950 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 shrink-0 shadow-2xs">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
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

                {/* Tags & Boutons d'actions toujours alignés en bas de la carte */}
                <div className="mt-auto px-5 pb-5 pt-3 space-y-3 border-t border-slate-100 bg-white">
                  <div className="flex flex-wrap items-center gap-1.5 min-h-[26px]">
                    {shop.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Boutons d'actions : WhatsApp Direct + Visiter les produits */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(
                        `Bonjour ${shop.name}, je vous contacte depuis la marketplace Malick Buss !`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all duration-200 shadow-sm shadow-emerald-500/20 active:scale-95 shrink-0 cursor-pointer"
                      title={`Contacter ${shop.name} directement sur WhatsApp`}
                      aria-label={`WhatsApp ${shop.name}`}
                    >
                      <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                    </a>

                    <Link
                      href={`/boutiques/${shop.slug}/produits`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0c1527] hover:bg-amber-400 text-white hover:text-slate-950 font-extrabold text-xs py-3 px-4 rounded-2xl transition-all duration-200 shadow-xs group/btn active:scale-95"
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
