'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function ClientOrdersPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'DELIVERED'>('ALL');

  const orders = [
    {
      id: 'MB-2025-00123',
      date: '12 avr. 2025 à 10:24',
      status: 'EN_COURS',
      statusLabel: 'En cours de livraison',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      total: 30500,
      paymentMethod: 'Orange Money',
      items: [
        {
          name: 'T-shirt oversize vintage',
          shop: 'Style & Mode',
          price: 12000,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80',
        },
        {
          name: 'Jean vintage délavé',
          shop: 'Style & Mode',
          price: 18500,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
    {
      id: 'MB-2025-00098',
      date: '28 mars 2025 à 15:40',
      status: 'LIVREE',
      statusLabel: 'Livrée avec succès',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      total: 25000,
      paymentMethod: 'Wave',
      items: [
        {
          name: 'Sneakers Nike Air Max Edition',
          shop: 'Style & Mode',
          price: 25000,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=200&q=80',
        },
      ],
    },
  ];

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'ACTIVE') return o.status === 'EN_COURS';
    if (activeTab === 'DELIVERED') return o.status === 'LIVREE';
    return true;
  });

  return (
    <div className="w-full bg-[#fafafa] min-h-screen pb-16">
      <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Link href="/profil" className="p-1 hover:bg-slate-100 rounded-full text-slate-800 transition">
              <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
            </Link>
            <h1 className="font-black text-lg text-slate-900 tracking-tight">Mes commandes</h1>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {orders.length} commandes au total
          </span>
        </header>

        {/* Filtres d'état */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`text-xs font-bold px-4 py-2 rounded-full transition ${
              activeTab === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Toutes ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`text-xs font-bold px-4 py-2 rounded-full transition ${
              activeTab === 'ACTIVE'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            En cours (1)
          </button>
          <button
            onClick={() => setActiveTab('DELIVERED')}
            className={`text-xs font-bold px-4 py-2 rounded-full transition ${
              activeTab === 'DELIVERED'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Livrées (1)
          </button>
        </div>

        {/* Liste des commandes */}
        <div className="space-y-4 pt-1">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-2xs space-y-3.5 hover:shadow-xs transition"
            >
              {/* Entête de carte commande */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-700" />
                    <span className="font-extrabold text-xs text-slate-900">{ord.id}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block">{ord.date}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${ord.statusColor}`}
                >
                  {ord.statusLabel}
                </span>
              </div>

              {/* Articles de la commande */}
              <div className="space-y-2.5">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{it.name}</h4>
                      <p className="text-[11px] text-slate-400">
                        Boutique : <span className="text-slate-600 font-semibold">{it.shop}</span>
                      </p>
                    </div>
                    <div className="text-right text-xs font-bold text-slate-900">
                      {formatFCFA(it.price)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Raccourcis */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Montant payé ({ord.paymentMethod})</span>
                  <span className="font-black text-sm text-slate-900">{formatFCFA(ord.total)}</span>
                </div>
                <Link
                  href={`/suivre-commande?id=${ord.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/60"
                >
                  <span>Suivre la commande</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

