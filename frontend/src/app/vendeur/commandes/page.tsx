'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Package,
  ShoppingBag,
  Store,
  User,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function VendorOrdersScreen8() {
  const [filter, setFilter] = useState('Toutes');

  const orders = [
    {
      id: 'MB-2025-00123',
      amount: 12000,
      date: '12 avr. 2025',
      itemsCount: 2,
      status: 'En cours',
      statusClass: 'bg-amber-50 text-amber-700 border-amber-200',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'MB-2025-00122',
      amount: 18500,
      date: '11 avr. 2025',
      itemsCount: 1,
      status: 'Livrée',
      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'MB-2025-00121',
      amount: 25000,
      date: '10 avr. 2025',
      itemsCount: 3,
      status: 'En cours',
      statusClass: 'bg-amber-50 text-amber-700 border-amber-200',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'MB-2025-00120',
      amount: 15000,
      date: '9 avr. 2025',
      itemsCount: 1,
      status: 'Livrée',
      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const filteredOrders =
    filter === 'Toutes'
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="space-y-4 pb-20 bg-slate-50 min-h-screen">
      {/* Header Écran 8 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Gestion des commandes</h1>
        </Link>
      </header>

      {/* Onglets Pilules Filtres */}
      <div className="px-4 flex gap-2 overflow-x-auto scrollbar-none">
        {['Toutes', 'En cours', 'Livrées', 'Annulées'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition flex-shrink-0 ${
              filter === tab
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Liste des Commandes Écran 8 */}
      <div className="px-4 space-y-2.5">
        {filteredOrders.map((ord) => (
          <Link
            key={ord.id}
            href={`/vendeur/commandes/${ord.id}`}
            className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm flex items-center justify-between hover:border-emerald-200 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={ord.image} alt={ord.id} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900">
                  #{ord.id}
                </h3>
                <span className="font-bold text-xs text-slate-900 block mt-0.5">
                  {formatFCFA(ord.amount)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {ord.date} • {ord.itemsCount} article{ord.itemsCount > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${ord.statusClass}`}>
                {ord.status}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
            </div>
          </Link>
        ))}
      </div>

      {/* Barre de Navigation Vendeur Fixe */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 py-2 px-3 flex justify-around items-center max-w-md mx-auto shadow-lg">
        <Link href="/vendeur/dashboard" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Accueil</span>
        </Link>
        <Link href="/vendeur/produits" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Package className="w-5 h-5" />
          <span className="text-[10px]">Produits</span>
        </Link>
        <Link href="/vendeur/commandes" className="flex flex-col items-center text-emerald-600 font-bold gap-1">
          <ShoppingBag className="w-5 h-5 stroke-[2.5px]" />
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
