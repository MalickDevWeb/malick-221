'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  Store,
  ChevronDown,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import { VendorDesktopSidebar } from './VendorDesktopSidebar';
import { VendorBottomNavigation } from './VendorBottomNavigation';
import { BrandLogo } from '../ui/BrandLogo';
import { DEFAULT_PROFILE, getVendorProfile, VendorProfile } from '../../services/vendorProfileStore';
import { getVendorNotifications } from '../../services/notificationStore';

interface VendorPortalShellProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actionElement?: React.ReactNode;
  children: React.ReactNode;
}

export function VendorPortalShell({
  title,
  subtitle,
  breadcrumbs,
  actionElement,
  children,
}: VendorPortalShellProps) {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<VendorProfile>(DEFAULT_PROFILE);
  const [unreadNotifs, setUnreadNotifs] = useState(0);

  useEffect(() => {
    setMounted(true);
    const syncProfile = () => setProfile(getVendorProfile());
    const syncNotifs = () => {
      const notifs = getVendorNotifications();
      setUnreadNotifs(notifs.filter((n) => !n.read).length);
    };

    syncProfile();
    syncNotifs();

    window.addEventListener('malick_profile_updated', syncProfile);
    window.addEventListener('malick_notifications_updated', syncNotifs);
    return () => {
      window.removeEventListener('malick_profile_updated', syncProfile);
      window.removeEventListener('malick_notifications_updated', syncNotifs);
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans antialiased">
      {/* 1. SIDEBAR DESKTOP PRESTIGE */}
      <VendorDesktopSidebar />

      {/* 2. CONTENU PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Desktop (lg+) & Mobile */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3.5 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {/* Mobile Back Button (visible only < lg) */}
            <div className="flex lg:hidden items-center shrink-0">
              <Link
                href="/vendeur/dashboard"
                className="p-1.5 -ml-1 text-slate-700 hover:text-amber-600 bg-slate-100/80 active:bg-slate-200 rounded-xl transition"
                title="Retour au tableau de bord"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
              </Link>
            </div>

            {/* Breadcrumbs & Title */}
            <div className="min-w-0 flex-1">
              {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-0.5">
                  <Link href="/vendeur/dashboard" className="hover:text-amber-600 transition">
                    Espace Vendeur
                  </Link>
                  {breadcrumbs.map((bc, idx) => (
                    <React.Fragment key={idx}>
                      <span>/</span>
                      {bc.href ? (
                        <Link href={bc.href} className="hover:text-amber-600 transition">
                          {bc.label}
                        </Link>
                      ) : (
                        <span className="text-slate-600 font-semibold">{bc.label}</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
              <h1 className="text-sm sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-tight truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="hidden md:block text-xs text-slate-500 font-medium truncate">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Quick Actions & Profile on the right */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {actionElement}

            {/* Notifications Button */}
            <Link
              href="/vendeur/notifications"
              className="relative p-2 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-full transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4 stroke-[2px]" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadNotifs > 9 ? '9+' : unreadNotifs}
                </span>
              )}
            </Link>

            {/* Store Preview Link */}
            <Link
              href={`/boutiques/${profile.shopSlug || 'style-and-mode'}/produits`}
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-amber-400 text-slate-700 hover:text-amber-700 text-xs font-semibold transition shadow-2xs"
            >
              <Store className="w-3.5 h-3.5 text-amber-500" />
              <span suppressHydrationWarning>{mounted ? (profile.shopName || 'Ma boutique') : 'Ma boutique'}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            {/* Profile Dropdown */}
            <Link
              href="/vendeur/profil"
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition"
            >
              <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center text-xs font-bold overflow-hidden border border-amber-400/40" suppressHydrationWarning>
                {mounted && profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{mounted ? profile.name.substring(0, 2).toUpperCase() : 'MB'}</span>
                )}
              </div>
              <span className="text-xs font-bold text-slate-800 hidden xl:inline" suppressHydrationWarning>
                {mounted ? profile.name : 'Vendeur'}
              </span>
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-28 lg:pb-12">
          {children}
        </main>
      </div>

      {/* 3. NAVIGATION MOBILE BASSE (< lg) */}
      <VendorBottomNavigation />
    </div>
  );
}

