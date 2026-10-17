import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '../components/layout/AppShell';

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
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
