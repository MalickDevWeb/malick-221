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
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('Toutes les catégories');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const searchCategories = [
    { label: 'Toutes les catégories', slug: '' },
    { label: 'Mode & Friperie', slug: 'mode' },
    { label: 'Électronique & High-Tech', slug: 'electronique' },
    { label: 'Beauté & Cosmétiques', slug: 'beaute' },
    { label: 'Maison & Décoration', slug: 'maison' },
    { label: 'Sport & Fitness', slug: 'sport' },
    { label: 'Enfants & Bébés', slug: 'enfants' },
  ];

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const category = searchCategories.find((item) => item.label === searchCategory);

    if (category?.slug) params.set('category', category.slug);
    if (searchTerm.trim()) params.set('q', searchTerm.trim());

    router.push(`/categories${params.size ? `?${params.toString()}` : ''}`);
    setCategoryMenuOpen(false);
  };

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

  if (hasCustomHeader) {
    return null;
  }

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR DESKTOP (Masqué sur mobile) */}
      <div className="hidden md:block bg-slate-900 text-slate-300 text-[11px] py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <span>🇸🇳</span>
              <span>Première Marketplace Multi-Boutiques au Sénégal</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">
              Livraison rapide à Dakar & dans toutes les régions
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <Link
              href="/vendeur/accueil"
              className="hover:text-amber-400 transition font-medium flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>Ouvrir une boutique</span>
            </Link>
            <Link
              href="/vendeur/dashboard"
              className="hover:text-amber-400 transition font-medium text-amber-300"
            >
              Espace Vendeur
            </Link>
            <Link href="/support" className="hover:text-white transition flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>Aide</span>
            </Link>
            <span className="text-slate-600">|</span>
            <span className="font-bold text-slate-200">FCFA (XOF)</span>
          </div>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL */}
      <header className={`sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs ${pathname === '/' ? '' : 'hidden md:block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= VUE DESKTOP (md et +) ================= */}
          <div className="hidden md:flex items-center justify-between py-3.5 gap-6">
            {/* Logo MB Malick Buss */}
            <Link href="/" className="flex-shrink-0">
              <BrandLogo size="md" variant="dark" layout="horizontal" />
            </Link>

            {/* Barre de Recherche Large avec Sélecteur Catégorie */}
            <div className="flex-1 max-w-2xl">
              <form
                onSubmit={handleSearch}
                className="relative flex items-center bg-[#f4f5f7] border border-slate-200/80 rounded-full focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all"
              >
                {/* Sélecteur de catégorie */}
                <div className="relative hidden lg:flex items-center border-r border-slate-200">
                  <button
                    type="button"
                    aria-expanded={categoryMenuOpen}
                    aria-haspopup="listbox"
                    onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                    className="flex items-center gap-1 px-3.5 py-2 text-slate-600 text-xs font-semibold whitespace-nowrap hover:bg-slate-200/50"
                  >
                    <span>{searchCategory}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  {categoryMenuOpen && (
                    <div role="listbox" aria-label="Choisir une catégorie" className="absolute left-0 top-full z-50 mt-2 min-w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                      {searchCategories.map((category) => (
                        <button
                          key={category.slug || 'all'}
                          type="button"
                          role="option"
                          aria-selected={searchCategory === category.label}
                          onClick={() => {
                            setSearchCategory(category.label);
                            setCategoryMenuOpen(false);
                          }}
                          className="block w-full px-4 py-2 text-left text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Search className="w-4 h-4 ml-3 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Rechercher un produit, une marque, une boutique à Dakar..."
                  aria-label="Rechercher un produit, une marque ou une boutique"
                  className="w-full bg-transparent text-xs px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 p-2.5 rounded-full transition shadow-xs flex-shrink-0 mr-1.5 flex items-center justify-center"
                  aria-label="Rechercher"
                >
                  <Search className="w-4 h-4 stroke-[2.5px]" />
                </button>
              </form>
            </div>

            {/* Raccourcis Droite Desktop */}
            <div className="flex items-center gap-5 flex-shrink-0">
              {/* Boutiques */}
              <Link
                href="/boutiques"
                className="flex items-center gap-1.5 text-slate-700 hover:text-amber-600 font-semibold text-xs transition"
              >
                <Store className="w-4 h-4 text-slate-600" />
                <span>Nos Boutiques</span>
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

              {/* Panier Desktop */}
              <Link
                href="/panier"
                className="flex items-center gap-2.5 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-300/70 px-3.5 py-1.5 rounded-full transition group"
              >
                <div className="relative text-amber-700">
                  <ShoppingCart className="w-4 h-4 stroke-[2.2px]" />
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                    2
                  </span>
                </div>
                <div className="text-left text-xs leading-none">
                  <span className="text-[10px] text-amber-800 font-medium block">Mon Panier</span>
                  <span className="font-extrabold text-slate-900">24 000 FCFA</span>
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

          {/* ================= SOUS-BARRE CATÉGORIES DESKTOP ================= */}
          <div className="hidden md:flex items-center justify-between border-t border-slate-100 py-2.5 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-6">
              <Link
                href="/categories"
                className="flex items-center gap-2 bg-slate-100/90 hover:bg-slate-200/80 text-slate-900 font-bold px-3.5 py-1.5 rounded-xl transition"
              >
                <Menu className="w-4 h-4 stroke-[2.2px]" />
                <span>Toutes les catégories</span>
              </Link>
              <Link href="/categories?category=mode" className="hover:text-amber-600 transition">Mode & Friperie</Link>
              <Link href="/categories?category=electronique" className="hover:text-amber-600 transition">Électronique & High-Tech</Link>
              <Link href="/categories?category=beaute" className="hover:text-amber-600 transition">Beauté & Cosmétiques</Link>
              <Link href="/categories?category=maison" className="hover:text-amber-600 transition">Maison & Décoration</Link>
              <Link href="/categories?category=sport" className="hover:text-amber-600 transition">Sport & Fitness</Link>
              <Link href="/categories?category=enfants" className="hover:text-amber-600 transition">Enfants & Bébés</Link>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Link
                href="/vendeur/dashboard"
                className="bg-slate-950 text-amber-400 px-4 py-1.5 rounded-full font-bold hover:bg-slate-900 transition flex items-center gap-1 shadow-xs"
              >
                <span>Accès Boutique</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* ================= VUE MOBILE (< md) : UNIQUEMENT SUR LA PAGE D'ACCUEIL '/' ================= */}
          {pathname === '/' && (
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
                  href="/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-slate-50"
                >
                  Catégories
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
                <Link
                  href="/vendeur/galerie"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2.5 rounded-xl bg-slate-900 text-amber-400 text-xs font-bold"
                >
                  📱 Galerie des 19 Écrans
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
