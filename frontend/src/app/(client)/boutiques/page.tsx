'use client';

import Link from 'next/link';
import { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
    tags: ['Mode', 'Chaussures', 'Accessoires', 'Artisanat'],
    category: 'Mode',
    monogram: 'SM',
    location: 'Dakar',
    district: 'Plateau • Rue Carnot',
    coverImage: '/images/boutiques/cover_style_mode.jpg',
    productsCount: '+ 340 articles',
    badge: '👑 Vendeur Officiel',
    whatsapp: '221771234567',
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
    tags: ['Beauté', 'Parfums', 'Soins'],
    category: 'Beauté',
    monogram: 'BW',
    location: 'Dakar',
    district: 'Almadies • Route des Almadies',
    coverImage: '/images/boutiques/cover_beauty_world.jpg',
    productsCount: '+ 185 articles',
    badge: '✨ Coup de Cœur',
    whatsapp: '221778901234',
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
    tags: ['Électronique', 'Informatique', 'Accessoires'],
    category: 'Électronique',
    monogram: 'TZ',
    location: 'Dakar',
    district: 'Médina • Centenaire',
    coverImage: '/images/boutiques/cover_techzone.jpg',
    productsCount: '+ 210 articles',
    badge: '⚡ Top Ventes High-Tech',
    whatsapp: '221765432109',
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
    tags: ['Enfants', 'Jouets', 'Vêtements'],
    category: 'Enfants',
    monogram: 'KW',
    location: 'Dakar',
    district: 'Mermoz • VDN',
    coverImage: '/images/boutiques/cover_kids_world.jpg',
    productsCount: '+ 190 articles',
    badge: '🧸 Espace Famille',
    whatsapp: '221781112233',
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
    tags: ['Maison', 'Décoration', 'Mobilier', 'Artisanat'],
    category: 'Maison',
    monogram: 'MC',
    location: 'Dakar',
    district: 'Ngor • Virage',
    coverImage: '/images/boutiques/cover_maison_chic.jpg',
    productsCount: '+ 140 articles',
    badge: '🎨 Design & Confort',
    whatsapp: '221774445566',
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
    tags: ['Sport', 'Fitness', 'Accessoires'],
    category: 'Sport',
    monogram: 'SM',
    location: 'Dakar',
    district: 'Fann Résidence • Corniche',
    coverImage: '/images/boutiques/cover_sport_max.jpg',
    productsCount: '+ 165 articles',
    badge: '⚽ Performance Pro',
    whatsapp: '221769998877',
  },
];

const CATEGORIES_LIST = [
  { label: 'Toutes', icon: '✨' },
  { label: 'Artisanat', icon: '🇸🇳' },
  { label: 'Mode', icon: '👗' },
  { label: 'Électronique', icon: '💻' },
  { label: 'Beauté', icon: '💄' },
  { label: 'Maison', icon: '🏠' },
  { label: 'Sport', icon: '⚽' },
  { label: 'Enfants', icon: '🧸' },
];

function ShopsListContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Toutes';
  const initialSort = (searchParams.get('sort') as any) || 'rating';

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name' | 'newest'>(initialSort);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Synchronisation dynamique quand l'utilisateur clique sur un lien de navigation avec paramètres d'URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    } else if (!searchParams.get('sort') && !searchParams.get('q') && !searchParams.get('filter')) {
      setSelectedCategory('Toutes');
    }

    const sort = searchParams.get('sort');
    if (sort === 'newest') {
      setSortBy('newest');
    } else if (sort === 'rating' || sort === 'reviews' || sort === 'name') {
      setSortBy(sort);
    }

    const q = searchParams.get('q');
    if (q) {
      setSearch(q);
    }

    const filter = searchParams.get('filter');
    if (filter === 'promos') {
      setSelectedCategory('Toutes');
      setSortBy('reviews');
    }
  }, [searchParams]);

  const normalizeText = (value: string) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');

  const normalizedSearch = normalizeText(search.trim());

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Toutes: BOUTIQUES_DATA.length };
    CATEGORIES_LIST.forEach((cat) => {
      if (cat.label === 'Toutes') return;
      counts[cat.label] = BOUTIQUES_DATA.filter(
        (b) =>
          b.category === cat.label ||
          b.tags.some((tag) => normalizeText(tag) === normalizeText(cat.label))
      ).length;
    });
    return counts;
  }, []);

  const filteredBoutiques = useMemo(() => {
    return BOUTIQUES_DATA.filter((shop) => {
      const matchesSearch =
        !normalizedSearch ||
        normalizeText(
          [shop.name, shop.subtitle, shop.location, shop.district, ...shop.tags].join(' ')
        ).includes(normalizedSearch);

      const matchesCategory =
        !selectedCategory ||
        selectedCategory === 'Toutes' ||
        shop.category === selectedCategory ||
        shop.tags.some((tag) => normalizeText(tag) === normalizeText(selectedCategory));

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'newest') return Number(b.id) - Number(a.id);
      if (sortBy === 'rating') return b.ratingNum - a.ratingNum;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return a.name.localeCompare(b.name);
    });
  }, [normalizedSearch, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('Toutes');
    setSortBy('rating');
    setSearch('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* ================= 1. HERO BANNER SANS BANDES NOIRES + MOTION DESIGN SHIMMER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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

        {/* ================= 2. BARRE DE RECHERCHE, FILTRE 'TOUTES' & TRI (SANS SCROLLBAR) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          className="bg-white p-3.5 sm:p-4 rounded-3xl border border-slate-200/90 shadow-xs space-y-3.5"
        >
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

          {/* Ligne 2 : FILTRES CATÉGORIES AVEC 'TOUTES' EN PREMIER & ZÉRO SCROLLBAR */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCategory === cat.label;
              const count = categoryCounts[cat.label] || 0;

              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => {
                    if (selectedCategory === cat.label && cat.label !== 'Toutes') {
                      setSelectedCategory('Toutes');
                    } else {
                      setSelectedCategory(cat.label);
                    }
                  }}
                  className={`relative text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-colors duration-200 flex items-center gap-1.5 select-none shrink-0 ${
                    isActive
                      ? 'text-slate-950 font-black'
                      : 'text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80'
                  }`}
                >
                  {/* Pilule dorée fluide avec spring physics */}
                  {isActive && (
                    <motion.span
                      layoutId="boutiqueCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-xs z-0 border border-amber-500/30"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 text-sm leading-none">{cat.icon}</span>
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 text-[10px] font-black px-1.5 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-slate-950/15 text-slate-950'
                        : 'bg-slate-200/80 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ================= 3. TITRE DE SECTION AVEC COMPTEUR DYNAMIQUE ================= */}
        <div className="flex items-center justify-between pt-1 px-1">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-500 stroke-[2.2px]" />
                <span>Boutiques vérifiées à Dakar</span>
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
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition select-none shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Afficher toutes les boutiques ({BOUTIQUES_DATA.length})</span>
            </motion.button>
          ) : (
            <div className="text-xs font-bold text-slate-400 hidden sm:flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Catalogue 100% vérifié</span>
            </div>
          )}
        </div>

        {/* ================= 4. GRILLE DES BOUTIQUES (ENTRÉE STAGGER + CARTE ULTRA LUXE) ================= */}
        {filteredBoutiques.length > 0 ? (
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
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow:
                      '0 20px 30px -10px rgba(12, 21, 39, 0.12), 0 0 20px -5px rgba(245, 158, 11, 0.15)',
                    borderColor: 'rgba(245, 158, 11, 0.45)',
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs transition-colors duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Couverture Panoramique avec Zoom fluide au survol */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={shop.coverImage}
                        alt={shop.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />

                      {/* Gradient protecteur élégant */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/20 pointer-events-none" />

                      {/* Badge Boutique Vérifiée avec aura émeraude */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#059669] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md shadow-emerald-900/30 backdrop-blur-xs">
                        <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5px]" />
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

                      {/* Monogramme Circulaire avec micro-rotation au survol */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 6 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="absolute -bottom-6 left-5 z-20 w-12 h-12 rounded-full bg-slate-950 text-white border-2 border-white flex flex-col items-center justify-center shadow-lg group-hover:border-amber-400 transition-colors"
                      >
                        <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400 -mb-0.5" />
                        <span className="font-black text-xs tracking-tight leading-none">
                          {shop.monogram}
                        </span>
                      </motion.div>

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

                    <div className="flex items-center gap-2">
                      {/* Bouton WhatsApp direct */}
                      <a
                        href={`https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(
                          `Bonjour ${shop.name}, j'ai vu votre boutique sur Malick Buss et je souhaite commander !`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-1.5 w-10 h-10 rounded-2xl bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-200/80 transition-all duration-200 shrink-0"
                        title="Contacter sur WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 stroke-[2.2px]" />
                      </a>

                      {/* Bouton Voir la boutique / Acheter en 2 clics */}
                      <Link
                        href={`/boutiques/${shop.slug}/produits`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#0c1527] hover:bg-amber-400 text-white hover:text-slate-950 font-extrabold text-xs py-2.5 px-4 rounded-2xl transition-all duration-200 shadow-xs group/btn"
                      >
                        <span>Visiter les produits</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px] group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ================= ÉTAT VIDE ÉLÉGANT AVEC BOUTON DE RÉINITIALISATION ================= */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-10 text-center border border-slate-200/90 shadow-xs max-w-md mx-auto space-y-4 my-8"
          >
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
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-full transition shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Voir toutes les boutiques ({BOUTIQUES_DATA.length})</span>
            </button>
          </motion.div>
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

