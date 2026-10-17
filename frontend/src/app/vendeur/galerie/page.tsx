'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Smartphone,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  ShoppingBag,
  Store,
  ChevronRight,
} from 'lucide-react';
import { BrandLogo } from '../../../components/ui/BrandLogo';

export default function VendorMockupShowcaseBoard() {
  const [scale, setScale] = useState(1);

  const screens = [
    { num: 1, name: '1. Écran d’accueil boutiquier', path: '/vendeur/accueil' },
    { num: 2, name: '2. Connexion', path: '/vendeur/connexion' },
    { num: 3, name: '3. Tableau de bord', path: '/vendeur/dashboard' },
    { num: 4, name: '4. Profil de la boutique', path: '/vendeur/boutique' },
    { num: 5, name: '5. Ajouter un produit', path: '/vendeur/produits/ajouter' },
    { num: 6, name: '6. Liste des produits', path: '/vendeur/produits' },
    { num: 7, name: '7. Modifier un produit', path: '/vendeur/produits/modifier' },
    { num: 8, name: '8. Commandes', path: '/vendeur/commandes' },
    { num: 9, name: '9. Détail d’une commande', path: '/vendeur/commandes/MB-2025-00123' },
    { num: 10, name: '10. Suivi des livraisons', path: '/vendeur/livraisons' },
    { num: 11, name: '11. Statistiques des ventes', path: '/vendeur/ventes' },
    { num: 12, name: '12. Détails des commissions', path: '/vendeur/commissions' },
    { num: 13, name: '13. Gestion du stock', path: '/vendeur/stocks' },
    { num: 14, name: '14. Paramètres de la boutique', path: '/vendeur/parametres' },
    { num: 15, name: '15. Paiements et retraits', path: '/vendeur/retraits' },
    { num: 16, name: '16. Support / Assistance', path: '/vendeur/support' },
    { num: 17, name: '17. Profil du vendeur', path: '/vendeur/profil' },
    { num: 18, name: '18. Notifications', path: '/vendeur/notifications' },
    { num: 20, name: '20. Message de confirmation', path: '/vendeur/confirmation' },
  ];

  return (
    <div className="min-h-screen bg-[#0e131f] text-slate-100 font-sans select-none pb-20">
      {/* Top Banner reproduisant exactement le bandeau de la maquette Figma */}
      <header className="sticky top-0 z-50 bg-[#0e131f]/95 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-400/40 flex items-center justify-center shadow-lg">
            <BrandLogo size="sm" variant="light" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-wider text-white">MALICK BUSS</span>
              <span className="text-amber-400 font-bold text-xs bg-amber-500/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                Plateforme Multi-Boutiques
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Gérez votre boutique • Vendez vos produits • Suivez vos ventes • Gagnez vos commissions
            </p>
          </div>
        </div>

        {/* Titre Central Maquette */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-black text-amber-400 tracking-tight">
            Espace Boutiquier (Vendeur)
          </h1>
          <p className="text-xs text-amber-300/80 italic font-serif">
            « Votre boutique, votre réussite ! »
          </p>
        </div>

        {/* Contrôles Zoom & Accès */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(Math.max(0.6, scale - 0.1))}
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 border border-slate-800 text-xs flex items-center gap-1"
            title="Zoom arrière"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-400 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(Math.min(1.4, scale + 0.1))}
            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 border border-slate-800 text-xs flex items-center gap-1"
            title="Zoom avant"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(1)}
            className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-xs transition"
          >
            100%
          </button>
          <Link
            href="/vendeur/dashboard"
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition ml-2 shadow-lg"
          >
            <Smartphone className="w-4 h-4" />
            <span>Mode Mobile Live</span>
          </Link>
        </div>
      </header>

      {/* Grille Panoramique des 19 Écrans Smartphone */}
      <main className="p-6 overflow-x-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 transition-all duration-300 origin-top"
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
        >
          {screens.map((s) => (
            <div
              key={s.num}
              className="flex flex-col items-center space-y-2.5 group"
            >
              {/* Cadre Smartphone Haute-Fidélité */}
              <div className="relative w-[280px] h-[580px] bg-black rounded-[42px] p-2.5 border-[5px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] group-hover:border-amber-400/70 group-hover:shadow-[0_25px_60px_-15px_rgba(245,158,11,0.2)] transition-all overflow-hidden flex flex-col">
                {/* Dynamic Island / Notch Haut */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-auto mr-3 border border-slate-800" />
                </div>

                {/* Status Bar 9:41 */}
                <div className="h-6 w-full bg-transparent flex items-center justify-between px-5 text-[10px] font-semibold text-slate-800 dark:text-slate-200 z-20 pointer-events-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1 text-[9px]">
                    <span>5G</span>
                    <span className="w-4 h-2 rounded-xs border border-current inline-block relative after:absolute after:inset-0.5 after:bg-current" />
                  </div>
                </div>

                {/* Iframe interactif chargeant la route Next.js en direct */}
                <div className="flex-1 w-full h-full rounded-[30px] overflow-hidden bg-slate-50 relative">
                  <iframe
                    src={s.path}
                    title={s.name}
                    className="w-full h-full border-0 select-auto pointer-events-auto"
                    loading="lazy"
                  />
                  {/* Overlay au hover avec bouton direct */}
                  <Link
                    href={s.path}
                    className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white font-bold text-xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <span>Ouvrir l'écran en plein écran</span>
                  </Link>
                </div>

                {/* Barre Home Indicator Inférieure */}
                <div className="h-3 w-full flex items-center justify-center pt-1">
                  <div className="w-24 h-1 bg-slate-600 rounded-full" />
                </div>
              </div>

              {/* Titre sous le smartphone reproduisant le libellé de la maquette */}
              <div className="text-center">
                <span className="font-bold text-xs text-slate-300 group-hover:text-amber-400 transition">
                  {s.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
