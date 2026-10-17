'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, X, Sparkles, ChevronRight } from 'lucide-react';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories = [
    {
      title: 'Mode & Friperie',
      subtitle: 'Vêtements, chaussures, accessoires',
      itemCount: '1 420 articles',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
      href: '/categories/mode',
    },
    {
      title: 'Électronique & High-Tech',
      subtitle: 'Smartphones, audio, ordinateurs',
      itemCount: '890 articles',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      href: '/categories/electronique',
    },
    {
      title: 'Beauté & Cosmétiques',
      subtitle: 'Parfums, soins de peau, maquillage',
      itemCount: '630 articles',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      href: '/categories/beaute',
    },
    {
      title: 'Maison & Décoration',
      subtitle: 'Meubles, cuisine, linge de lit',
      itemCount: '450 articles',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      href: '/categories/maison',
    },
    {
      title: 'Sport & Fitness',
      subtitle: 'Tenues, sneakers, équipements',
      itemCount: '320 articles',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      href: '/categories/sport',
    },
    {
      title: 'Enfants & Bébés',
      subtitle: 'Vêtements enfants, jouets, puériculture',
      itemCount: '280 articles',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
      href: '/categories/enfants',
    },
  ];

  const filtered = categories.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-[#fafafa] min-h-screen pb-16">
      {/* 1. Header Mobile Dédié (< md) - Conforme à la maquette écran 3 */}
      <header className="sticky top-0 z-30 md:hidden bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-2xs">
        <Link href="/" className="flex items-center gap-2 text-slate-900 active:scale-95 transition">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-black text-base text-slate-900 tracking-tight">Catégories</h1>
        </Link>
        <button
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="text-slate-700 p-1.5 hover:bg-slate-100 rounded-full transition active:scale-90"
          aria-label="Rechercher"
        >
          {showSearchInput ? <X className="w-5 h-5" /> : <Search className="w-5 h-5 stroke-[2px]" />}
        </button>
      </header>

      {/* Barre de recherche mobile déroulante */}
      {showSearchInput && (
        <div className="md:hidden px-4 py-2.5 bg-white border-b border-slate-100 animate-in slide-in-from-top-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrer les catégories..."
              className="w-full bg-slate-50 text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:border-amber-400 focus:outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>
      )}

      {/* Conteneur principal (Fluide sur Mobile, max-w-7xl aéré sur Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 space-y-4 md:space-y-6">
        
        {/* Entête Desktop (md et +) */}
        <div className="hidden md:flex items-center justify-between pb-2 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Link href="/" className="hover:text-slate-700 transition">Accueil</Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Toutes les catégories</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Toutes les Catégories de Produits
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Explorez l'ensemble des rayons disponibles auprès de nos commerçants partenaires à Dakar.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full">
            {categories.length} univers shopping
          </span>
        </div>

        {/* Grille Catégories : 2 Colonnes sur Mobile (exact maquette), 3 sur tablette, 6 sur Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5">
          {filtered.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group bg-white rounded-2xl md:rounded-3xl border border-slate-100 overflow-hidden shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col"
            >
              <div className="h-28 md:h-36 w-full bg-slate-100 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-extrabold text-xs md:text-sm text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                    {cat.title}
                  </h2>
                  <p className="text-[10px] md:text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>{cat.itemCount}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
