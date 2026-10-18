'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Package,
  ShoppingBag,
  Store,
  User,
  ArrowLeft,
} from 'lucide-react';

export function VendorBottomNavigation({
  activeTab,
}: {
  activeTab?: 'dashboard' | 'produits' | 'commandes' | 'boutique' | 'profil';
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Accueil', href: '/vendeur/dashboard', icon: Home, key: 'dashboard' },
    { label: 'Produits', href: '/vendeur/produits', icon: Package, key: 'produits' },
    { label: 'Commandes', href: '/vendeur/commandes', icon: ShoppingBag, key: 'commandes' },
    { label: 'Boutique', href: '/vendeur/boutique', icon: Store, key: 'boutique' },
    { label: 'Profil', href: '/vendeur/profil', icon: User, key: 'profil' },
  ];

  return (
    <>
      {/* ================= 1. VUE MOBILE (< md) ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 py-2 px-3 flex justify-around items-center max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab ? activeTab === item.key : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 relative px-2 transition-all ${
                isActive
                  ? 'text-emerald-600 font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? 'stroke-emerald-600 stroke-[2.5px]'
                    : 'stroke-[1.8px]'
                }`}
              />
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-4 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
