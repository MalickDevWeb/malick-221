'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  ShoppingCart,
  Bell,
  Search,
  Store,
  User,
  ChevronDown,
  Phone,
  HelpCircle,
  ShieldCheck,
  Heart,
  X,
  Home,
  Flame,
  Sparkles,
  Truck,
  Crown,
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/boutiques?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/boutiques');
    }
  };

  // Pages avec header personnalisé ou sans header global (ex: splash, back-office)
  // Pages avec header personnalisé ou sans header global (ex: splash, back-office)
  const customHeaderRoutes = [
    '/splash',
    '/checkout',
    '/confirmation',
    '/vendeur',
  ];

  const hasCustomHeader = customHeaderRoutes.some((route) =>
    route === '/' ? false : pathname.startsWith(route)
  );

  // Vérifier si on est sur la vitrine dédiée d'une boutique spécifique
  const isBoutiqueStorefront = pathname.startsWith('/boutiques/') && pathname.includes('/produits');

  if (hasCustomHeader) {
    return null;
  }

  return (
    <>
      {/* HEADER PRINCIPAL AVEC BANDEAU SUPÉRIEUR ANCRÉ */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
        {/* 1. TOP ANNOUNCEMENT BAR DESKTOP (Ultra-lisible, spacieux et prestige) */}
        <div className="hidden md:block bg-gradient-to-r from-[#071328] via-[#0c1a35] to-[#071328] text-slate-100 text-xs py-2 border-b border-amber-400/20 shadow-xs antialiased">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/35 px-3 py-1 rounded-full text-amber-300 font-bold text-xs shadow-xs tracking-wide">
                <span>🇸🇳</span>
                <span>Première Marketplace Multi-Boutiques au Sénégal</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-200 flex items-center gap-2 font-medium">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
                  <Truck className="w-3 h-3 stroke-[2.5px]" />
                </span>
                <span>Livraison express à Dakar & dans toutes les régions</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Link
                href="/support"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-300 hover:text-white hover:bg-white/5 font-medium text-xs transition"
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
                <span>Aide & Support</span>
              </Link>
              <span className="text-slate-700">|</span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs cursor-pointer transition select-none">
                <span>FCFA (XOF)</span>
                <ChevronDown className="w-3 h-3 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= VUE DESKTOP (md et +) ================= */}
          <div className="hidden md:flex items-center justify-between py-3.5 gap-6">
            {/* Logo MB Malick Buss */}
            <Link href="/" className="flex-shrink-0">
              <BrandLogo size="md" variant="dark" layout="horizontal" />
            </Link>

            {/* Barre de Recherche Large */}
            <div className="flex-1 max-w-2xl">
              <form
                onSubmit={handleSearch}
                className="relative flex items-center bg-[#f4f5f7] border border-slate-200/80 rounded-full focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all pl-3.5 pr-1.5 py-1"
              >
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Rechercher une boutique, un produit, une marque à Dakar..."
                  aria-label="Rechercher une boutique ou un produit"
                  className="w-full bg-transparent text-xs px-3 py-1.5 text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 p-2.5 rounded-full transition shadow-xs flex-shrink-0 flex items-center justify-center cursor-pointer"
                  aria-label="Rechercher"
                >
                  <Search className="w-4 h-4 stroke-[2.5px]" />
                </button>
              </form>
            </div>

            {/* Raccourcis Droite Desktop */}
            <div className="flex items-center gap-3.5 lg:gap-4 flex-shrink-0">
              {/* Bouton Unique Espace Vendeur */}
              <Link
                href="/vendeur/accueil"
                className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-amber-400 text-slate-800 hover:text-slate-950 font-bold text-xs px-3.5 py-2 rounded-full transition shadow-xs active:scale-95"
              >
                <Store className="w-3.5 h-3.5 text-slate-600" />
                <span>Espace Vendeur</span>
              </Link>

              {/* Notifications */}
              <Link
                href="/notifications"
                className="relative p-2 text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-full transition"
                title="Notifications"
              >
                <Bell className="w-5 h-5 stroke-[2px]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-xs" />
              </Link>

              {/* Panier Desktop - Ultra clair, lisible et harmonieux */}
              <Link
                href="/panier"
                className="flex items-center gap-2.5 bg-slate-50 hover:bg-amber-50/60 border border-slate-200/90 hover:border-amber-400 pl-1.5 pr-3.5 py-1 rounded-full transition-all duration-200 shadow-xs group"
                aria-label="Mon panier d'achats"
              >
                <div className="relative w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <ShoppingCart className="w-4 h-4 stroke-[2.2px]" />
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    2
                  </span>
                </div>

                <div className="text-left leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block group-hover:text-amber-800 transition-colors">
                    Panier
                  </span>
                  <span className="text-xs font-black text-slate-900 whitespace-nowrap block">
                    24 000 FCFA
                  </span>
                </div>
              </Link>

              {/* Profil / Compte */}
              <Link
                href="/profil"
                className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition"
              >
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                  MD
                </div>
                <span className="text-xs font-bold text-slate-800 hidden xl:inline">
                  Malick Diop ▾
                </span>
              </Link>
            </div>
          </div>

          {/* ================= BARRE DE DÉCOUVERTE ET NAVIGATION PRINCIPALE ================= */}
          {!isBoutiqueStorefront && (
            <div className="hidden md:flex items-center justify-between border-t border-slate-100 py-2.5 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2 lg:gap-3 flex-wrap">
                {/* 1. Accueil */}
                <Link
                  href="/"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition ${
                    pathname === '/'
                      ? 'text-slate-950 bg-amber-400 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Accueil</span>
                </Link>

                {/* 2. Nos Boutiques */}
                <Link
                  href="/boutiques"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition ${
                    pathname === '/boutiques'
                      ? 'text-slate-950 bg-amber-400 border border-amber-500/30 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <Store className={`w-3.5 h-3.5 ${pathname === '/boutiques' ? 'text-slate-950' : 'text-amber-500'}`} />
                  <span>Nos Boutiques</span>
                </Link>

                {/* 3. Bons Plans Dakar */}
                <Link
                  href="/boutiques?filter=promos"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-700 hover:text-amber-600 hover:bg-slate-50 font-medium transition"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>Bons Plans Dakar</span>
                  <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">
                    HOT
                  </span>
                </Link>

                {/* 4. Nouveautés */}
                <Link
                  href="/boutiques?sort=newest"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-700 hover:text-amber-600 hover:bg-slate-50 font-medium transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Nouveautés</span>
                </Link>

                {/* 5. Suivre ma commande */}
                <Link
                  href="/suivre-commande"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition ${
                    pathname === '/suivre-commande'
                      ? 'text-slate-950 bg-amber-400 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5 text-sky-600" />
                  <span>Suivre ma commande</span>
                </Link>

                {/* 6. Artisanat Sénégalais */}
                <Link
                  href="/boutiques?category=Artisanat"
                  className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full text-slate-700 hover:text-amber-600 hover:bg-slate-50 font-medium transition"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <span>Artisanat Local 🇸🇳</span>
                </Link>
              </div>

              {/* Raccourci droite sur la navbar */}
              <div className="hidden xl:flex items-center gap-3 text-slate-500 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Dakar Express disponible</span>
                </span>
              </div>
            </div>
          )}

          {/* ================= VUE MOBILE (< md) ================= */}
          {!isBoutiqueStorefront && (
            <div className="md:hidden pt-2 pb-2.5 space-y-2.5">
              {/* Ligne En-tête Mobile */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-slate-900 p-1 hover:bg-slate-100 rounded-lg transition"
                  aria-label="Menu"
                >
                  <Menu className="w-6 h-6 stroke-[2px]" />
                </button>

                <Link href="/" className="flex flex-col items-center">
                  <BrandLogo size="md" variant="dark" />
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    href="/notifications"
                    className="relative text-slate-900 p-1.5 hover:bg-slate-100 rounded-lg transition"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5 stroke-[2px]" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white shadow-xs" />
                  </Link>

                  <Link
                    href="/panier"
                    className="relative text-slate-900 p-1.5 hover:bg-slate-100 rounded-lg transition"
                    aria-label="Panier"
                  >
                    <ShoppingCart className="w-5 h-5 stroke-[2px]" />
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                      2
                    </span>
                  </Link>
                </div>
              </div>

              {/* Barre de Recherche Pilule Mobile */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 stroke-[2px]" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Rechercher un produit, une boutique..."
                  aria-label="Rechercher un produit, une marque ou une boutique"
                  className="w-full bg-[#f4f5f7] hover:bg-[#ecedf0] focus:bg-white text-xs pl-11 pr-4 py-2.5 rounded-full border border-transparent focus:border-amber-400 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* TIROIR MENU MOBILE (Menu burger) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex">
          <div className="w-4/5 max-w-xs bg-white h-full p-5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <BrandLogo size="sm" variant="dark" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 text-sm font-semibold text-slate-800">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                >
                  Accueil
                </Link>
                <Link
                  href="/boutiques"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-emerald-600 font-bold"
                >
                  Nos Boutiques
                </Link>
                <Link
                  href="/boutiques?filter=promos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-rose-600 font-medium"
                >
                  🔥 Bons Plans Dakar
                </Link>
                <Link
                  href="/panier"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                >
                  Mon Panier (2)
                </Link>
                <Link
                  href="/profil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                >
                  Mon Profil
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Espace Professionnel
                </span>
                <Link
                  href="/vendeur/accueil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-800 font-bold text-xs"
                >
                  🏪 Espace Boutiquier (Vendeur)
                </Link>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              Malick Buss • Marketplace Sénégal 🇸🇳
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
}
