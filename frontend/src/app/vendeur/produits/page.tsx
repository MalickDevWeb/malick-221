'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  MoreVertical,
  Plus,
  Home,
  Package,
  ShoppingBag,
  Store,
  User,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { VendorBottomNavigation } from '../../../components/layout/VendorBottomNavigation';

export default function VendorProductsScreen6() {
  const [filter, setFilter] = useState('Tous');

  const products = [
    {
      id: '1',
      title: 'T-shirt oversize',
      price: 12000,
      stock: 15,
      status: 'Actif',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: '2',
      title: 'Jean vintage',
      price: 16000,
      stock: 10,
      status: 'Actif',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: '3',
      title: 'Sneakers Nike',
      price: 25000,
      stock: 8,
      status: 'Actif',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: '4',
      title: 'Veste en jean',
      price: 22000,
      stock: 6,
      status: 'Actif',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: '5',
      title: 'Sac à dos',
      price: 15000,
      stock: 12,
      status: 'Actif',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <div className="space-y-4 pb-20 bg-slate-50 min-h-screen">
      {/* Header Écran 6 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Mes produits</h1>
        </Link>
        <Link
          href="/vendeur/produits/ajouter"
          className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm"
        >
          <Plus className="w-4 h-4 stroke-[3px]" />
        </Link>
      </header>

      {/* Barre de Recherche Écran 6 */}
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

      {/* Liste des Produits Écran 6 */}
      <div className="px-4 space-y-2.5">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs text-slate-900 truncate">
                  {item.title}
                </h3>
                <span className="font-bold text-xs text-slate-900 block mt-0.5">
                  {formatFCFA(item.price)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Stock : {item.stock}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                {item.status}
              </span>
              <Link
                href={`/vendeur/produits/modifier?id=${item.id}`}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <MoreVertical className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Barre de Navigation Vendeur Adaptée (Mobile & Desktop) */}
      <VendorBottomNavigation activeTab="produits" />
    </div>
  );
}
