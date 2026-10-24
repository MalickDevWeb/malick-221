'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Store,
  Package,
  ShoppingBag,
  CreditCard,
  Bell,
  HelpCircle,
  BarChart3,
  User,
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { DEFAULT_PROFILE, getVendorProfile, VendorProfile } from '../../services/vendorProfileStore';
import { getVendorNotifications } from '../../services/notificationStore';
import { getVendorProducts } from '../../services/productStore';

interface NavMenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  alert?: boolean;
}

export function VendorDesktopSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<VendorProfile>(DEFAULT_PROFILE);
  const [prodCount, setProdCount] = useState(0);
  const [unreadNotifs, setUnreadNotifs] = useState(0);

  useEffect(() => {
    setMounted(true);
    const syncAll = () => {
      setProfile(getVendorProfile());
      const prods = getVendorProducts();
      setProdCount(prods.length);
      const notifs = getVendorNotifications();
      setUnreadNotifs(notifs.filter((n) => !n.read).length);
    };

    syncAll();
    window.addEventListener('malick_profile_updated', syncAll);
    window.addEventListener('malick_products_updated', syncAll);
    window.addEventListener('malick_notifications_updated', syncAll);

    return () => {
      window.removeEventListener('malick_profile_updated', syncAll);
      window.removeEventListener('malick_products_updated', syncAll);
      window.removeEventListener('malick_notifications_updated', syncAll);
    };
  }, []);

  const navMenuItems: NavMenuItem[] = [
    {
      href: '/vendeur/dashboard',
      label: 'Tableau de bord',
      icon: BarChart3,
    },
    {
      href: '/vendeur/commandes',
      label: 'Mes Commandes',
      icon: ShoppingBag,
      badge: '4',
    },
    {
      href: '/vendeur/produits',
      label: 'Mes Produits & Stock',
      icon: Package,
      badge: prodCount ? String(prodCount) : undefined,
    },
    {
      href: '/vendeur/boutique',
      label: 'Ma Boutique Vitrine',
      icon: Store,
    },
    {
      href: '/vendeur/retraits',
      label: 'Finances & Retraits',
      icon: CreditCard,
      badge: '58 000 F',
    },
    {
      href: '/vendeur/notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotifs > 0 ? String(unreadNotifs) : undefined,
      alert: unreadNotifs > 0,
    },
    {
      href: '/vendeur/profil',
      label: 'Profil & Sécurité',
      icon: User,
    },
    {
      href: '/vendeur/support',
      label: 'Support & Aide 24/7',
      icon: HelpCircle,
    },
  ];

  return (
    <aside className="hidden lg:flex w-72 flex-shrink-0 bg-[#071328] text-white flex-col justify-between p-5 border-r border-slate-800 min-h-screen sticky top-0 h-screen overflow-y-auto">
      <div className="space-y-6">
        {/* En-tête Sidebar : Logo & Badge Espace Vendeur */}
        <div className="space-y-2 pb-4 border-b border-slate-800/80">
          <Link href="/vendeur/dashboard" className="block">
            <BrandLogo size="md" variant="light" layout="horizontal" />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 text-xs font-bold tracking-wide">
            <Store className="w-3.5 h-3.5 text-amber-400" />
            <span>ESPACE BOUTIQUIER</span>
          </div>
        </div>

        {/* Capsule Boutique Actuelle */}
        <div className="bg-[#0c1a35] border border-slate-700/80 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black text-xs shadow-inner flex-shrink-0 overflow-hidden" suppressHydrationWarning>
              {mounted && profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.shopName} className="w-full h-full object-cover" />
              ) : (
                <span>{mounted ? profile.shopName.substring(0, 2).toUpperCase() : 'MB'}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-xs text-white truncate" suppressHydrationWarning>
                {mounted ? profile.shopName : 'Ma Boutique'}
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active & En ligne
              </span>
            </div>
          </div>

          <Link
            href={`/boutiques/${profile.shopSlug || 'style-and-mode'}/produits`}
            target="_blank"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300 text-[11px] font-semibold rounded-lg transition"
          >
            <span>Voir ma vitrine</span>
            <ArrowUpRight className="w-3 h-3 text-amber-400" />
          </Link>
        </div>

        {/* Menu de Navigation Vendeur */}
        <nav className="space-y-1">
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/vendeur/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-slate-950 text-amber-400'
                        : item.alert
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bas de Sidebar : Profil & Retour Marketplace */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au Marketplace</span>
        </Link>

        <div className="flex items-center gap-3 pt-2">
          <div className="w-9 h-9 rounded-full bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center font-bold text-xs" suppressHydrationWarning>
            {mounted ? profile.name.substring(0, 2).toUpperCase() : 'MD'}
          </div>
          <div className="min-w-0 text-left">
            <p className="text-xs font-bold text-white truncate" suppressHydrationWarning>
              {mounted ? profile.name : 'Malick Diop'}
            </p>
            <p className="text-[10px] text-slate-400">Gérant vérifié 👑</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

