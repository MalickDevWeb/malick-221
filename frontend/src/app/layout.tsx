import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/layout/Header';
import { BottomNavigation } from '../components/layout/BottomNavigation';

export const metadata: Metadata = {
  title: 'Malick Buss — Marketplace Multi-Boutiques Sénégal',
  description: 'Achetez et vendez sur la première marketplace multi-boutiques au Sénégal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased bg-slate-100 text-slate-900 pb-20">
        <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col shadow-xl">
          <Header />
          <main className="flex-1">{children}</main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}

