'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Smartphone, ChevronUp, ChevronDown, CheckCircle2, Store, ShoppingBag, Sparkles, ChevronRight } from 'lucide-react';

interface ScreenItem {
  num: number;
  name: string;
  path: string;
  external?: boolean;
}

export function MockupNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'CLIENT' | 'VENDEUR'>('VENDEUR');
  const pathname = usePathname();

  const clientScreens: ScreenItem[] = [
    { num: 1, name: 'Écran de démarrage', path: '/splash' },
    { num: 2, name: 'Accueil', path: '/' },
    { num: 3, name: 'Catégories', path: '/categories' },
    { num: 4, name: 'Liste des boutiques', path: '/boutiques' },
    { num: 5, name: 'Page d’une boutique', path: '/boutiques/style-and-mode' },
    { num: 6, name: 'Liste des produits', path: '/boutiques/style-and-mode/produits' },
    { num: 7, name: 'Détail du produit', path: '/produits/1' },
    { num: 8, name: 'Panier', path: '/panier' },
    { num: 9, name: 'Validation commande', path: '/checkout' },
    { num: 10, name: 'Confirmation', path: '/confirmation' },
    { num: 11, name: 'Suivre ma commande', path: '/suivre-commande' },
    { num: 12, name: 'Mes commandes', path: '/commandes' },
    { num: 13, name: 'Espace vendeur', path: '/vendeur/dashboard' },
    { num: 14, name: 'Ajouter un produit', path: '/vendeur/produits/ajouter' },
    { num: 15, name: 'Espace administrateur', path: 'http://localhost:3001', external: true },
    { num: 16, name: 'Profil client', path: '/profil' },
  ];

  const vendorScreens: ScreenItem[] = [
    { num: 1, name: 'Accueil boutiquier', path: '/vendeur/accueil' },
    { num: 2, name: 'Connexion', path: '/vendeur/connexion' },
    { num: 3, name: 'Tableau de bord', path: '/vendeur/dashboard' },
    { num: 4, name: 'Profil de la boutique', path: '/vendeur/boutique' },
    { num: 5, name: 'Ajouter un produit', path: '/vendeur/produits/ajouter' },
    { num: 6, name: 'Liste des produits', path: '/vendeur/produits' },
    { num: 7, name: 'Modifier un produit', path: '/vendeur/produits/modifier' },
    { num: 8, name: 'Gestion des commandes', path: '/vendeur/commandes' },
    { num: 9, name: 'Détails de la commande', path: '/vendeur/commandes/MB-2025-00123' },
    { num: 10, name: 'Suivi des livraisons', path: '/vendeur/livraisons' },
    { num: 11, name: 'Statistiques des ventes', path: '/vendeur/ventes' },
    { num: 12, name: 'Détails des commissions', path: '/vendeur/commissions' },
    { num: 13, name: 'Gestion du stock', path: '/vendeur/stocks' },
    { num: 14, name: 'Paramètres boutique', path: '/vendeur/parametres' },
    { num: 15, name: 'Paiements et retraits', path: '/vendeur/retraits' },
    { num: 16, name: 'Support / Assistance', path: '/vendeur/support' },
    { num: 17, name: 'Profil du vendeur', path: '/vendeur/profil' },
    { num: 18, name: 'Notifications / Contact', path: '/vendeur/notifications' },
    { num: 20, name: 'Confirmation produit ajouté', path: '/vendeur/confirmation' },
  ];

  const currentList = activeTab === 'CLIENT' ? clientScreens : vendorScreens;

  return (
    <div className="fixed top-2 right-2 z-50 font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900/95 hover:bg-slate-900 text-amber-400 border border-amber-400/30 text-[10px] font-bold py-1.5 px-3 rounded-full shadow-xl flex items-center gap-1.5 backdrop-blur-md transition active:scale-95"
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
        <span>Navigateur Maquettes</span>
        {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl p-2.5 text-slate-200 backdrop-blur-md max-h-[82vh] overflow-y-auto scrollbar-thin">
          {/* Onglets de sélection du jeu de maquettes */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-900 rounded-xl mb-2">
            <button
              onClick={() => setActiveTab('CLIENT')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-bold transition ${
                activeTab === 'CLIENT'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>16 Écrans Client</span>
            </button>
            <button
              onClick={() => setActiveTab('VENDEUR')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-bold transition ${
                activeTab === 'VENDEUR'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="w-3 h-3" />
              <span>20 Écrans Vendeur</span>
            </button>
          </div>

          {/* Bouton Vue Panoramique Maquette Figma */}
          <Link
            href="/vendeur/galerie"
            onClick={() => setIsOpen(false)}
            className="mb-2 p-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border border-amber-400/40 flex items-center justify-between text-amber-300 hover:text-white transition group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="text-left">
                <div className="text-[11px] font-black tracking-wide">Vue Panoramique Maquette</div>
                <div className="text-[9px] text-slate-400">Voir les 20 smartphones côte-à-côte</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <div className="px-2 py-1 border-b border-slate-800/80 mb-1 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-300">
              {activeTab === 'CLIENT' ? 'Marketplace Mobile' : 'Espace Boutiquier Malick Buss'}
            </span>
            <span className="text-[9px] text-slate-500">
              {currentList.length} écrans
            </span>
          </div>

          <div className="space-y-0.5">
            {currentList.map((s) => {
              const isActive = pathname === s.path;
              return s.external ? (
                <a
                  key={s.num}
                  href={s.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] text-slate-300 hover:bg-slate-800/80 hover:text-white transition"
                >
                  <span className="font-medium truncate">
                    <strong className="text-amber-400 font-bold mr-1.5">{s.num}.</strong>
                    {s.name}
                  </span>
                  <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded flex-shrink-0">
                    Admin
                  </span>
                </a>
              ) : (
                <Link
                  key={s.num}
                  href={s.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition ${
                    isActive
                      ? activeTab === 'CLIENT'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium'
                  }`}
                >
                  <span className="truncate">
                    <strong
                      className={
                        isActive
                          ? activeTab === 'CLIENT'
                            ? 'text-white mr-1.5'
                            : 'text-slate-950 mr-1.5'
                          : activeTab === 'CLIENT'
                          ? 'text-emerald-400 mr-1.5'
                          : 'text-amber-400 mr-1.5'
                      }
                    >
                      {s.num}.
                    </strong>
                    {s.name}
                  </span>
                  {isActive && <CheckCircle2 className="w-3 h-3 flex-shrink-0" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
