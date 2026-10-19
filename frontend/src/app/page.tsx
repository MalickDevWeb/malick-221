'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  Smartphone,
  Heart,
  Home,
  Flame,
  Crown,
  Truck,
  ShieldCheck,
  Headphones,
  Store,
  CheckCircle2,
  Star,
  Sparkles,
  MapPin,
  MessageCircle,
  TrendingUp,
  CreditCard,
  Plus,
} from 'lucide-react';
import { BrandLogo } from '../components/ui/BrandLogo';
import { formatFCFA } from '../services/api';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  // 2 Bannières Ultra-HD officielles
  const heroSlides = [
    {
      id: 0,
      image: '/images/hero/banner_woman_hd.png',
      tag: '🇸🇳 1ER MARKETPLACE MULTI-BOUTIQUES AU SÉNÉGAL',
      subtitle:
        'Vos boutiques préférées de Dakar réunies en un seul endroit. Commandez facilement et faites-vous livrer en 24h avec paiement Wave & Orange Money.',
      buttonText: 'Explorer les boutiques',
      buttonHref: '/boutiques',
    },
    {
      id: 1,
      image: '/images/hero/banner_man_hd.png',
      tag: 'LE MEILLEUR DU COMMERCE SÉNÉGALAIS',
      subtitle:
        'Mode, tech, beauté, déco, artisanat local... Soutenez les commerçants sénégalais et achetez en toute sécurité.',
      buttonText: 'Découvrir nos boutiques',
      buttonHref: '/boutiques',
    },
  ];

  // 3 Boutiques Stars & Sponsorisées (Celles qui ont payé pour être en haut)
  const sponsoredBoutiques = [
    {
      id: '1',
      name: 'Style & Mode',
      slug: 'style-and-mode',
      monogram: 'SM',
      badge: '👑 En Vedette Sponsorisé',
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
      rating: '4,9',
      reviews: '(1,2k avis)',
      location: 'Dakar Plateau',
      productsCount: '+ 340 articles',
      subtitle: 'Prêt-à-porter, sneakers haut de gamme & maroquinerie de luxe.',
      tags: ['Mode', 'Sneakers', 'Luxe'],
      coverImage: '/images/boutiques/cover_style_mode.jpg',
      whatsapp: '221771719013',
    },
    {
      id: '2',
      name: 'TechZone',
      slug: 'techzone',
      monogram: 'TZ',
      badge: '⚡ Boutique Star Officielle',
      badgeColor: 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-black',
      rating: '4,8',
      reviews: '(980 avis)',
      location: 'Almadies',
      productsCount: '+ 210 articles',
      subtitle: 'Smartphones Apple & Samsung, ordinateurs et accessoires gaming garantis 1 an.',
      tags: ['High-Tech', 'Apple', 'Gaming'],
      coverImage: '/images/boutiques/cover_techzone.jpg',
      whatsapp: '221770000002',
    },
    {
      id: '3',
      name: 'Beauty World',
      slug: 'beauty-world',
      monogram: 'BW',
      badge: '✨ Top Vendeur Cosmétique',
      badgeColor: 'bg-gradient-to-r from-rose-500 to-amber-400 text-white font-black',
      rating: '4,9',
      reviews: '(756 avis)',
      location: 'Point E',
      productsCount: '+ 185 articles',
      subtitle: 'Parfums de luxe authentiques, soins bio & cosmétiques certifiés à Dakar.',
      tags: ['Parfums', 'Soins bio', 'Beauté'],
      coverImage: '/images/boutiques/cover_beauty_world.jpg',
      whatsapp: '221770000003',
    },
  ];

  // Catégories directes vers les boutiques
  const popularCategories = [
    {
      title: 'Mode & Friperie',
      count: '14 boutiques',
      badge: 'Tendance Dakar 🔥',
      image: '/images/mockup/cat_mode.jpg',
      href: '/boutiques?category=Mode',
    },
    {
      title: 'Électronique & Tech',
      count: '9 boutiques',
      badge: 'Garantie 1 an',
      image: '/images/mockup/cat_tech.jpg',
      href: '/boutiques?category=Électronique',
    },
    {
      title: 'Beauté & Parfums',
      count: '11 boutiques',
      badge: '100% Authentique',
      image: '/images/mockup/cat_beaute.jpg',
      href: '/boutiques?category=Beauté',
    },
    {
      title: 'Maison & Déco',
      count: '8 boutiques',
      badge: 'Artisanat & Salons',
      image: '/images/mockup/cat_maison.jpg',
      href: '/boutiques?category=Maison',
    },
    {
      title: 'Sport & Fitness',
      count: '6 boutiques',
      badge: 'Livraison 24h',
      image: '/images/mockup/cat_sport.jpg',
      href: '/boutiques?category=Sport',
    },
    {
      title: 'Enfants & Bébés',
      count: '7 boutiques',
      badge: 'Sécurité certifiée',
      image: '/images/mockup/cat_enfants.jpg',
      href: '/boutiques?category=Enfants',
    },
  ];

  // Produits populaires des boutiques stars
  const featuredProducts = [
    {
      id: 'p1',
      title: 'Ensemble Boubou Soie Prestige',
      boutique: 'Style & Mode',
      boutiqueSlug: 'style-and-mode',
      price: 28500,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80',
      tag: 'Populaire',
    },
    {
      id: 'p2',
      title: 'Écouteurs Sans Fil Pro 2',
      boutique: 'TechZone',
      boutiqueSlug: 'techzone',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',
      tag: 'Garantie 1 An',
    },
    {
      id: 'p3',
      title: 'Parfum Royal Oud Dakar (100ml)',
      boutique: 'Beauty World',
      boutiqueSlug: 'beauty-world',
      price: 42000,
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&q=80',
      tag: 'Authentique',
    },
    {
      id: 'p4',
      title: 'Sneakers Dakar Urban Street',
      boutique: 'Style & Mode',
      boutiqueSlug: 'style-and-mode',
      price: 22000,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
      tag: 'Stock Limité',
    },
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-16 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8 sm:space-y-12">
        {/* ================= 1. SECTION HERO COMPLÈTE (PLEINE LARGEUR HD SANS SIDEBAR) ================= */}
        <div className="w-full bg-[#071630] text-white rounded-3xl overflow-hidden shadow-xl relative min-h-[400px] lg:min-h-[480px] flex flex-col justify-between border border-slate-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
              >
                <img
                  src={currentSlide.image}
                  alt={currentSlide.tag}
                  className="w-full h-full object-cover object-right"
                />
                <div
                  className={`absolute inset-y-0 left-0 ${
                    activeSlide === 1
                      ? 'w-full sm:w-3/4 lg:w-[62%] bg-gradient-to-r from-[#071630] via-[#071630]/95 via-[#071630]/75 to-transparent'
                      : 'w-full sm:w-3/5 lg:w-[50%] bg-gradient-to-r from-[#071630]/95 via-[#071630]/65 to-transparent'
                  }`}
                />
              </motion.div>
            </AnimatePresence>

            {/* Contenu Texte & Call to Action (Gauche) */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-xl space-y-4 flex-1 flex flex-col justify-center">
              <div className="inline-block">
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-400 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full shadow-xs">
                  {currentSlide.tag}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-100 leading-relaxed max-w-md drop-shadow-sm font-medium">
                {currentSlide.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={currentSlide.buttonHref}
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-amber-500/25 transition duration-200"
                >
                  <Store className="w-4 h-4 stroke-[2.5px]" />
                  <span>{currentSlide.buttonText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </Link>

                <Link
                  href="/vendeur/accueil"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-full backdrop-blur-sm transition"
                >
                  <span>Ouvrir ma boutique</span>
                  <span>→</span>
                </Link>
              </div>

              {/* 3 Réassurances sous le bouton */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-white font-bold block leading-none">Livraison 24h</span>
                    <span className="text-[10px] text-slate-400">Dakar & 14 régions</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-white font-bold block leading-none">Paiement Wave & OM</span>
                    <span className="text-[10px] text-slate-400">100% sécurisé</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <Store className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-white font-bold block leading-none">Boutiques certifiées</span>
                    <span className="text-[10px] text-slate-400">Commerçants vérifiés</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flèches de navigation latérales */}
            <button
              onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : heroSlides.length - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition border border-white/20 shadow-md"
              aria-label="Slide précédent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev < heroSlides.length - 1 ? prev + 1 : 0))}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition border border-white/20 shadow-md"
              aria-label="Slide suivant"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Indicateurs de pagination */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
              {heroSlides.map((_, dot) => (
                <button
                  key={dot}
                  onClick={() => setActiveSlide(dot)}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === dot ? 'w-6 bg-amber-400 shadow-sm' : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Aller au slide ${dot + 1}`}
                />
              ))}
            </div>
          </div>

        {/* ================= 2. COMMENT ÇA MARCHE ? (CLARTÉ DÈS LA 1ÈRE SECONDE) ================= */}
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-xs">
          <div className="text-center max-w-xl mx-auto space-y-1 pb-6">
            <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200/60">
              Guide rapide Malick Buss
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Comment commander sur le marketplace ?
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Une expérience d&apos;achat simple, rapide et garantie partout au Sénégal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Étape 1 */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-amber-300 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-700 font-black text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                1
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-amber-600" />
                  <span>Choisissez une boutique</span>
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Explorez les commerces certifiés de Dakar (mode, tech, beauté) avec avis clients réels.
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-emerald-300 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 font-black text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                2
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  <span>Remplissez votre panier</span>
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Commandez vos articles au prix direct boutique, sans intermédiaires cachés.
                </p>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-sky-300 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-700 font-black text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                3
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span>Livraison 24h & Wave</span>
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Payez en 1 clic par Wave, Orange Money ou à la livraison en toute tranquillité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. SECTION MAJEURE : BOUTIQUES STARS & SPONSORISÉES (EN TÊTE) ================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500 fill-amber-400 stroke-amber-600" />
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Boutiques Stars & Sponsorisées
                </h2>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  En Vedette
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Les commerces les plus réputés de Dakar avec garantie d&apos;authenticité et livraison prioritaire.
              </p>
            </div>

            <Link
              href="/boutiques"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition"
            >
              <span>Voir toutes les boutiques certifiées</span>
              <span>→</span>
            </Link>
          </div>

          {/* Grille des 3 Boutiques VIP Sponsorisées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sponsoredBoutiques.map((shop) => (
              <motion.div
                key={shop.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo de couverture */}
                  <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                    <img
                      src={shop.coverImage}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge VIP Sponsorisé */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full shadow-md backdrop-blur-md ${shop.badgeColor}`}>
                        {shop.badge}
                      </span>
                    </div>

                    {/* Badge Quartier */}
                    <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <MapPin className="w-2.5 h-2.5 text-amber-400" />
                      <span>{shop.location}</span>
                    </div>

                    {/* Monogramme MB Circulaire */}
                    <div className="absolute -bottom-5 left-4 z-20 w-12 h-12 rounded-full bg-slate-950 text-white border-2 border-white flex flex-col items-center justify-center shadow-md">
                      <Crown className="w-2.5 h-2.5 text-amber-400 fill-amber-400 -mb-0.5" />
                      <span className="font-black text-xs tracking-tight leading-none">
                        {shop.monogram}
                      </span>
                    </div>
                  </div>

                  {/* Corps de Carte */}
                  <div className="pt-7 px-4 pb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/boutiques/${shop.slug}/produits`}
                        className="font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition flex items-center gap-1.5"
                      >
                        <span>{shop.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-amber-500 fill-amber-400" />
                      </Link>
                      <div className="flex items-center gap-1 text-xs font-black text-slate-950 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{shop.rating}</span>
                        <span className="text-[10px] font-semibold text-slate-400">{shop.reviews}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 font-medium leading-relaxed">
                      {shop.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      {shop.tags.map((t) => (
                        <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions : Visiter & Contact WhatsApp Direct */}
                <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${shop.whatsapp}?text=Bonjour%20${encodeURIComponent(shop.name)}%2C%20je%20vous%20contacte%20depuis%20Malick%20Buss`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                    title="Contacter sur WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <Link
                    href={`/boutiques/${shop.slug}/produits`}
                    className="flex-1 inline-flex items-center justify-center gap-1 bg-[#0c1527] hover:bg-amber-400 text-white hover:text-slate-950 font-bold text-xs py-2 px-3.5 rounded-full transition shadow-xs"
                  >
                    <span>Visiter la vitrine</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= 4. EXPLORER LES BOUTIQUES PAR SECTEUR (FILTRE DIRECT) ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>🏷️</span>
                <span>Trouvez vos boutiques par catégorie</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Accédez directement aux commerces spécialisés selon vos envies.
              </p>
            </div>
            <Link
              href="/boutiques"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition"
            >
              <span>Voir tout</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {popularCategories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {cat.count}
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-xs text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {cat.title}
                    </h3>
                    <p className="text-[10px] text-amber-700 font-semibold mt-0.5">
                      {cat.badge}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= 5. SÉLECTION D'ARTICLES DES BOUTIQUES OFFICIELLES ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>🔥</span>
                <span>Pépites des boutiques de Dakar</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Les articles les plus recherchés du moment disponibles en stock.
              </p>
            </div>
            <Link
              href="/boutiques"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition"
            >
              <span>Découvrir les rayons</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-xs text-amber-400 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      {prod.tag}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <Link
                      href={`/boutiques/${prod.boutiqueSlug}/produits`}
                      className="text-[11px] font-bold text-amber-600 hover:underline flex items-center gap-1"
                    >
                      <Store className="w-3 h-3" />
                      <span>{prod.boutique}</span>
                    </Link>

                    <h3 className="font-extrabold text-xs text-slate-900 line-clamp-1 group-hover:text-amber-600 transition">
                      {prod.title}
                    </h3>

                    <div className="text-sm font-black text-slate-900 pt-1">
                      {formatFCFA(prod.price)}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    href={`/boutiques/${prod.boutiqueSlug}/produits`}
                    className="w-full bg-slate-100 hover:bg-amber-400 text-slate-900 hover:text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Commander</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 6. BANNIÈRE D'ACQUISITION VENDEUR (MONÉTISATION & VISIBILITÉ) ================= */}
        <section className="bg-gradient-to-r from-[#071328] via-[#0b1c3d] to-[#071328] rounded-3xl p-6 sm:p-8 text-white border border-amber-400/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold px-3 py-1 rounded-full text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pour les commerçants de Dakar & des régions</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Placez votre boutique <span className="text-amber-400">en tête d&apos;affiche</span> sur Malick Buss.
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Obtenez une visibilité VIP auprès de milliers d&apos;acheteurs sénégalais, gérez vos commandes en temps réel et recevez vos retraits par Wave en toute sécurité.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
            <Link
              href="/vendeur/accueil"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 active:scale-95 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-amber-500/30 transition text-center flex items-center justify-center gap-2"
            >
              <Store className="w-4 h-4 stroke-[2.5px]" />
              <span>Ouvrir ma boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/vendeur/support"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-full transition text-center"
            >
              En savoir plus
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
