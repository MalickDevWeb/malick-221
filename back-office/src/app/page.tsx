'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  LayoutDashboard,
  Store,
  Users,
  Package,
  ShoppingBag,
  Percent,
  UserCheck,
  Settings,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import { formatFCFA } from '../../../frontend/src/services/api';

export default function AdminScreen13Page() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'shops', label: 'Boutiques', icon: Store },
    { id: 'vendors', label: 'Vendeurs', icon: Users },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingBag },
    { id: 'commissions', label: 'Commissions', icon: Percent },
    { id: 'users', label: 'Utilisateurs', icon: UserCheck },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Menu Latéral Gauche Écran 13 */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header avec Couronne Dorée */}
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Crown className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white leading-tight">
                Espace administrateur
              </h1>
              <span className="text-[10px] text-slate-400 block">Super Admin Malick Buss</span>
            </div>
          </div>

          {/* Liste des Liens de Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2px]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 px-2">
          Marché : Sénégal • FCFA
        </div>
      </aside>

      {/* Contenu Principal Écran 13 */}
      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Tableau de bord</h2>
          <span className="bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium">
            Temps réel • En direct
          </span>
        </div>

        {/* 4 Cartes de KPI Écran 13 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total des ventes
            </span>
            <div className="text-xl font-black text-emerald-400">
              {formatFCFA(2450000)}
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 font-bold">
              <TrendingUp className="w-3 h-3" /> +15%
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Nombre de boutiques
            </span>
            <div className="text-xl font-black text-white">32</div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 font-bold">
              <TrendingUp className="w-3 h-3" /> +3
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Commandes aujourd'hui
            </span>
            <div className="text-xl font-black text-white">156</div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 font-bold">
              <TrendingUp className="w-3 h-3" /> +18%
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Commissions du jour
            </span>
            <div className="text-xl font-black text-amber-400">
              {formatFCFA(245000)}
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 font-bold">
              <TrendingUp className="w-3 h-3" /> +10%
            </span>
          </div>
        </div>

        {/* Graphique / Aperçu des Transactions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Activité récente de la marketplace</h3>
              <p className="text-xs text-slate-400">Dernières commandes enregistrées et réconciliations</p>
            </div>
            <button className="text-xs text-emerald-400 font-semibold hover:underline">
              Voir tout l'historique
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { id: 'MB-00125', shop: 'Style & Mode', amount: 12000, com: 1200, time: 'il y a 5 min' },
              { id: 'MB-00124', shop: 'TechZone', amount: 35000, com: 2800, time: 'il y a 8 min' },
              { id: 'MB-00123', shop: 'Beauty World', amount: 8500, com: 850, time: 'il y a 25 min' },
            ].map((tx) => (
              <div
                key={tx.id}
                className="bg-slate-800/60 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-white">Commande #{tx.id}</h4>
                  <span className="text-[11px] text-slate-400">{tx.shop} • {tx.time}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-xs text-white block">{formatFCFA(tx.amount)}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Com: {formatFCFA(tx.com)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
