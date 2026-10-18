'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Crown,
  Shirt,
  Smartphone,
  Sparkles,
  Home,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Truck,
  Star,
  Headphones,
  ChevronDown,
  Moon,
  Sun,
  Check,
} from 'lucide-react';
import { BrandLogo } from '../../components/ui/BrandLogo';

export default function SplashScreenPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [country, setCountry] = useState('Sénégal');
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const categories = [
    {
      id: 'mode',
      title: 'Mode',
      description: 'Vêtements, chaussures, accessoires...',
      href: '/boutiques?category=Mode',
      icon: Shirt,
      color: 'emerald',
      circleBg: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)]',
      barColor: 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]',
    },
    {
      id: 'electronique',
      title: 'Électronique',
      description: 'Téléphones, ordinateurs, gadgets...',
      href: '/boutiques?category=Électronique',
      icon: Smartphone,
      color: 'amber',
      circleBg: 'bg-amber-500/20 border-amber-400/50 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)]',
      barColor: 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]',
    },
    {
      id: 'beaute',
      title: 'Beauté',
      description: 'Soins, cosmétiques, produits de beauté...',
      href: '/boutiques?category=Beauté',
      icon: Sparkles,
      color: 'pink',
      circleBg: 'bg-pink-500/20 border-pink-400/50 text-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.5)]',
      barColor: 'bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.8)]',
    },
    {
      id: 'maison',
      title: 'Maison',
      description: 'Décoration, électroménager, et plus...',
      href: '/boutiques?category=Maison',
      icon: Home,
      color: 'blue',
      circleBg: 'bg-blue-500/20 border-blue-400/50 text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]',
      barColor: 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]',
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#050c18] text-white flex flex-col justify-between overflow-x-hidden font-sans select-none">
      {/* ================= 1. ARRIÈRE-PLAN BOUTIQUE IMMERSIF HD ================= */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 transition-all duration-700"
        style={{
          backgroundImage: `url('/images/splash/splash_reference_hd.png')`,
        }}
      />
      {/* Voiles de dégradé sombre pour faire ressortir la typographie et le néon */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#040914] via-[#050c18]/70 to-[#040914]/90 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* ================= 2. MESSAGES CALLIGRAPHIQUES MURAUX D'ORIGINE ================= */}
      {/* Panneau gauche : Soutenons nos commerçants */}
      <div className="hidden xl:block absolute left-8 top-32 z-10 max-w-[210px] text-center opacity-85 pointer-events-none">
        <div className="border border-slate-700/60 bg-[#071328]/60 backdrop-blur-md rounded-2xl p-4 shadow-xl">
          <div className="text-xl mb-1">🇸🇳</div>
          <p className="text-[11px] font-black tracking-widest text-amber-400 uppercase">
            Sénégal
          </p>
          <p className="text-xs font-bold text-slate-200 mt-1">Achat Local</p>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">
            Soutenons nos commerçants de quartier
          </p>
        </div>
      </div>

      {/* Panneau droite : Achetez local, achetez sénégalais */}
      <div className="hidden xl:block absolute right-8 top-32 z-10 max-w-[220px] text-right opacity-85 pointer-events-none">
        <div className="border border-slate-700/60 bg-[#071328]/60 backdrop-blur-md rounded-2xl p-4 shadow-xl text-center">
          <p className="text-xs font-bold text-amber-300 italic font-serif">
            "Ensemble pour un Sénégal plus fort ❤️"
          </p>
          <div className="my-2 border-t border-amber-400/20" />
          <p className="text-sm font-black text-amber-400 tracking-wide">
            Achetez local, <br />
            Achetez sénégalais ! 🇸🇳
          </p>
        </div>
      </div>

      {/* ================= 3. EN-TÊTE PREMIUM ================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo MB */}
        <Link href="/" className="hover:opacity-95 transition">
          <BrandLogo size="md" variant="light" layout="horizontal" />
        </Link>

        {/* Sélecteur Pays & Mode sombre */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold">
          {/* Menu Pays */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b172c]/90 border border-slate-700/70 hover:border-amber-400/50 text-slate-200 transition"
            >
              <span className="text-sm">🇸🇳</span>
              <span>{country}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isCountryOpen && (
              <div className="absolute right-0 mt-1.5 w-36 bg-[#09152b] border border-slate-700 rounded-xl shadow-2xl py-1 z-50">
                {['Sénégal', 'Mali', 'Côte d’Ivoire', 'Guinée'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCountry(c);
                      setIsCountryOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs text-slate-200 hover:bg-amber-400/20 hover:text-amber-400 flex items-center justify-between transition"
                  >
                    <span>{c}</span>
                    {country === c && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Séparateur */}
          <div className="h-4 w-px bg-slate-700" />

          {/* Toggle Thème */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0b172c]/90 border border-slate-700/70 hover:border-amber-400/50 text-slate-300 hover:text-white transition"
          >
            {isDarkMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Mode sombre</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Mode clair</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ================= 4. CORPS CENTRAL : LOGO GÉANT 3D & CARTES NÉON ================= */}
      <main className="relative z-20 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col items-center justify-center text-center space-y-7 sm:space-y-9">
        {/* LOGO GÉANT 3D & TYPOGRAPHIE MAJESTUEUSE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center space-y-3"
        >
          {/* Emblème MB avec Couronne Dorée Éclatante */}
          <div className="relative flex flex-col items-center select-none group">
            {/* Halo lumineux doré arrière */}
            <div className="absolute -inset-4 bg-amber-400/20 blur-2xl rounded-full pointer-events-none" />

            {/* Couronne Dorée */}
            <Crown className="w-9 h-9 sm:w-11 sm:h-11 text-amber-400 fill-amber-400 drop-shadow-[0_4px_16px_rgba(245,158,11,0.7)] -mb-2 transition-transform duration-300 group-hover:scale-110" />

            {/* Monogramme MB Métallique */}
            <span className="text-6xl sm:text-7xl font-black tracking-tight leading-none bg-gradient-to-b from-white via-amber-100 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
              MB
            </span>
          </div>

          {/* Titre Principal */}
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-md">
              MALICK BUSS
            </h1>

            {/* Ligne signature Sénégal avec filets dorés */}
            <div className="flex items-center justify-center gap-3 text-amber-400 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase">
              <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-amber-400" />
              <span>LE MARKETPLACE DU SÉNÉGAL</span>
              <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          {/* Slogans d'accroche */}
          <div className="space-y-1 max-w-lg pt-1">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-100">
              Ta marketplace, tes boutiques, tes opportunités !
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Des milliers de produits de qualité, au meilleur prix, près de chez toi.
            </p>
          </div>
        </motion.div>

        {/* 4 CARTES GLASSMORPHIC FLOTTANTES AVEC NÉON */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 w-full max-w-5xl"
        >
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative bg-[#0b172c]/75 hover:bg-[#0e1f3d]/90 backdrop-blur-xl border border-slate-700/60 hover:border-amber-400/60 rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                {/* Icône Circulaire Luminescente Néon */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110 ${cat.circleBg}`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2px]" />
                </div>

                {/* Nom & Description */}
                <div className="space-y-1 mb-3">
                  <h3 className="text-sm sm:text-base font-black text-white group-hover:text-amber-400 transition">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Petite barre lumineuse inférieure */}
                <div className={`w-8 h-1 rounded-full ${cat.barColor}`} />
              </Link>
            );
          })}
        </motion.div>

        {/* BOUTON D'ACTION PRINCIPAL : COMMENCER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="pt-2"
        >
          <Link
            href="/boutiques"
            className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 active:scale-95 text-slate-950 font-black text-sm sm:text-base px-8 sm:px-12 py-3.5 sm:py-4 rounded-full shadow-[0_12px_35px_rgba(245,158,11,0.45)] hover:shadow-[0_16px_45px_rgba(245,158,11,0.65)] transition-all duration-300 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 fill-slate-950 stroke-[2.2px]" />
            <span>Commencer</span>
            <ArrowRight className="w-4 h-4 stroke-[3px]" />
          </Link>
        </motion.div>
      </main>

      {/* ================= 5. BANDEAU DE RÉASSURANCE INFÉRIEUR ================= */}
      <footer className="relative z-20 w-full border-t border-slate-800/80 bg-[#040914]/80 backdrop-blur-md py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-around flex-wrap gap-4 text-slate-400 text-[11px] sm:text-xs font-semibold">
          <div className="flex items-center gap-2 hover:text-amber-400 transition">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Paiement sécurisé</span>
          </div>

          <div className="hidden sm:block text-slate-700">•</div>

          <div className="flex items-center gap-2 hover:text-amber-400 transition">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Livraison partout au Sénégal</span>
          </div>

          <div className="hidden sm:block text-slate-700">•</div>

          <div className="flex items-center gap-2 hover:text-amber-400 transition">
            <Star className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Produits de qualité</span>
          </div>

          <div className="hidden sm:block text-slate-700">•</div>

          <div className="flex items-center gap-2 hover:text-amber-400 transition">
            <Headphones className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Service client réactif</span>
          </div>
        </div>

        {/* Ruban Décoratif aux couleurs du Drapeau du Sénégal aux 2 Coins Inférieurs */}
        <div className="absolute bottom-0 left-0 w-28 sm:w-36 h-3 bg-gradient-to-r from-emerald-600 via-amber-400 to-red-600 rounded-tr-full opacity-90 shadow-sm pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-28 sm:w-36 h-3 bg-gradient-to-l from-emerald-600 via-amber-400 to-red-600 rounded-tl-full opacity-90 shadow-sm pointer-events-none" />
      </footer>
    </div>
  );
}
