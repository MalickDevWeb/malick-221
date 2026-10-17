'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { MockupNavigator } from './MockupNavigator';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGallery = pathname === '/vendeur/galerie';

  if (isGallery) {
    return (
      <div className="min-h-screen bg-[#0e131f] text-slate-100">
        <MockupNavigator />
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen antialiased bg-slate-100 text-slate-900 pb-20">
      <MockupNavigator />
      <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col shadow-xl">
        <Header />
        <main className="flex-1">{children}</main>
        <BottomNavigation />
      </div>
    </div>
  );
}
