'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Smartphone,
  Sparkles,
  Home as HomeIcon,
  Star,
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
  Zap,
  ShoppingBag,
  Store,
  CheckCircle2,
  TrendingUp,
  Percent,
  Clock,
  Heart,
} from 'lucide-react';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  InteractiveCard,
  SpringButton,
} from '../components/motion/MotionComponents';

export default function HomePage() {
  // 4 Boutiques Populaires avec données complètes enrichies
  const popularShops = [
    {
      id: '1',
      name: 'Style & Mode',
      slug: 'style-and-mode',
      category: 'Mode & Friperie VIP',
      location: 'Dakar, Plateau',
      rating: '4.8',
      reviews: '1,2k avis',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80',
      logo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=150&q=80',
      previewItems: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=120&q=80',
      ],
      productsCount: 124,
    },
    {
      id: '2',
      name: 'TechZone',
      slug: 'techzone',
      category: 'Smartphones & Accessoires',
      location: 'Dakar, Médina',
      rating: '4.6',
      reviews: '980 avis',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80',
      logo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=150&q=80',
      previewItems: [
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=120&q=80',
      ],
      productsCount: 88,
    },
    {
      id: '3',
      name: 'Beauty World',
      slug: 'beauty-world',
      category: 'Parfums & Cosmétiques',
      location: 'Dakar, Almadies',
      rating: '4.7',
      reviews: '756 avis',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
      logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=150&q=80',
      previewItems: [
        'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=120&q=80',
      ],
      productsCount: 65,
    },
    {
      id: '4',
      name: 'Maison Chic',
      slug: 'maison-chic',
      category: 'Déco & Linge de Maison',
      location: 'Dakar, Mermoz',
      rating: '4.5',
      reviews: '421 avis',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80',
      logo: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=150&q=80',
      previewItems: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=120&q=80',
        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=120&q=80',
      ],
      productsCount: 42,
    },
  ];

  // 4 Articles Tendance / Ventes Flash
  const trendingProducts = [
    {
      id: 1,
      title: 'T-shirt oversize vintage 90s',
      shop: 'Style & Mode',
      price: 12000,
      oldPrice: 15000,
      discount: '-20%',
      rating: 4.9,
      sales: 45,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      tag: '🔥 Populaire',
    },
    {
      id: 2,
      title: 'Sneakers Nike Air Max Edition',
      shop: 'Style & Mode',
      price: 25000,
      oldPrice: 32000,
      discount: '-22%',
      rating: 4.8,
      sales: 32,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
      tag: '⚡ Vente Flash',
    },
    {
      id: 3,
      title: 'Smartphone Samsung Galaxy A54',
      shop: 'TechZone',
      price: 185000,
      oldPrice: 210000,
      discount: '-12%',
      rating: 4.7,
      sales: 18,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=400&q=80',
      tag: '📱 Best-Seller',
    },
    {
      id: 4,
      title: 'Coffret Parfum & Soin Éclat',
      shop: 'Beauty World',
      price: 28000,
      oldPrice: 35000,
      discount: '-20%',
      rating: 4.9,
      sales: 27,
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=400&q=80',
      tag: '✨ Nouveauté',
    },
  ];

  return (
    <div className="w-full bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 md:py-8 space-y-8 md:space-y-14">
        
        {/* ================= 1. SECTION HERO & BANNIÈRES PROMOTIONNELLES ================= */}
        <FadeIn y={24} duration={0.7} className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Bannière Principale Dorée / Ambrée (Large sur desktop) */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-8 relative rounded-3xl md:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#e58a00] via-[#f59e0b] to-[#d97706] text-white p-5 sm:p-8 md:p-12 shadow-md min-h-[200px] sm:min-h-[280px] md:min-h-[360px] flex items-center justify-between"
            >
              {/* Photo Mode Stylée à droite */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] md:w-[45%] overflow-hidden pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
                  alt="Mode Sénégalaise"
                  className="w-full h-full object-cover object-top mix-blend-multiply opacity-95 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#e58a00] via-[#e58a00]/30 to-transparent" />
              </div>

              {/* Contenu Texte à gauche */}
              <div className="relative z-10 space-y-2.5 md:space-y-4 max-w-[220px] sm:max-w-md md:max-w-lg">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider bg-black/25 backdrop-blur-md px-3 py-1 rounded-full text-amber-200"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Première Marketplace du Sénégal</span>
                </motion.span>

                <h1 className="text-xl sm:text-3xl md:text-5xl font-black leading-[1.12] text-white drop-shadow-xs">
                  La meilleure boutique en ligne
                </h1>
                
                <p className="text-[11px] sm:text-sm md:text-base font-medium text-amber-100/90 leading-tight">
                  Mode • Électronique • Beauté • Maison • Sport
                </p>

                <div className="pt-2 md:pt-4 flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      href="/categories"
                      className="inline-flex items-center gap-2 bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-950 font-black text-xs sm:text-sm py-2.5 px-4 md:py-3.5 md:px-6 rounded-full shadow-md transition"
                    >
                      <span>Découvrir maintenant</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      href="/boutiques"
                      className="hidden sm:inline-flex items-center gap-1.5 bg-black/30 hover:bg-black/40 text-white font-bold text-xs sm:text-sm py-2.5 px-4 md:py-3.5 md:px-5 rounded-full border border-white/20 transition backdrop-blur-sm"
                    >
                      <span>Nos boutiques</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* 2 Cartes Spéciales Desktop à droite (Visibles sur grand écran) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col justify-between gap-4">
              {/* Carte 1 : Boutique Vedette de la semaine */}
              <InteractiveCard hoverY={-4} className="flex-1">
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 shadow-sm border border-slate-800 h-full flex flex-col justify-between group">
                  <div className="absolute inset-0 z-0 opacity-40">
                    <img
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"
                      alt="Boutique du jour"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-xs">
                      Boutique du Jour ★
                    </span>
                    <span className="text-xs text-amber-300 font-bold">4.8 / 5</span>
                  </div>

                  <div className="relative z-10 space-y-1 pt-6">
                    <h3 className="font-black text-lg text-white">Style & Mode</h3>
                    <p className="text-xs text-slate-300">
                      Friperie VIP & Streetwear • Dakar Plateau
                    </p>
                    <Link
                      href="/boutiques/style-and-mode"
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 pt-2 transition"
                    >
                      <span>Explorer la boutique</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </InteractiveCard>

              {/* Carte 2 : Avantage Wave & Livraison Express */}
              <InteractiveCard hoverY={-4}>
                <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 shadow-sm flex items-center justify-between relative overflow-hidden">
                  <div className="space-y-1.5 z-10 max-w-[200px]">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                      Paiement Wave
                    </span>
                    <h4 className="font-black text-base leading-tight">
                      Payez facilement par Wave ou à la livraison
                    </h4>
                    <p className="text-[11px] text-emerald-100">
                      Livraison 24h chrono sur Dakar
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                    <Truck className="w-7 h-7" />
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </div>
        </FadeIn>

        {/* ================= 2. CATÉGORIES VEDETTES (DESKTOP & MOBILE AVEC MOTION) ================= */}
        <section className="w-full space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base sm:text-xl md:text-2xl text-slate-900 tracking-tight">
                Rayons & Catégories
              </h2>
              <p className="hidden md:block text-xs text-slate-500 mt-0.5">
                Explorez par univers pour trouver rapidement vos produits
              </p>
            </div>
            <Link
              href="/categories"
              className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition"
            >
              Toutes les catégories →
            </Link>
          </div>

          {/* Grille : Bulles sur mobile, Grandes cartes interactives sur desktop */}
          <StaggerContainer className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-6">
            {/* 1. Mode */}
            <StaggerItem>
              <Link
                href="/categories"
                className="flex flex-col items-center gap-2 p-2 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white md:border md:border-slate-100/90 hover:border-amber-300 md:shadow-2xs hover:shadow-lg transition-all duration-200 group text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#fef08a] flex items-center justify-center text-slate-900 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition duration-300">
                  <svg className="w-6 h-6 md:w-9 md:h-9 stroke-[2px] stroke-current fill-none" viewBox="0 0 24 24">
                    <path d="M12 4a3 3 0 0 1 3 3c0 .8-.3 1.5-.8 2L2 17h20L12.8 9" />
                    <path d="M2 17v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition block">
                    Mode
                  </span>
                  <span className="hidden md:block text-[11px] text-slate-400 mt-0.5">
                    450+ articles
                  </span>
                </div>
              </Link>
            </StaggerItem>

            {/* 2. Électronique */}
            <StaggerItem>
              <Link
                href="/categories"
                className="flex flex-col items-center gap-2 p-2 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white md:border md:border-slate-100/90 hover:border-sky-300 md:shadow-2xs hover:shadow-lg transition-all duration-200 group text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#e0f2fe] flex items-center justify-center text-slate-800 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition duration-300">
                  <Smartphone className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600 transition block">
                    Électronique
                  </span>
                  <span className="hidden md:block text-[11px] text-slate-400 mt-0.5">
                    120+ articles
                  </span>
                </div>
              </Link>
            </StaggerItem>

            {/* 3. Beauté */}
            <StaggerItem>
              <Link
                href="/categories"
                className="flex flex-col items-center gap-2 p-2 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white md:border md:border-slate-100/90 hover:border-pink-300 md:shadow-2xs hover:shadow-lg transition-all duration-200 group text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#fce7f3] flex items-center justify-center text-rose-600 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition duration-300">
                  <svg className="w-5 h-5 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M7 13h10v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8zm2-1V7a3 3 0 0 1 6 0v5H9z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-rose-600 transition block">
                    Beauté
                  </span>
                  <span className="hidden md:block text-[11px] text-slate-400 mt-0.5">
                    85+ articles
                  </span>
                </div>
              </Link>
            </StaggerItem>

            {/* 4. Maison */}
            <StaggerItem>
              <Link
                href="/categories"
                className="flex flex-col items-center gap-2 p-2 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white md:border md:border-slate-100/90 hover:border-amber-300 md:shadow-2xs hover:shadow-lg transition-all duration-200 group text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-800 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition duration-300">
                  <HomeIcon className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-600 transition block">
                    Maison
                  </span>
                  <span className="hidden md:block text-[11px] text-slate-400 mt-0.5">
                    64+ articles
                  </span>
                </div>
              </Link>
            </StaggerItem>

            {/* 5. Sport */}
            <StaggerItem>
              <Link
                href="/categories"
                className="flex flex-col items-center gap-2 p-2 sm:p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white md:border md:border-slate-100/90 hover:border-emerald-300 md:shadow-2xs hover:shadow-lg transition-all duration-200 group text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#dcfce7] flex items-center justify-center text-emerald-700 shadow-2xs group-hover:scale-110 group-hover:rotate-3 transition duration-300">
                  <Zap className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition block">
                    Sport
                  </span>
                  <span className="hidden md:block text-[11px] text-slate-400 mt-0.5">
                    40+ articles
                  </span>
                </div>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* ================= 3. SECTION BOUTIQUES POPULAIRES (DESKTOP ENRICHI) ================= */}
        <section className="w-full space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base sm:text-xl md:text-2xl text-slate-900 tracking-tight">
                  Boutiques populaires
                </h2>
                <span className="bg-amber-100 text-amber-800 text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Certifiées
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Les commerçants préférés des acheteurs à Dakar et dans toutes les régions
              </p>
            </div>
            <Link
              href="/boutiques"
              className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1"
            >
              <span>Voir toutes les boutiques</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Grille des Boutiques avec Stagger & Hover Card */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {popularShops.map((shop) => (
              <StaggerItem key={shop.id}>
                <InteractiveCard hoverY={-6}>
                  <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 overflow-hidden shadow-2xs hover:shadow-xl hover:border-amber-200 transition-all duration-300 group flex flex-col justify-between h-full">
                    <div>
                      {/* Photo de couverture de la boutique */}
                      <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden relative">
                        <img
                          src={shop.image}
                          alt={shop.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Badge Note Top Droite */}
                        <span className="absolute top-2.5 right-2.5 bg-slate-900/85 backdrop-blur-md text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{shop.rating}</span>
                        </span>

                        {/* Logo Circulaire en superposition */}
                        <div className="absolute bottom-2.5 left-2.5 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                          <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
                        </div>
                      </div>

                      {/* Infos Boutique */}
                      <div className="p-3 md:p-4 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-xs sm:text-sm md:text-base text-slate-900 truncate group-hover:text-amber-600 transition">
                            {shop.name}
                          </h3>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        </div>
                        
                        <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                          {shop.category}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate hidden md:block">
                          📍 {shop.location} • {shop.productsCount} articles
                        </p>

                        {/* Miniatures d'articles sur desktop */}
                        <div className="hidden md:flex items-center gap-1.5 pt-2.5">
                          {shop.previewItems.map((pic, idx) => (
                            <div key={idx} className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                              <img src={pic} alt="Aperçu" className="w-full h-full object-cover" />
                            </div>
                          ))}
                          <span className="text-[10px] text-slate-400 pl-1">+ d'articles</span>
                        </div>
                      </div>
                    </div>

                    {/* Bouton de visite */}
                    <div className="p-3 md:p-4 pt-0">
                      <Link
                        href={`/boutiques/${shop.slug}`}
                        className="block w-full py-2 bg-slate-50 hover:bg-amber-500 hover:text-slate-950 text-slate-800 text-xs font-bold rounded-xl text-center transition border border-slate-200/60"
                      >
                        Visiter la boutique
                      </Link>
                    </div>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ================= 4. SECTION PRODUITS TENDANCE & VENTES FLASH (AVEC MOTION) ================= */}
        <section className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h2 className="font-bold text-base sm:text-xl md:text-2xl text-slate-900 tracking-tight">
                Ventes Flash & Tendances
              </h2>
            </div>
            <Link
              href="/categories"
              className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 transition"
            >
              Voir toutes les offres →
            </Link>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {trendingProducts.map((prod) => (
              <StaggerItem key={prod.id}>
                <InteractiveCard hoverY={-5}>
                  <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 overflow-hidden shadow-2xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 group flex flex-col justify-between h-full">
                    <div>
                      <div className="aspect-square w-full bg-slate-100 overflow-hidden relative">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                          {prod.discount}
                        </span>
                        <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {prod.tag}
                        </span>
                      </div>

                      <div className="p-3 md:p-4 space-y-1">
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                          {prod.shop}
                        </span>
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 group-hover:text-amber-600 transition">
                          {prod.title}
                        </h3>
                        <div className="flex items-baseline gap-2 pt-1">
                          <span className="text-sm md:text-base font-black text-slate-900">
                            {prod.price.toLocaleString('fr-FR')} FCFA
                          </span>
                          <span className="text-[10px] md:text-xs text-slate-400 line-through">
                            {prod.oldPrice.toLocaleString('fr-FR')} F
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 md:p-4 pt-0">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                        <Link
                          href={`/produits/${prod.id}`}
                          className="block w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl text-center transition shadow-2xs"
                        >
                          Ajouter au panier
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ================= 5. BANDEAU DE RÉASSURANCE ET CONFIANCE ================= */}
        <FadeIn y={16} duration={0.6} className="w-full pt-2">
          <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 py-4 px-3 md:py-8 md:px-8 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-4 md:divide-x md:divide-slate-100 text-center">
            {/* 1. Produits sécurisés */}
            <motion.div whileHover={{ y: -3 }} className="flex flex-col items-center gap-1.5 md:gap-2 px-2">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1 shadow-2xs">
                <ShieldCheck className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
              </div>
              <h4 className="text-xs md:text-sm font-bold text-slate-900">
                Produits sécurisés
              </h4>
              <p className="hidden md:block text-[11px] text-slate-400">
                100% articles vérifiés et certifiés par nos équipes
              </p>
            </motion.div>

            {/* 2. Livraison rapide */}
            <motion.div whileHover={{ y: -3 }} className="flex flex-col items-center gap-1.5 md:gap-2 px-2">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-1 shadow-2xs">
                <Truck className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
              </div>
              <h4 className="text-xs md:text-sm font-bold text-slate-900">
                Livraison rapide
              </h4>
              <p className="hidden md:block text-[11px] text-slate-400">
                Expédition en 24h sur Dakar et dans toutes les régions
              </p>
            </motion.div>

            {/* 3. Service client 7j/7 */}
            <motion.div whileHover={{ y: -3 }} className="flex flex-col items-center gap-1.5 md:gap-2 px-2">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1 shadow-2xs">
                <Headphones className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
              </div>
              <h4 className="text-xs md:text-sm font-bold text-slate-900">
                Service client 7j/7
              </h4>
              <p className="hidden md:block text-[11px] text-slate-400">
                Assistance continue par WhatsApp et téléphone
              </p>
            </motion.div>

            {/* 4. Paiement à la livraison */}
            <motion.div whileHover={{ y: -3 }} className="flex flex-col items-center gap-1.5 md:gap-2 px-2">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1 shadow-2xs">
                <CreditCard className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
              </div>
              <h4 className="text-xs md:text-sm font-bold text-slate-900">
                Paiement à la livraison
              </h4>
              <p className="hidden md:block text-[11px] text-slate-400">
                Réglez en cash, Wave ou Orange Money à la réception
              </p>
            </motion.div>
          </div>
        </FadeIn>

        {/* ================= 6. GRAND BANDEAU D'APPEL AUX BOUTIQUIERS ================= */}
        <FadeIn y={16} duration={0.6} className="w-full">
          <motion.div
            whileHover={{ scale: 1.008 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl md:rounded-[36px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-10 md:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="space-y-3 z-10 max-w-xl text-center md:text-left">
              <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                Espace Commerçants & Boutiquiers
              </span>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight">
                Vendez vos produits à des milliers de clients partout au Sénégal
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Créez votre boutique en 3 minutes, gérez vos commandes en temps réel et recevez vos paiements instantanément via Wave ou Orange Money.
              </p>
            </div>

            <div className="z-10 flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/vendeur/accueil"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm py-3 px-6 rounded-full shadow-lg transition"
                >
                  <span>Ouvrir ma boutique gratuitement</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/vendeur/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-full border border-slate-700 transition"
                >
                  <span>Connexion Vendeur</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </FadeIn>

      </div>
    </div>
  );
}
