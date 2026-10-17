'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function VendorSalesStatsScreen11() {
  const [period, setPeriod] = useState('Aujourd’hui');

  const topProducts = [
    {
      title: 'T-shirt oversize',
      sales: '5 ventes',
      revenue: 62500,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80',
    },
    {
      title: 'Jean vintage',
      sales: '4 ventes',
      revenue: 48000,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 11 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Mes ventes</h1>
        </Link>
      </header>

      {/* Filtres Temporels */}
      <div className="px-4 flex gap-2">
        {['Aujourd’hui', '7 jours', '30 jours'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition flex-1 text-center ${
              period === p
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* 2 Cartes KPI */}
      <div className="px-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Total des ventes</span>
          <div className="text-sm font-black text-emerald-600">{formatFCFA(187500)}</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +18%
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Nombre de commandes</span>
          <div className="text-sm font-black text-slate-900">18</div>
          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +25%
          </span>
        </div>
      </div>

      {/* Graphique Évolution des ventes */}
      <div className="px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-xs text-slate-900">Évolution des ventes</h3>
          <div className="h-28 flex items-end justify-between pt-2 px-1">
            {[
              { day: 'Lun', h: '35%' },
              { day: 'Mar', h: '60%' },
              { day: 'Mer', h: '45%' },
              { day: 'Jeu', h: '80%' },
              { day: 'Ven', h: '70%' },
              { day: 'Sam', h: '100%' },
              { day: 'Dim', h: '65%' },
            ].map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-5 bg-slate-100 rounded-t-lg h-20 flex items-end justify-center overflow-hidden">
                  <div style={{ height: d.h }} className="w-full bg-emerald-600 rounded-t-lg" />
                </div>
                <span className="text-[9px] text-slate-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Produits les plus vendus */}
      <div className="px-4 space-y-2.5">
        <h3 className="font-bold text-xs text-slate-900">Produits les plus vendus</h3>
        <div className="space-y-2">
          {topProducts.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{p.title}</h4>
                  <span className="text-[10px] text-slate-400 block">{p.sales}</span>
                </div>
              </div>
              <span className="font-extrabold text-xs text-slate-900">
                {formatFCFA(p.revenue)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
