'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  X,
  Sparkles,
  ChevronRight,
  ShoppingBag,
  Smartphone,
  Heart,
  Home,
  Flame,
  Baby,
  Store,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Compass,
  LayoutGrid,
  Layers,
  Clock,
  Truck,
  Star,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  itemCount: string;
  popularItems: string[];
  image: string;
  href: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  glowColor: string;
  icon: any;
  featured?: boolean;
  rating: string;
  salesCount: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'mode',
    title: 'Mode & Friperie',
    tagline: 'L’élégance sénégalaise & le style streetwear',
    description: 'Bazin riche Getzner brodé, friperie vintage de premier choix, sneakers authentiques et robes de cérémonie.',
    itemCount: '1 420 articles',
    popularItems: ['Bazin Riche', 'Sneakers Nike', 'Robes Soirée', 'Jeans Délavés', 'Sacs Cuir'],
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=85',
    href: '/categories?category=mode',
    badge: 'Tendance Dakar 🔥',
    badgeColor: 'bg-amber-500 text-slate-950 font-black',
    accentColor: 'text-amber-500',
    glowColor: 'group-hover:shadow-amber-500/15 group-hover:border-amber-400',
    icon: ShoppingBag,
    featured: true,
    rating: '4.9 ★',
    salesCount: '1 240 ventes cette semaine',
  },
  {
    id: 'electronique',
    title: 'Électronique & High-Tech',
    tagline: 'Smartphones, audio haute-fidélité & ordinateurs',
    description: 'iPhones neufs et reconditionnés garantis, montres connectées, MacBook et accessoires charge rapide.',
    itemCount: '890 articles',
    popularItems: ['iPhones 15/16', 'AirPods Pro', 'MacBook M3', 'Powerbanks', 'Smart TV'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85',
    href: '/categories?category=electronique',
    badge: 'Garantie 12 Mois ✓',
    badgeColor: 'bg-blue-600 text-white font-bold',
    accentColor: 'text-blue-500',
    glowColor: 'group-hover:shadow-blue-500/15 group-hover:border-blue-400',
    icon: Smartphone,
    rating: '4.8 ★',
    salesCount: '830 ventes cette semaine',
  },
  {
    id: 'beaute',
    title: 'Beauté & Cosmétiques',
    tagline: 'Parfums d’exception, soins naturels & maquillage',
    description: 'Parfums originaux de Dubaï et de Paris, encens khamaré traditionnel, crèmes de karité et maquillage professionnel.',
    itemCount: '630 articles',
    popularItems: ['Khamaré Bio', 'Parfums Dubaï', 'Gommage Éclat', 'Rouges à lèvres'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85',
    href: '/categories?category=beaute',
    badge: '100% Authentique',
    badgeColor: 'bg-rose-500 text-white font-bold',
    accentColor: 'text-rose-500',
    glowColor: 'group-hover:shadow-rose-500/15 group-hover:border-rose-400',
    icon: Heart,
    rating: '4.9 ★',
    salesCount: '590 ventes cette semaine',
  },
  {
    id: 'maison',
    title: 'Maison & Décoration',
    tagline: 'Mobilier contemporain & artisanat d’art dakarois',
    description: 'Salons en velours, tableaux et sculptures d’artisans locaux, luminaires chaleureux et linge de maison raffiné.',
    itemCount: '450 articles',
    popularItems: ['Canapés Velours', 'Tableaux Peints', 'Tapis Berbères', 'Luminaires'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
    href: '/categories?category=maison',
    badge: 'Artisanat Sénégalais 🇸🇳',
    badgeColor: 'bg-emerald-600 text-white font-bold',
    accentColor: 'text-emerald-500',
    glowColor: 'group-hover:shadow-emerald-500/15 group-hover:border-emerald-400',
    icon: Home,
    rating: '4.7 ★',
    salesCount: '340 ventes cette semaine',
  },
  {
    id: 'sport',
    title: 'Sport & Fitness',
    tagline: 'Performances, nutrition sportive & tenues d’entraînement',
    description: 'Survêtements respirants, chaussures de running pour la corniche de Dakar, haltères et tapis de fitness.',
    itemCount: '320 articles',
    popularItems: ['Tenues Running', 'Tapis de Yoga', 'Haltères Pro', 'Gourdes Inox'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
    href: '/categories?category=sport',
    badge: 'Livraison Express 2h',
    badgeColor: 'bg-orange-500 text-white font-bold',
    accentColor: 'text-orange-500',
    glowColor: 'group-hover:shadow-orange-500/15 group-hover:border-orange-400',
    icon: Flame,
    rating: '4.8 ★',
    salesCount: '270 ventes cette semaine',
  },
  {
    id: 'enfants',
    title: 'Enfants & Bébés',
    tagline: 'Confort, jouets d’éveil & univers des tout-petits',
    description: 'Vêtements en coton peigné hypoallergénique, poussettes tout-terrain, jeux éducatifs et mobilier de chambre bébé.',
    itemCount: '280 articles',
    popularItems: ['Poussettes', 'Jeux d’Éveil', 'Pyjamas Coton', 'Chaises Hautes'],
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=85',
    href: '/categories?category=enfants',
    badge: 'Sécurité Contrôlée',
    badgeColor: 'bg-purple-600 text-white font-bold',
    accentColor: 'text-purple-500',
    glowColor: 'group-hover:shadow-purple-500/15 group-hover:border-purple-400',
    icon: Baby,
    rating: '4.9 ★',
    salesCount: '210 ventes cette semaine',
  },
];

// Easing Apple strict extrait de la compétence animate
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function CategoriesPage() {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [viewMode, setViewMode] = useState<'bento' | 'grid'>('bento');
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    const query = searchParams.get('q') ?? '';
    setSelectedFilter(CATEGORIES.some((item) => item.id === category) ? category! : 'ALL');
    setSearchQuery(query);
  }, [searchParams]);

  const filteredCategories = CATEGORIES.filter((cat) => {
    const normalizeText = (value: string) =>
      value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
    const query = normalizeText(searchQuery.trim());
    if (!query) {
      if (selectedFilter === 'ALL') return true;
      return cat.id === selectedFilter;
    }
    const matchesSearch =
      normalizeText(cat.title).includes(query) ||
      normalizeText(cat.tagline).includes(query) ||
      normalizeText(cat.description).includes(query) ||
      cat.popularItems.some((item) => normalizeText(item).includes(query));

    if (!matchesSearch) return false;
    if (selectedFilter !== 'ALL' && cat.id !== selectedFilter) return false;
    return true;
  });

  return (
    <div className="w-full bg-[#fafbfc] min-h-screen pb-24 selection:bg-amber-400 selection:text-slate-950">
      
      {/* 1. Header Mobile Dédié (< md) - Écran 3 fidèle à la maquette */}
      <header className="sticky top-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-2xs">
        <Link href="/" className="flex items-center gap-2 text-slate-900 active:scale-95 transition">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-black text-base text-slate-900 tracking-tight">Catégories</h1>
        </Link>

        <button
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="text-slate-700 p-1.5 hover:bg-slate-100 rounded-full transition active:scale-90"
          aria-label="Rechercher une catégorie"
        >
          {showSearchInput ? <X className="w-5 h-5" /> : <Search className="w-5 h-5 stroke-[2px]" />}
        </button>
      </header>

      {/* Barre de recherche mobile déroulante */}
      {showSearchInput && (
        <div className="md:hidden px-4 py-2.5 bg-white border-b border-slate-100 animate-in slide-in-from-top-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher Bazin, iPhones, Parfums..."
              className="w-full bg-slate-50 text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:border-amber-400 focus:outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>
      )}

      {/* 2. Conteneur principal (Aéré et ultra-esthétique sur Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 space-y-6 md:space-y-10">
        
        {/* ================= HERO BANNER PRESTIGE DAKAR ================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="relative bg-gradient-to-br from-slate-950 via-[#0d1527] to-[#062e24] text-white rounded-3xl md:rounded-[36px] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl border border-slate-800/80"
        >
          {/* Cercles de lueur atmosphérique dorée et émeraude */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/20 via-amber-400/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-1/4 w-[420px] h-[420px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -mb-32" />

          {/* Motif subtil d'étoiles dorées */}
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            
            {/* Badge flottant prestige */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black backdrop-blur-md shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>MARKETPLACE MALICK BUSS • SÉNÉGAL 🇸🇳</span>
            </div>

            {/* Titre avec typographie moderne et contrastée */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Explorez nos Grands{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400">
                Univers Marchands
              </span>
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
              Mode de créateurs, tech authentique, trésors de beauté et artisanat dakarois.
              Achetez en toute confiance auprès de boutiques certifiées avec paiement instantané <strong>Wave</strong> & <strong>Orange Money</strong>.
            </p>

            {/* Pilules de réassurance immédiate */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 py-2 rounded-2xl backdrop-blur-md transition">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+4 000 Articles en stock</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 py-2 rounded-2xl backdrop-blur-md transition">
                <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Livraison Dakar 2h à 24h</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 py-2 rounded-2xl backdrop-blur-md transition">
                <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Garantie Satisfait ou Remboursé</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ================= BARRE D'INTERACTION & COMMUTATEUR BENTO ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-3 sm:p-4 shadow-sm space-y-3.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Titre de section & compteur */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black">
                <Compass className="w-5 h-5 stroke-[2.2px]" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  Rayons Disponibles ({filteredCategories.length})
                </h2>
                <p className="text-[11px] text-slate-400">
                  Sélectionnez un univers pour découvrir les boutiques et collections associées
                </p>
              </div>
            </div>

            {/* Raccourcis droite : Recherche + Commutateur de vue Bento/Grille */}
            <div className="flex items-center gap-2.5">
              {/* Recherche intégrée Desktop */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par mot-clé..."
                  className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-10 pr-8 py-2 rounded-2xl border border-slate-200 focus:border-amber-400 focus:outline-none transition placeholder:text-slate-400 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Boutons bascule de vue (Desktop uniquement) */}
              <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
                <button
                  onClick={() => setViewMode('bento')}
                  className={`p-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    viewMode === 'bento'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Vue Bento Immersive"
                >
                  <Layers className="w-4 h-4" />
                  <span className="text-[11px]">Bento</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    viewMode === 'grid'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Vue Grille Régulière"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-[11px]">Grille</span>
                </button>
              </div>
            </div>

          </div>

          {/* Onglets Filtres avec glissement animé */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`text-xs font-extrabold px-4 py-2 rounded-full whitespace-nowrap transition active:scale-95 ${
                selectedFilter === 'ALL'
                  ? 'bg-slate-950 text-amber-400 shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              Tous les univers ({CATEGORIES.length})
            </button>

            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`text-xs font-extrabold px-3.5 py-2 rounded-full whitespace-nowrap transition flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 stroke-[2.2px]" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= AFFICHAGE BENTO GRID PRESTIGE ================= */}
        {viewMode === 'bento' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            <AnimatePresence mode="popLayout">
              {filteredCategories.map((cat, index) => {
                const Icon = cat.icon;
                const isFirstFeatured = cat.id === 'mode' && selectedFilter === 'ALL' && !searchQuery;

                return (
                  <motion.div
                    layout
                    key={cat.id}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.45,
                      delay: shouldReduceMotion ? 0 : index * 0.06,
                      ease: EASE_OUT,
                    }}
                    whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                    className={`group relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between ${
                      cat.glowColor
                    } ${isFirstFeatured ? 'md:col-span-2 lg:col-span-2' : ''}`}
                  >
                    <Link href={cat.href} className="flex flex-col h-full">
                      
                      {/* Zone Image Pleine Hauteur avec Parallaxe doux */}
                      <div
                        className={`relative w-full overflow-hidden bg-slate-100 ${
                          isFirstFeatured ? 'h-64 sm:h-72 lg:h-80' : 'h-52 sm:h-60'
                        }`}
                      >
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />

                        {/* Dégradé cinématique sombre pour lisibilité */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                        {/* Badge prestige flottant en haut à gauche */}
                        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                          <span className={`text-[10px] md:text-xs px-3 py-1 rounded-full shadow-md ${cat.badgeColor}`}>
                            {cat.badge}
                          </span>
                          <span className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white font-bold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{cat.rating}</span>
                          </span>
                        </div>

                        {/* Badge de ventes en temps réel */}
                        <div className="absolute top-3.5 right-3.5">
                          <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-amber-300 font-semibold border border-amber-400/20">
                            {cat.salesCount}
                          </span>
                        </div>

                        {/* Contenu intégré au bas de l'image */}
                        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
                          <div className="space-y-1 max-w-md">
                            <div className="flex items-center gap-2">
                              <div className="w-9 h-9 rounded-2xl bg-white text-slate-950 flex items-center justify-center shadow-lg group-hover:bg-amber-400 group-hover:scale-110 transition-all">
                                <Icon className="w-5 h-5 stroke-[2.2px]" />
                              </div>
                              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-md">
                                {cat.title}
                              </h3>
                            </div>
                            <p className="text-xs text-slate-200 drop-shadow-sm font-medium line-clamp-1 pl-1">
                              {cat.tagline}
                            </p>
                          </div>

                          <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-slate-950 flex items-center justify-center shadow-lg group-hover:bg-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0">
                            <ArrowUpRight className="w-5 h-5 stroke-[2.5px]" />
                          </div>
                        </div>

                      </div>

                      {/* Description & Tags de Produits Populaires */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {cat.description}
                        </p>

                        {/* Tags de produits cliquables */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                            Articles les plus recherchés :
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.popularItems.map((item, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-bold text-slate-700 bg-slate-100 group-hover:bg-amber-50 group-hover:text-amber-800 px-2.5 py-1 rounded-xl transition-colors"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Barre d'action basse */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>{cat.itemCount}</span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                            <span>Voir le rayon</span>
                            <ChevronRight className="w-4 h-4 stroke-[2.5px] group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                      </div>

                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* ================= VUE GRILLE COMPACTE RÉGULIÈRE ================= */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
            {filteredCategories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  layout
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <Link href={cat.href} className="flex flex-col h-full">
                    <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 w-7 h-7 rounded-xl bg-white text-slate-900 flex items-center justify-center shadow-md">
                        <Icon className="w-3.5 h-3.5 stroke-[2.2px]" />
                      </div>
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                      <h3 className="font-black text-xs text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {cat.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 line-clamp-1">
                        {cat.itemCount}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ================= DOUBLE BANNIÈRE CALL-TO-ACTION IMMERSIVE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4"
        >
          {/* Carte 1 : Découvrir les boutiques par commerçant */}
          <Link
            href="/boutiques"
            className="group relative p-6 sm:p-7 bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 rounded-[32px] border border-amber-300/80 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all flex items-center justify-between overflow-hidden"
          >
            <div className="space-y-2 max-w-sm relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
                NOS 6 BOUTIQUES PARTENAIRES
              </span>
              <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                Vous préférez faire votre shopping par boutique ?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explorez <em>Style & Mode</em>, <em>Tech Dakar</em>, <em>Beauté & Senteurs</em> et découvrez leurs notes et avis vérifiés.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-700 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Voir la liste des boutiques</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="w-14 h-14 rounded-3xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all flex-shrink-0 ml-4 relative z-10">
              <Store className="w-7 h-7 stroke-[2.2px]" />
            </div>
          </Link>

          {/* Carte 2 : Devenir commerçant sur Malick Buss */}
          <Link
            href="/vendeur/accueil"
            className="group relative p-6 sm:p-7 bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 rounded-[32px] border border-emerald-300/80 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all flex items-center justify-between overflow-hidden"
          >
            <div className="space-y-2 max-w-sm relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-3 py-1 rounded-full">
                ESPACE BOUTIQUIER • 0 FCFA D'INSCRIPTION
              </span>
              <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                Vous êtes commerçant à Dakar ou dans les régions ?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ouvrez votre boutique en ligne en 2 minutes, publiez vos produits et encaissez directement via Wave et Orange Money.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Rejoindre la communauté marchande</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="w-14 h-14 rounded-3xl bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all flex-shrink-0 ml-4 relative z-10">
              <Sparkles className="w-7 h-7 stroke-[2.2px]" />
            </div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
