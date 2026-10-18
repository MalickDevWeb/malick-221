'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { DesktopFooter } from './DesktopFooter';
import { SmoothScroll } from '../motion/SmoothScroll';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVendorRoute = pathname.startsWith('/vendeur');
  const isAuthPage =
    pathname === '/connexion' ||
    pathname === '/login' ||
    pathname === '/splash';

  // Si on est sur une route vendeur, espace dédié sans header/footer/bottomnav client
  if (isVendorRoute) {
    return (
      <div className="min-h-screen antialiased bg-[#f8fafc] text-slate-900 selection:bg-amber-400 selection:text-slate-950">
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  // Si on est sur une page auth ou splash, plein écran immersif
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#040d1e] text-white">
        <SmoothScroll />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen antialiased bg-[#fafafa] text-slate-900 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      <SmoothScroll />

      {/* Header Responsive (Desktop + Mobile) */}
      <Header />

      {/* Contenu Principal Adaptatif */}
      <main className="flex-1 w-full pb-16 md:pb-0">
        {children}
      </main>

      {/* Footer Dédié pour Ordinateur de Bureau (Desktop) */}
      <DesktopFooter />

      {/* Barre de Navigation Inférieure Mobile (Masquée sur Desktop) */}
      <BottomNavigation />
    </div>
  );
}
