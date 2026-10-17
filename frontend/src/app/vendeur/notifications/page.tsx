'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingBag,
  DollarSign,
  Wallet,
  MessageCircle,
  ChevronRight,
  Home,
  Package,
  Store,
  User,
  CheckCircle2,
} from 'lucide-react';

export default function VendorNotificationsScreen18() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'ORDERS' | 'COMMISSIONS'>('ALL');

  const notifications = [
    {
      id: 1,
      type: 'ORDERS',
      title: 'Nouvelle commande',
      subtitle: '#MB-2025-00124 • il y a 10 min',
      icon: ShoppingBag,
      iconColor: 'bg-emerald-100 text-emerald-600',
      href: '/vendeur/commandes',
    },
    {
      id: 2,
      type: 'COMMISSIONS',
      title: 'Commission validée',
      subtitle: '2 000 FCFA • il y a 1 h',
      icon: DollarSign,
      iconColor: 'bg-emerald-100 text-emerald-600',
      href: '/vendeur/commissions',
    },
    {
      id: 3,
      type: 'COMMISSIONS',
      title: 'Demande de retrait',
      subtitle: '15 000 FCFA • il y a 3 h',
      icon: Wallet,
      iconColor: 'bg-amber-100 text-amber-600',
      href: '/vendeur/retraits',
    },
    {
      id: 4,
      type: 'ORDERS',
      title: 'Nouveau message',
      subtitle: 'Client • il y a 5 h',
      icon: MessageCircle,
      iconColor: 'bg-blue-100 text-blue-600',
      href: '/vendeur/support',
    },
  ];

  const filtered = notifications.filter((n) => {
    if (activeTab === 'ALL') return true;
    return n.type === activeTab;
  });

  return (
    <div className="space-y-4 pb-20 bg-slate-50 min-h-screen">
      {/* Header Écran 18 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/vendeur/dashboard" className="text-slate-800">
            <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          </Link>
          <h1 className="font-bold text-base text-slate-900">Aide & contact</h1>
        </div>
      </header>

      {/* Onglets Filtres Pilules Écran 18 */}
      <div className="px-4 flex gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`font-semibold text-xs px-4 py-1.5 rounded-full flex-shrink-0 transition ${
            activeTab === 'ALL'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          Toutes
        </button>
        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`font-semibold text-xs px-4 py-1.5 rounded-full flex-shrink-0 transition ${
            activeTab === 'ORDERS'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          Commandes
        </button>
        <button
          onClick={() => setActiveTab('COMMISSIONS')}
          className={`font-semibold text-xs px-4 py-1.5 rounded-full flex-shrink-0 transition ${
            activeTab === 'COMMISSIONS'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          Commissions
        </button>
      </div>

      {/* Liste Notifications */}
      <div className="px-4">
        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-sm overflow-hidden">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50/70 transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.iconColor}`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2px]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Barre de navigation Boutiquier */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 py-2 px-3 flex justify-around items-center max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.04)] text-[10px]">
        <Link href="/vendeur/dashboard" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Home className="w-5 h-5 stroke-[1.8px]" />
          <span>Accueil</span>
        </Link>
        <Link href="/vendeur/produits" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Package className="w-5 h-5 stroke-[1.8px]" />
          <span>Produits</span>
        </Link>
        <Link href="/vendeur/commandes" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <ShoppingBag className="w-5 h-5 stroke-[1.8px]" />
          <span>Commandes</span>
        </Link>
        <Link href="/vendeur/boutique" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Store className="w-5 h-5 stroke-[1.8px]" />
          <span>Boutique</span>
        </Link>
        <Link href="/vendeur/profil" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <User className="w-5 h-5 stroke-[1.8px]" />
          <span>Profil</span>
        </Link>
      </nav>
    </div>
  );
}
