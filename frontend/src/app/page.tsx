'use client';

import { useState, useEffect } from 'react';
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
  Baby,
  Crown,
  Utensils,
  Truck,
  ShieldCheck,
  Headphones,
  Store,
  CheckCircle2,
  Star,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { BrandLogo } from '../components/ui/BrandLogo';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  // 2 Bannières Ultra-HD fournies par l'utilisateur
  const heroSlides = [
    {
      id: 0,
      image: '/images/hero/banner_woman_hd.png',
      tag: 'SHOPPEZ FACILEMENT AU SÉNÉGAL',
      title: 'Des milliers de produits',
      titleHighlight: 'à portée de clic !',
      subtitle:
        'Mode, high-tech, beauté, maison, sport, enfants... Trouvez tout sur Malick Buss, la marketplace qui vous simplifie la vie !',
      buttonText: 'Découvrir maintenant',
      buttonHref: '/categories',
    },
    {
      id: 1,
      image: '/images/hero/banner_man_hd.png',
      tag: 'ÉLÉGANCE & SHOPPING PREMIUM AU SÉNÉGAL 🇸🇳',
      title: 'Le meilleur de Dakar',
      titleHighlight: 'livré chez vous !',
      subtitle:
        'Explorez les collections exclusives de Dakar Plateau, Almadies et Médina avec paiement instantané Wave & Orange Money.',
      buttonText: 'Explorer les collections',
      buttonHref: '/categories',
    },
  ];

  // Défilement automatique doux toutes les 8 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 8 Catégories de la barre latérale gauche (exacte maquette)
  const sidebarCategories = [
    { name: 'Mode & Friperie', icon: ShoppingBag, href: '/categories?category=mode' },
    { name: 'Électronique & High-Tech', icon: Smartphone, href: '/categories?category=electronique' },
    { name: 'Beauté & Cosmétiques', icon: Heart, href: '/categories?category=beaute' },
    { name: 'Maison & Décoration', icon: Home, href: '/categories?category=maison' },
    { name: 'Sport & Fitness', icon: Flame, href: '/categories?category=sport' },
    { name: 'Enfants & Bébés', icon: Baby, href: '/categories?category=enfants' },
    { name: 'Artisanat Local', icon: Crown, href: '/categories?category=artisanat' },
    { name: 'Alimentation', icon: Utensils, href: '/categories?category=alimentation' },
  ];

  // 6 Catégories Populaires (exactes maquette)
  const popularCategories = [
    {
      title: 'Mode & Friperie',
      count: '+2 350 produits',
      badge: 'Tendance Dakar 🔥',
      badgeColor: 'bg-amber-400 text-slate-950',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
      icon: ShoppingBag,
      href: '/categories?category=mode',
    },
    {
      title: 'Électronique & High-Tech',
      count: '+1 890 produits',
      badge: 'Garantie 1 an',
      badgeColor: 'bg-blue-600 text-white',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      icon: Smartphone,
      href: '/categories?category=electronique',
    },
    {
      title: 'Beauté & Cosmétiques',
      count: '+1 240 produits',
      badge: '100% Authentique',
      badgeColor: 'bg-rose-500 text-white',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      icon: Heart,
      href: '/categories?category=beaute',
    },
    {
      title: 'Maison & Décoration',
      count: '+980 produits',
      badge: 'Artisanat local',
      badgeColor: 'bg-emerald-600 text-white',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      icon: Home,
      href: '/categories?category=maison',
    },
    {
      title: 'Sport & Fitness',
      count: '+760 produits',
      badge: 'Livraison 24h',
      badgeColor: 'bg-sky-600 text-white',
      icon: Flame,
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      href: '/categories?category=sport',
    },
    {
      title: 'Enfants & Bébés',
      count: '+640 produits',
      badge: 'Sécurité certifiée',
      badgeColor: 'bg-purple-600 text-white',
      icon: Baby,
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
      href: '/categories?category=enfants',
    },
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-16 font-sans">
      
      {/* Conteneur principal fluide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
        
        {/* ================= 1. SECTION HERO COMPLÈTE (SIDEBAR + BANNIÈRE COLLAGE HD) ================= */}
        <div className="flex flex-col lg:flex-row gap-5 items-stretch">
          
          {/* A. Barre Latérale "Nos catégories" (Desktop uniquement) */}
          <aside className="hidden lg:flex w-64 flex-shrink-0 bg-[#0c1527] text-white rounded-3xl p-5 shadow-sm flex-col justify-between border border-slate-800/80">
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center justify-between">
                <span>Nos catégories</span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </h2>

              <ul className="pt-3 space-y-1">
                {sidebarCategories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <li key={idx}>
                      <Link
                        href={cat.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition group"
                      >
                        <div className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                          <Icon className="w-3.5 h-3.5 stroke-[2.2px]" />
                        </div>
                        <span className="truncate">{cat.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <Link
                href="/categories"
                className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center justify-between group"
              >
                <span>Voir toutes les catégories</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </aside>

          {/* B. Grande Bannière Hero avec les Bannières HD Fournies */}
          <div className="flex-1 bg-gradient-to-r from-[#071630] via-[#0a1e3f] to-[#0f2c58] text-white rounded-3xl overflow-hidden shadow-xl relative min-h-[340px] sm:min-h-[380px] lg:min-h-[410px] flex flex-col justify-between border border-slate-800">
            
            {/* Image HD du Hero en arrière-plan avec transition douce */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
              >
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-right"
                />
                {/* Fondu bleu nuit sur la gauche pour lisibilité du texte */}
                <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 lg:w-1/2 bg-gradient-to-r from-[#071630] via-[#071630]/90 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Contenu Texte & Call to Action (Gauche) */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-10 max-w-xl space-y-4 flex-1 flex flex-col justify-center">
              
              <div className="inline-block">
                <span className="text-[10px] font-black tracking-widest uppercase text-amber-400 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full">
                  {currentSlide.tag}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {currentSlide.title} <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200">
                  {currentSlide.titleHighlight}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md drop-shadow-sm font-medium">
                {currentSlide.subtitle}
              </p>

              <div className="pt-2">
                <Link
                  href={currentSlide.buttonHref}
                  className="inline-flex items-center gap-2.5 bg-[#f59e0b] hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg shadow-amber-500/25 transition duration-200"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5px]" />
                  <span>{currentSlide.buttonText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </Link>
              </div>

              {/* 3 Réassurances sous le bouton */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-white font-bold block leading-none">Livraison rapide</span>
                    <span className="text-[10px] text-slate-400">à Dakar et partout au Sénégal</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-white font-bold block leading-none">Paiement sécurisé</span>
                    <span className="text-[10px] text-slate-400">100% fiable</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <Headphones className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-white font-bold block leading-none">Service client</span>
                    <span className="text-[10px] text-slate-400">à votre écoute</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Pagination et flèches de navigation */}
            <div className="relative z-10 px-6 sm:px-8 pb-4 flex items-center justify-between">
              {/* Flèches */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : heroSlides.length - 1))}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition"
                  aria-label="Précédent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveSlide((prev) => (prev < heroSlides.length - 1 ? prev + 1 : 0))}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition"
                  aria-label="Suivant"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Indicateurs à pastilles */}
              <div className="flex items-center gap-1.5">
                {heroSlides.map((_, dot) => (
                  <button
                    key={dot}
                    onClick={() => setActiveSlide(dot)}
                    className={`h-2 rounded-full transition-all ${
                      activeSlide === dot ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'
                    }`}
                    aria-label={`Aller au slide ${dot + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ================= 2. CATÉGORIES POPULAIRES (6 COLONNES EXACTES) ================= */}
        <section className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>🔥</span>
              <span>Catégories populaires</span>
            </h2>
            <Link
              href="/categories"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition"
            >
              <span>Voir toutes les catégories</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {popularCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={idx}
                  href={cat.href}
                  className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  {/* Photo avec badge et icône ronde */}
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />

                    {/* Badge d'accroche */}
                    <div className="absolute top-2 left-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs ${cat.badgeColor}`}>
                        {cat.badge}
                      </span>
                    </div>

                    {/* Pastille blanche ronde avec icône */}
                    <div className="absolute bottom-2 left-2 w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md group-hover:bg-amber-400 transition-colors">
                      <Icon className="w-3.5 h-3.5 stroke-[2.2px]" />
                    </div>
                  </div>

                  {/* Libellé & Nombre de produits */}
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-xs text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                        {cat.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {cat.count}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ================= 3. RANGÉE DES 3 CARTES (DEVENEZ VENDEUR + RÉASSURANCES) ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Carte 1 : Devenez vendeur ! (Bleu Nuit avec photo de l'homme souriant) */}
          <div className="bg-[#0b1a34] text-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-800 flex items-center gap-4 group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-800 border border-amber-400/30 shadow-md">
              <img
                src="/images/mockup/vendor_man_clean.jpg"
                alt="Devenez vendeur sur Malick Buss"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-black text-sm">
                <Store className="w-4 h-4" />
                <span>Devenez vendeur !</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Rejoignez des milliers de boutiques et boostez vos ventes sur Malick Buss.
              </p>
              <Link
                href="/vendeur/accueil"
                className="inline-flex items-center gap-1 bg-[#f59e0b] hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-[11px] px-3.5 py-1.5 rounded-full transition shadow-xs"
              >
                <span>Ouvrir ma boutique</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Carte 2 : Livraison rapide */}
          <div className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 flex items-center gap-4 hover:shadow-md transition">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Truck className="w-7 h-7 stroke-[2.2px]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-black text-sm text-slate-900">Livraison rapide</h3>
              <p className="text-xs text-slate-500 leading-snug">
                à Dakar et dans toutes les régions du Sénégal
              </p>
              <Link
                href="/support"
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 pt-1 transition"
              >
                <span>En savoir plus</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Carte 3 : Paiement sécurisé */}
          <div className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 flex items-center gap-4 hover:shadow-md transition">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/15 text-sky-600 flex items-center justify-center flex-shrink-0 shadow-inner">
              <ShieldCheck className="w-7 h-7 stroke-[2.2px]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-black text-sm text-slate-900">Paiement sécurisé</h3>
              <p className="text-xs text-slate-500 leading-snug">
                Payez en toute confiance avec nos partenaires
              </p>
              <Link
                href="/checkout"
                className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 pt-1 transition"
              >
                <span>En savoir plus</span>
                <span>→</span>
              </Link>
            </div>
          </div>

        </section>

      </div>

      {/* ================= 4. BANDEAU INFÉRIEUR NOIR DAKAR PRESTIGE ================= */}
      <div className="mt-8 bg-[#0c1527] border-t border-slate-800 text-white py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo MB horizontal */}
          <div className="flex-shrink-0">
            <BrandLogo size="md" variant="light" layout="horizontal" />
          </div>

          {/* 3 Statistiques de confiance */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-black text-white block">+4 000 Références</span>
                <span className="text-[10px] text-slate-400">de produits</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-black text-white block">Boutiques 100% vérifiées</span>
                <span className="text-[10px] text-slate-400">et fiables</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sky-400">
                <Star className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-black text-white block">Nouveautés quotidiennes</span>
                <span className="text-[10px] text-slate-400">et bons plans</span>
              </div>
            </div>
          </div>

          {/* Slogan manuscrit or */}
          <div className="flex items-center gap-2 text-right">
            <span className="font-serif italic font-bold text-amber-300 text-sm">
              Le meilleur du Sénégal en un clic
            </span>
            <span>🇸🇳</span>
          </div>

        </div>
      </div>

      {/* Bulle flottante de chat WhatsApp (en bas à droite) */}
      <a
        href="https://wa.me/221771234567"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 transition border-2 border-white"
        title="Discuter sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6 stroke-[2.2px]" />
      </a>

    </div>
  );
}
