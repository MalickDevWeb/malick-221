'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingCart, Bell, Search, Wifi } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export function Header() {
  const pathname = usePathname();

  // Pages avec header personnalisé ou sans header global
  const customHeaderRoutes = [
    '/splash',
    '/boutiques/',
    '/produits/',
    '/categories',
    '/panier',
    '/checkout',
    '/confirmation',
    '/vendeur',
    '/notifications',
    '/profil',
  ];

  const hasCustomHeader = customHeaderRoutes.some((route) =>
    route === '/' ? false : pathname.startsWith(route)
  );

  if (hasCustomHeader) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100/80 px-4 pt-1.5 pb-3 max-w-md mx-auto">
      {/* Barre de statut iOS 9:41 fidèle à la maquette */}
      <div className="flex items-center justify-between text-slate-900 text-xs font-semibold py-1 px-1">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          {/* Signal 4 barres */}
          <div className="flex items-end gap-0.5 h-2.5">
            <span className="w-0.5 h-1 bg-slate-900 rounded-2xs" />
            <span className="w-0.5 h-1.5 bg-slate-900 rounded-2xs" />
            <span className="w-0.5 h-2 bg-slate-900 rounded-2xs" />
            <span className="w-0.5 h-2.5 bg-slate-900 rounded-2xs" />
          </div>
          {/* Wifi */}
          <Wifi className="w-3 h-3 stroke-[2.5px]" />
          {/* Batterie */}
          <div className="w-5 h-2.5 border border-slate-900 rounded-[3px] p-[1px] flex items-center relative">
            <div className="h-full w-full bg-slate-900 rounded-[1px]" />
            <span className="w-0.5 h-1 bg-slate-900 absolute -right-[2px] top-1/2 -translate-y-1/2 rounded-r-[1px]" />
          </div>
        </div>
      </div>

      {/* Rangée Principale : Menu, Logo MB MALICK BUSS, Notif, Panier */}
      <div className="flex items-center justify-between pt-1">
        <button
          className="text-slate-900 p-1 hover:bg-slate-100 rounded-lg transition"
          aria-label="Menu de navigation"
        >
          <Menu className="w-6 h-6 stroke-[2px]" />
        </button>

        <Link href="/" className="flex flex-col items-center">
          <BrandLogo size="md" variant="dark" />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/notifications"
            className="relative text-slate-900 p-1 hover:bg-slate-100 rounded-lg transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[2px]" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white shadow-xs" />
          </Link>

          <Link
            href="/panier"
            className="relative text-slate-900 p-1 hover:bg-slate-100 rounded-lg transition"
            aria-label="Panier"
          >
            <ShoppingCart className="w-5 h-5 stroke-[2px]" />
            <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
              2
            </span>
          </Link>
        </div>
      </div>

      {/* Barre de Recherche Pilule */}
      <div className="mt-3 relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 stroke-[2px]" />
        <input
          type="text"
          placeholder="Rechercher un produit, une boutique..."
          className="w-full bg-[#f4f5f7] hover:bg-[#ecedf0] focus:bg-white text-xs pl-11 pr-4 py-2.5 rounded-full border border-transparent focus:border-amber-400 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
        />
      </div>
    </header>
  );
}
