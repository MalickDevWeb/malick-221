'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  TrendingUp,
  Package,
  ShoppingBag,
  Percent,
  Home,
  Store,
  User,
  DollarSign,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function VendorDashboardScreen3() {
  const weeklySales = [
    { day: 'Lun', height: '40%' },
    { day: 'Mar', height: '70%' },
    { day: 'Mer', height: '55%' },
    { day: 'Jeu', height: '85%' },
    { day: 'Ven', height: '65%' },
    { day: 'Sam', height: '100%' },
    { day: 'Dim', height: '75%' },
  ];

  return (
    <div className="space-y-4 pb-20 bg-slate-50 min-h-screen">
      {/* Header Écran 3 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/vendeur/accueil" className="text-slate-800">
            <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          </Link>
          <h1 className="font-bold text-base text-slate-900">Tableau de bord</h1>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/vendeur/notifications" className="relative text-slate-700 p-1">
            <Bell className="w-5 h-5 stroke-[2px]" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-600" />
          </Link>
          <Link href="/vendeur/profil" className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </header>

      {/* Carte Boutique Active */}
      <div className="px-4">
        <Link
          href="/vendeur/boutique"
          className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm flex items-center justify-between hover:border-emerald-200 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80"
                alt="Style & Mode"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Ma Boutique
              </span>
              <h2 className="font-extrabold text-sm text-slate-900">
                Style & Mode
              </h2>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
            Active
          </span>
        </Link>
      </div>

      {/* 4 Cartes KPI Écran 3 */}
      <div className="px-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Ventes du jour</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-sm font-black text-slate-900">{formatFCFA(48750)}</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +12%
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Commandes</span>
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-sm font-black text-slate-900">12</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +20%
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Produits en vente</span>
            <Package className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-sm font-black text-slate-900">24</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +2
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold">Commission à venir</span>
            <Percent className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-sm font-black text-slate-900">{formatFCFA(9850)}</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +15%
          </span>
        </div>
      </div>

      {/* Graphique Ventes des 7 derniers jours Écran 3 */}
      <div className="px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs text-slate-900">
              Ventes des 7 derniers jours
            </h3>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              Semaine active
            </span>
          </div>

          <div className="h-32 flex items-end justify-between pt-4 px-2">
            {weeklySales.map((w) => (
              <div key={w.day} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-6 bg-slate-100 rounded-t-lg h-24 flex items-end justify-center overflow-hidden">
                  <div
                    style={{ height: w.height }}
                    className="w-full bg-emerald-600 rounded-t-lg transition-all duration-500"
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-500">{w.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Barre de Navigation Vendeur Fixe (Accueil, Produits, Commandes, Boutique, Profil) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 py-2 px-3 flex justify-around items-center max-w-md mx-auto shadow-lg">
        <Link href="/vendeur/dashboard" className="flex flex-col items-center text-emerald-600 font-bold gap-1">
          <Home className="w-5 h-5 stroke-[2.5px]" />
          <span className="text-[10px]">Accueil</span>
        </Link>
        <Link href="/vendeur/produits" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Package className="w-5 h-5" />
          <span className="text-[10px]">Produits</span>
        </Link>
        <Link href="/vendeur/commandes" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px]">Commandes</span>
        </Link>
        <Link href="/vendeur/boutique" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Store className="w-5 h-5" />
          <span className="text-[10px]">Boutique</span>
        </Link>
        <Link href="/vendeur/profil" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profil</span>
        </Link>
      </nav>
    </div>
  );
}
