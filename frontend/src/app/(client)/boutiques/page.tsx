'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
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
} from 'lucide-react';

export default function ShopsListPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Mode');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const boutiques = [
    {
      id: '1',
      name: 'Style & Mode',
      slug: 'style-and-mode',
      subtitle: 'Prêt-à-porter, sneakers haut de gamme & accessoires...',
      rating: '4,9',
      ratingNum: 4.9,
      reviews: '(1,2k avis)',
      reviewsCount: 1240,
      tags: ['Mode', 'Chaussures', 'Accessoires'],
      category: 'Mode',
      monogram: 'SM',
      location: 'Dakar',
      coverImage: '/images/boutiques/cover_style_mode.jpg',
      productsCount: '+ 340 articles',
    },
    {
      id: '2',
      name: 'Beauty World',
      slug: 'beauty-world',
      subtitle: 'Parfums de luxe, soins bio & cosmétiques naturels...',
      rating: '4,8',
      ratingNum: 4.8,
      reviews: '(756 avis)',
      reviewsCount: 756,
      tags: ['Beauté', 'Parfums', 'Soins'],
      category: 'Beauté',
      monogram: 'BW',
      location: 'Dakar',
      coverImage: '/images/boutiques/cover_beauty_world.jpg',
      productsCount: '+ 185 articles',
    },
    {
      id: '3',
      name: 'TechZone',
      slug: 'techzone',
      subtitle: 'Smartphones récents, ordinateurs & accessoires...',
      rating: '4,8',
      ratingNum: 4.8,
      reviews: '(980 avis)',
      reviewsCount: 980,
      tags: ['Électronique', 'Informatique', 'Accessoires'],
      category: 'Électronique',
      monogram: 'TZ',
      location: 'Dakar',
      coverImage: '/images/boutiques/cover_techzone.jpg',
      productsCount: '+ 210 articles',
    },
    {
      id: '4',
      name: 'Kids World',
      slug: 'kids-world',
      subtitle: 'Jeux d’éveil, vêtements enfants & plus encore...',
      rating: '4,8',
      ratingNum: 4.8,
      reviews: '(523 avis)',
      reviewsCount: 523,
      tags: ['Enfants', 'Jouets', 'Vêtements'],
      category: 'Enfants',
      monogram: 'KW',
      location: 'Dakar',
      coverImage: '/images/boutiques/cover_kids_world.jpg',
      productsCount: '+ 190 articles',
    },
    {
      id: '5',
      name: 'Maison Chic',
      slug: 'maison-chic',
      subtitle: 'Salons contemporains, déco artisanale & mobilier...',
      rating: '4,7',
      ratingNum: 4.7,
      reviews: '(421 avis)',
      reviewsCount: 421,
      tags: ['Maison', 'Décoration', 'Mobilier'],
      category: 'Maison',
      monogram: 'MC',
      location: 'Dakar',
      coverImage: '/images/boutiques/cover_maison_chic.jpg',
      productsCount: '+ 140 articles',
    },
    {
      id: '6',
      name: 'Sport Max',
      slug: 'sport-max',
      subtitle: 'Équipements fitness, maillots officiels & accessoires...',
      rating: '4,6',
      ratingNum: 4.6,
      reviews: '(367 avis)',
      reviewsCount: 367,
      tags: ['Sport', 'Fitness', 'Accessoires'],
      category: 'Sport',
      monogram: 'SM',
      location: 'Dakar',
      coverImage: '/images/boutiques/cover_sport_max.jpg',
      productsCount: '+ 165 articles',
    },
  ];

  const categories = [
    { label: 'Mode', icon: '🏷️' },
    { label: 'Électronique', icon: '💻' },
    { label: 'Beauté', icon: '✨' },
    { label: 'Maison', icon: '🏠' },
    { label: 'Sport', icon: '⚽' },
    { label: 'Enfants', icon: '🧸' },
  ];

  const normalizeText = (value: string) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');

  const normalizedSearch = normalizeText(search.trim());

  const filteredBoutiques = boutiques
    .filter((shop) => {
      const matchesSearch =
        !normalizedSearch ||
        normalizeText([shop.name, shop.subtitle, shop.location, ...shop.tags].join(' ')).includes(
          normalizedSearch
        );
      const matchesCategory =
        !selectedCategory ||
        selectedCategory === 'Toutes' ||
        shop.category === selectedCategory ||
        shop.tags.some((tag) => normalizeText(tag) === normalizeText(selectedCategory));

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.ratingNum - a.ratingNum;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* ================= 1. HERO BANNER SANS BANDES NOIRES + MOTION DESIGN SHIMMER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.008 }}
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-slate-200/60"
        >
          <img
            src="/images/boutiques/dakar_sunset_banner.png"
            alt="Les meilleures boutiques du Sénégal, réunies ici"
            className="w-full h-auto object-cover block"
          />

          {/* Effet Shimmer lumineux au survol */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          {/* Halo d'ambiance doré subtil */}
          <div className="absolute -inset-px rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-amber-400/40 transition-colors duration-500 pointer-events-none" />
        </motion.div>

        {/* ================= 2. BARRE DE RECHERCHE, FILTRES GLISSANTS (SPRING) & TRI ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3.5"
        >
          {/* Champ de recherche avec micro-interaction */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2.2px]" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un nom, une catégorie, un produit, une marque..."
              className="w-full bg-[#f8fafc] text-xs pl-11 pr-10 py-2.5 rounded-full border border-slate-200/80 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/20 focus:outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
            />
            {search && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ rotate: 90 }}
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                aria-label="Effacer la recherche"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>

          {/* Filtres Catégories avec GLISSEMENT FLUIDE (Framer Motion Spring) */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat.label ? 'Toutes' : cat.label)
                  }
                  className={`relative text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 select-none ${
                    isActive ? 'text-slate-950' : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80'
                  }`}
                >
                  {/* Pilule dorée fluide avec spring physics */}
                  {isActive && (
                    <motion.span
                      layoutId="boutiqueCategoryPill"
                      className="absolute inset-0 bg-amber-400 rounded-full shadow-xs z-0 border border-amber-500/20"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.icon}</span>
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sélecteur de Tri */}
          <div className="flex items-center justify-end gap-2 text-xs font-semibold text-slate-500 flex-shrink-0">
            <span className="whitespace-nowrap">Trier :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer transition"
            >
              <option value="rating">Mieux notées ★</option>
              <option value="reviews">Plus d&apos;avis</option>
              <option value="name">Alphabétique (A-Z)</option>
            </select>
          </div>
        </motion.div>

        {/* ================= 3. TITRE DE SECTION AVEC COMPTEUR ANIMÉ ================= */}
        <div className="flex items-center justify-between pt-1 px-1">
          <div className="space-y-0.5">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-amber-500 stroke-[2.2px]" />
              <span>Boutiques à découvrir</span>
              <span className="text-xs font-bold bg-amber-400/20 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                {filteredBoutiques.length} actives
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Des boutiques sélectionnées pour la qualité de leurs produits et leur fiabilité.
            </p>
          </div>
          <motion.button
            whileHover={{ x: 3 }}
            type="button"
            onClick={() => {
              setSelectedCategory('Toutes');
              setSearch('');
            }}
            className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition select-none"
          >
            <span>Voir toutes les boutiques</span>
            <span>→</span>
          </motion.button>
        </div>

        {/* ================= 4. GRILLE DES BOUTIQUES (ENTRÉE STAGGER + MOTION FLUIDE) ================= */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredBoutiques.map((shop, index) => (
              <motion.div
                key={shop.id}
                layout
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 30px -10px rgba(12, 21, 39, 0.12), 0 0 20px -5px rgba(245, 158, 11, 0.12)',
                  borderColor: 'rgba(245, 158, 11, 0.4)',
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs transition-colors duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Couverture Panoramique avec Zoom fluide au survol */}
                  <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                    <img
                      src={shop.coverImage}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient protecteur élégant */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Badge Boutique Vérifiée avec aura émeraude */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#059669] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md shadow-emerald-900/30 backdrop-blur-xs">
                      <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5px] animate-pulse" />
                      <span>Boutique vérifiée</span>
                    </div>

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

                    {/* Monogramme Circulaire MB avec micro-rotation au survol */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="absolute -bottom-6 left-5 z-20 w-12 h-12 rounded-full bg-slate-950 text-white border-2 border-white flex flex-col items-center justify-center shadow-lg group-hover:border-amber-400 transition-colors"
                    >
                      <Crown className="w-3 h-3 text-amber-400 fill-amber-400 -mb-0.5" />
                      <span className="font-black text-xs tracking-tight leading-none">
                        {shop.monogram}
                      </span>
                    </motion.div>
                  </div>

                  {/* Informations de la Boutique */}
                  <div className="pt-8 px-5 pb-3 space-y-2">
                    {/* Titre & Note */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/boutiques/${shop.slug}/produits`}
                        className="font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition flex items-center gap-1.5"
                      >
                        <span>{shop.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-amber-500 fill-amber-400" />
                      </Link>
                      <div className="flex items-center gap-1 text-xs font-black text-slate-950 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        <span>{shop.rating}</span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {shop.reviews}
                        </span>
                      </div>
                    </div>

                    {/* Sous-titre descriptif */}
                    <p className="text-xs text-slate-500 line-clamp-1 font-medium leading-relaxed">
                      {shop.subtitle}
                    </p>
                  </div>
                </div>

                {/* Tags & Bouton d'action interactif */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
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

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/boutiques/${shop.slug}/produits`}
                      className="inline-flex items-center gap-1.5 bg-[#0c1527] hover:bg-amber-400 text-white hover:text-slate-950 font-bold text-xs px-4 py-2 rounded-full transition-all duration-200 shadow-xs flex-shrink-0"
                    >
                      <span>Visiter la boutique</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
