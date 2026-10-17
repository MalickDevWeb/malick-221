'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { DesktopFooter } from './DesktopFooter';
import { MockupNavigator } from './MockupNavigator';
import { SmoothScroll } from '../motion/SmoothScroll';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGallery = pathname === '/vendeur/galerie';

  // Si on est sur la vue galerie panoramique, plein écran sombre
  if (isGallery) {
    return (
      <div className="min-h-screen bg-[#0e131f] text-slate-100">
        <SmoothScroll />
        <MockupNavigator />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen antialiased bg-[#fafafa] text-slate-900 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      <SmoothScroll />
      {/* Widget Flottant d'accès aux Maquettes */}
      <MockupNavigator />

      {/* Header Responsive (Desktop + Mobile) */}
      <Header />

      {/* Contenu Principal Adaptatif : 
          - Sur mobile : pleine largeur fluide avec padding adapté
          - Sur desktop : max-w-7xl centré et aéré
      */}
      <main className="flex-1 w-full pb-16 md:pb-0">
        {children}
      </main>

      {/* Footer Dédié pour Ordinateur de Bureau (Desktop) */}
      <DesktopFooter />

      {/* Barre de Navigation Inférieure Mobile (Masquée sur Desktop via md:hidden) */}
      <BottomNavigation />
    </div>
  );
}
