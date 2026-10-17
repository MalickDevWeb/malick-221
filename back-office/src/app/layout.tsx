import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Malick Buss — Super Administration',
  description: 'Portail de gestion et supervision de la marketplace Malick Buss',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased bg-slate-900 text-slate-100">
        {children}
      </body>
    </html>
  );
}
