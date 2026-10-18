'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  ShoppingCart,
  User,
  Store,
} from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  // Ne pas afficher la barre sur les routes splash ou connexion/login
  if (
    pathname === '/splash' ||
    pathname === '/connexion' ||
    pathname === '/login' ||
    pathname.startsWith('/vendeur')
  ) {
    return null;
  }

  const navItems = [
    { label: 'Accueil', href: '/', icon: Home },
    { label: 'Boutiques', href: '/boutiques', icon: Store },
    { label: 'Panier', href: '/panier', icon: ShoppingCart, badge: 2 },
    { label: 'Profil', href: '/profil', icon: User },
  ];

  return (
    <>
      {/* ================= 1. VUE MOBILE (< md) : Exacte comme media_1792233336018_e249d11e.png ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-100 py-2 px-2 flex justify-around items-center max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none">
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
              className={`flex flex-col items-center gap-0.5 relative px-2 transition-all ${
                isActive
                  ? 'text-amber-500 font-bold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? 'fill-amber-400 stroke-amber-500 stroke-[1.8px]'
                      : 'stroke-[1.8px]'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
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
              {/* Trait jaune doré actif sous l'onglet actif */}
              {isActive && (
                <span className="w-5 h-0.5 bg-amber-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ================= 2. VUE DESKTOP (md+) : NAVBAR DOCK LUXE FLOTTANTE ================= */}
      <nav className="hidden md:flex fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-[#0c1527]/90 backdrop-blur-2xl border border-amber-400/40 hover:border-amber-400/70 rounded-full px-5 py-2 shadow-[0_10px_35px_rgba(0,0,0,0.35)] items-center gap-5 text-white transition-all duration-300 select-none">
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all group relative ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'fill-slate-950 stroke-slate-950 stroke-[2px]'
                      : 'stroke-[2px] group-hover:scale-110 transition-transform'
                  }`}
                />
                {item.badge && !isActive && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#0c1527]">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
