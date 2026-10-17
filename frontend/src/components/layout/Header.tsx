'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingBag, Search } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 pt-3 pb-3 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <button
          className="text-slate-800 p-1.5 hover:bg-slate-100 rounded-lg transition"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5 stroke-[2.2px]" />
        </button>

        <Link href="/" className="flex flex-col items-center">
          <BrandLogo size="sm" variant="dark" />
        </Link>

        <Link
          href="/panier"
          className="relative text-slate-800 p-1.5 hover:bg-slate-100 rounded-lg transition"
          aria-label="Panier"
        >
          <ShoppingBag className="w-5 h-5 stroke-[2.2px]" />
          <span className="absolute 0 top-0.5 right-0.5 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
            2
          </span>
        </Link>
      </div>

      <div className="mt-3 relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-2" />
        <input
          type="text"
          placeholder="Rechercher un produit, une boutique..."
          className="w-full bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-400"
        />
      </div>
    </header>
  );
}
