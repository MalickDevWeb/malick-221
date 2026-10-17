import type { Metadata } from 'next';
import './globals.css';

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
      <body className="min-h-screen antialiased bg-slate-50 text-slate-900 pb-16 md:pb-0">
        {children}
      </body>
    </html>
  );
}
