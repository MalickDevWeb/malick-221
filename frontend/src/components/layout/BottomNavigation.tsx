'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, LayoutGrid, ShoppingBag, User } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  // Ne pas afficher la barre de navigation sur l'écran 1 (démarrage/splash)
  if (pathname === '/splash') {
    return null;
  }

  const navItems = [
    { label: 'Accueil', href: '/', icon: Home },
    { label: 'Boutiques', href: '/boutiques', icon: Store },
    { label: 'Catégories', href: '/categories', icon: LayoutGrid },
    { label: 'Panier', href: '/panier', icon: ShoppingBag, badge: 2 },
    { label: 'Profil', href: '/profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 py-2 px-3 flex justify-around items-center max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
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
              isActive ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
