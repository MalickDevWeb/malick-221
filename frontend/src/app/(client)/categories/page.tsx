'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  Tag,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  itemCount: string;
  popularItems: string[];
  image: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  colorTheme: string;
  icon: any;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'mode',
    title: 'Mode & Friperie',
    subtitle: 'Vêtements vintage, Bazin, sneakers & sacs',
    itemCount: '1 420 articles',
    popularItems: ['Bazin Riche', 'Sneakers Nike', 'Robes Soirée', 'Jeans Vintage'],
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=80',
    href: '/categories/mode',
    badge: 'Tendance Dakar 🔥',
    badgeColor: 'bg-amber-500 text-slate-950 font-black',
    colorTheme: 'from-amber-500/20 to-orange-500/20 text-amber-600',
    icon: ShoppingBag,
  },
  {
    id: 'electronique',
    title: 'Électronique & High-Tech',
    subtitle: 'Smartphones, écouteurs, montres & PC',
    itemCount: '890 articles',
    popularItems: ['iPhones neufs', 'AirPods Pro', 'MacBook M3', 'Powerbanks'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80',
    href: '/categories/electronique',
    badge: 'Garantie 1 an',
    badgeColor: 'bg-blue-600 text-white font-bold',
    colorTheme: 'from-blue-500/20 to-indigo-500/20 text-blue-600',
    icon: Smartphone,
  },
  {
    id: 'beaute',
    title: 'Beauté & Cosmétiques',
    subtitle: 'Parfums d’Orient, soins de teint & make-up',
    itemCount: '630 articles',
    popularItems: ['Khamaré bio', 'Parfums Dubaï', 'Gommage peau', 'Rouges à lèvres'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    href: '/categories/beaute',
    badge: '100% Authentique',
    badgeColor: 'bg-rose-500 text-white font-bold',
    colorTheme: 'from-rose-500/20 to-pink-500/20 text-rose-600',
    icon: Heart,
  },
  {
    id: 'maison',
    title: 'Maison & Décoration',
    subtitle: 'Mobilier design, linge de lit & luminaires',
    itemCount: '450 articles',
    popularItems: ['Canapés velours', 'Tableaux déco', 'Tapis berbères', 'Diffuseurs'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80',
    href: '/categories/maison',
    badge: 'Artisanat local',
    badgeColor: 'bg-emerald-600 text-white font-bold',
    colorTheme: 'from-emerald-500/20 to-teal-500/20 text-emerald-600',
    icon: Home,
  },
  {
    id: 'sport',
    title: 'Sport & Fitness',
    subtitle: 'Tenues running, fitness, haltères & gourdes',
    itemCount: '320 articles',
    popularItems: ['Survêtements', 'Tapis de yoga', 'Haltères 10kg', 'Protéines'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80',
    href: '/categories/sport',
    badge: 'Livraison 24h',
    badgeColor: 'bg-slate-900 text-amber-400 font-bold',
    colorTheme: 'from-orange-500/20 to-amber-500/20 text-orange-600',
    icon: Flame,
  },
  {
    id: 'enfants',
    title: 'Enfants & Bébés',
    subtitle: 'Vêtements enfants, jouets d’éveil & biberons',
    itemCount: '280 articles',
    popularItems: ['Poussettes', 'Jouets Montessori', 'Pyjamas coton', 'Biberons'],
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=700&q=80',
    href: '/categories/enfants',
    badge: 'Sécurité certifiée',
    badgeColor: 'bg-purple-600 text-white font-bold',
    colorTheme: 'from-purple-500/20 to-violet-500/20 text-purple-600',
    icon: Baby,
  },
];

// Easing Apple conforme aux règles de la compétence animate
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function CategoriesPage() {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const filteredCategories = CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.popularItems.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedFilter !== 'ALL' && cat.id !== selectedFilter) return false;
    return true;
  });

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* 1. Header Mobile Dédié (< md) - Écran 3 fidèle à la maquette */}
      <header className="sticky top-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-2xs">
        <Link href="/" className="flex items-center gap-2 text-slate-900 active:scale-95 transition">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-black text-base text-slate-900 tracking-tight">Catégories</h1>
        </Link>

        <button
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="text-slate-700 p-1.5 hover:bg-slate-100 rounded-full transition active:scale-90"
          aria-label="Rechercher"
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
              placeholder="Filtrer mode, high-tech, beauté..."
              className="w-full bg-slate-50 text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:border-amber-400 focus:outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>
      )}

      {/* 2. Conteneur principal Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 space-y-6 md:space-y-8">
        
        {/* ================= HERO BANNER DESKTOP & TABLET ================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl md:rounded-[32px] p-6 md:p-10 overflow-hidden shadow-xl border border-slate-800"
        >
          {/* Lueur d'ambiance dorée / émeraude en arrière-plan */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3.5">
            {/* Badge animé */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Explorez 6 univers vérifiés à Dakar & au Sénégal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Toutes les Catégories de Produits
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Découvrez des milliers d'articles proposés en direct par les commerçants certifiés de Dakar.
              Profitez d'un paiement sécurisé par <strong>Wave</strong> ou <strong>Orange Money</strong> et d'une livraison express.
            </p>

            {/* Statistiques rapides avec effet de verre */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>+4 000 Références</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <Store className="w-4 h-4 text-amber-400" />
                <span>Boutiques 100% Vérifiées</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                <span>Nouveautés quotidiennes</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= FILTRES INTERACTIFS PAR ONGLET ================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Filtrer par univers ({filteredCategories.length})
            </h2>

            {/* Barre de recherche sur Desktop */}
            <div className="hidden md:flex items-center relative w-72">
              <Search className="w-4 h-4 absolute left-3.5 text-slate-400 stroke-[2px]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une catégorie..."
                className="w-full bg-white text-xs pl-10 pr-8 py-2 rounded-full border border-slate-200/90 focus:border-amber-400 focus:outline-none transition shadow-2xs placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Pilules horizontales avec scroll fluide et layoutId */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition active:scale-95 ${
                selectedFilter === 'ALL'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
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
                  className={`text-xs font-bold px-3.5 py-2 rounded-full whitespace-nowrap transition flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= GRILLE CINÉMATIQUE AVEC FRAMER MOTION ================= */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  layout
                  key={cat.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                    ease: EASE_OUT,
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
                  className="group relative bg-white rounded-2xl md:rounded-3xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-xl hover:shadow-amber-500/10 hover:border-amber-400/80 transition-colors flex flex-col justify-between"
                >
                  <Link href={cat.href} className="flex flex-col h-full">
                    {/* Zone Visuelle Image avec Zoom fluide */}
                    <div className="relative h-32 sm:h-36 lg:h-40 w-full overflow-hidden bg-slate-100">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* Dégradé doux sur image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Badge flottant en haut à gauche */}
                      {cat.badge && (
                        <div className="absolute top-2.5 left-2.5">
                          <span className={`text-[9px] md:text-[10px] px-2 py-0.5 rounded-full shadow-xs ${cat.badgeColor}`}>
                            {cat.badge}
                          </span>
                        </div>
                      )}

                      {/* Icône de catégorie en bas à gauche */}
                      <div className="absolute bottom-2.5 left-2.5 w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-md group-hover:bg-amber-400 transition-colors">
                        <Icon className="w-4 h-4 stroke-[2.2px]" />
                      </div>

                      {/* Bouton de raccourci en haut à droite */}
                      <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1 transition-all">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Zone de Contenu Textuel */}
                    <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                      <div>
                        <h3 className="font-black text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-1">
                          {cat.title}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                          {cat.subtitle}
                        </p>
                      </div>

                      {/* Mini tags populaires pour découverte express */}
                      <div className="hidden sm:flex flex-wrap gap-1 pt-1">
                        {cat.popularItems.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-semibold text-slate-500 bg-slate-100 group-hover:bg-amber-50 group-hover:text-amber-700 px-2 py-0.5 rounded-md transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Pied de carte avec volume et flèche interactive */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-400 group-hover:text-slate-700 transition-colors">
                          {cat.itemCount}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-amber-400 text-slate-700 group-hover:text-slate-950 flex items-center justify-center transition-all group-hover:translate-x-0.5">
                          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ================= BANNIÈRE CALL-TO-ACTION MARCHAND / BOUTIQUES ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
        >
          {/* Carte 1 : Découvrir les boutiques */}
          <Link
            href="/boutiques"
            className="group p-5 md:p-6 bg-gradient-to-r from-amber-50 via-white to-amber-50/50 rounded-3xl border border-amber-200/80 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all flex items-center justify-between"
          >
            <div className="space-y-1.5 max-w-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                Multi-Vendeurs Dakar
              </span>
              <h3 className="font-black text-sm md:text-base text-slate-900 group-hover:text-amber-600 transition-colors">
                Vous préférez acheter par boutique ?
              </h3>
              <p className="text-xs text-slate-500">
                Découvrez les 6 boutiques partenaires vérifiées avec leurs avis clients.
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0 ml-3">
              <Store className="w-5 h-5 stroke-[2.2px]" />
            </div>
          </Link>

          {/* Carte 2 : Devenir Vendeur */}
          <Link
            href="/vendeur/accueil"
            className="group p-5 md:p-6 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/50 rounded-3xl border border-emerald-200/80 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all flex items-center justify-between"
          >
            <div className="space-y-1.5 max-w-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                0 FCFA d'inscription
              </span>
              <h3 className="font-black text-sm md:text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                Vous avez des produits à vendre ?
              </h3>
              <p className="text-xs text-slate-500">
                Ouvrez votre boutique en 2 minutes et commencez à encaisser par Wave & Orange Money.
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0 ml-3">
              <Sparkles className="w-5 h-5 stroke-[2.2px]" />
            </div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
