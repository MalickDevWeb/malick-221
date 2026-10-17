'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, ShoppingBag, LayoutDashboard } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Accueil', href: '/', icon: Home },
    { label: 'Boutiques', href: '/boutiques', icon: Store },
    { label: 'Panier', href: '/panier', icon: ShoppingBag },
    { label: 'Vendeur', href: '/vendeur/dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-6 flex justify-around items-center max-w-md mx-auto shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-emerald-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[11px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
