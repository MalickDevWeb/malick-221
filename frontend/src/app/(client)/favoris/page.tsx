'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Trash2,
  ShoppingCart,
  Star,
  ArrowRight,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function WishlistPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'T-shirt oversize vintage 90s',
      shop: 'Style & Mode',
      price: 12000,
      oldPrice: 15000,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Sneakers Nike Air Max Edition',
      shop: 'Style & Mode',
      price: 25000,
      oldPrice: 32000,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
    },
    {
      id: 3,
      title: 'Coffret Parfum & Soin Éclat',
      shop: 'Beauty World',
      price: 28000,
      oldPrice: 35000,
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
    },
  ]);

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen pb-16">
      <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <Link href="/profil" className="p-1 hover:bg-slate-100 rounded-full text-slate-800 transition">
              <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
            </Link>
            <h1 className="font-black text-lg text-slate-900 tracking-tight">Mes favoris</h1>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {items.length} articles sauvegardés
          </span>
        </header>

        {items.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900">Aucun favori pour le moment</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Enregistrez vos coups de cœur en cliquant sur le cœur sur les fiches produits.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-full"
            >
              <span>Découvrir les produits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((it) => (
              <div
                key={it.id}
                className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-2xs flex items-center justify-between gap-3 hover:shadow-xs transition"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                  <img src={it.image} alt={it.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                    {it.shop}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {it.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">
                      {formatFCFA(it.price)}
                    </span>
                    <span className="text-[10px] text-slate-400 line-through">
                      {formatFCFA(it.oldPrice)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href="/panier"
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
                    title="Ajouter au panier"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Supprimer des favoris"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

