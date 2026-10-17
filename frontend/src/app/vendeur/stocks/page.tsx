'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, MoreVertical, SlidersHorizontal } from 'lucide-react';

export default function VendorStockScreen13() {
  const [filter, setFilter] = useState('Tous');

  const stockItems = [
    {
      id: '1',
      title: 'T-shirt oversize',
      stock: 15,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '2',
      title: 'Jean vintage',
      stock: 10,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '3',
      title: 'Sneakers Nike',
      stock: 8,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '4',
      title: 'Veste en jean',
      stock: 6,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 13 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Stock</h1>
        </Link>
        <button className="text-slate-700 p-1">
          <SlidersHorizontal className="w-5 h-5 stroke-[2px]" />
        </button>
      </header>

      {/* Barre de Recherche */}
      <div className="px-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-2" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="w-full bg-white border border-slate-200 text-xs pl-10 pr-4 py-2.5 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-500 shadow-sm"
          />
        </div>
      </div>

      {/* Filtres Pilules */}
      <div className="px-4 flex gap-2 overflow-x-auto scrollbar-none">
        {['Tous', 'Vêtements', 'Chaussures', 'Accessoires'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition flex-shrink-0 ${
              filter === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Liste des Stocks */}
      <div className="px-4 space-y-2.5">
        {stockItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                <span className="text-[11px] font-bold text-emerald-600 block mt-0.5">
                  {item.stock} en stock
                </span>
              </div>
            </div>

            <button className="text-slate-400 hover:text-slate-600 p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
