'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, ShoppingCart, User } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  // Ne pas afficher la barre client sur les routes vendeur, splash ou galerie
  if (pathname === '/splash' || pathname.startsWith('/vendeur')) {
    return null;
  }

  const navItems = [
    { label: 'Accueil', href: '/', icon: Home, isHome: true },
    { label: 'Catégories', href: '/categories', icon: LayoutGrid },
    { label: 'Boutiques', href: '/boutiques', icon: Heart },
    { label: 'Panier', href: '/panier', icon: ShoppingCart, badge: 2 },
    { label: 'Profil', href: '/profil', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 py-2 px-2 flex justify-around items-center max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 relative px-2 transition-all ${
              isActive
                ? 'text-amber-500 font-bold'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? 'fill-amber-400 stroke-amber-500'
                    : 'stroke-[1.8px]'
                }`}
              />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] tracking-tight ${
                isActive ? 'text-slate-900 font-black' : 'text-slate-500 font-medium'
              }`}
            >
              {item.label}
            </span>
            {/* Petit trait indicateur actif sous Accueil */}
            {isActive && (
              <span className="w-5 h-0.5 bg-amber-400 rounded-full -mt-0.5" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
