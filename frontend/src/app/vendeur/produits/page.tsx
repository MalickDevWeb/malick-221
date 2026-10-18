'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Edit3,
  Trash2,
  Tag,
  Eye,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';

export default function VendorProductsPage() {
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const [products, setProducts] = useState([
    {
      id: '1',
      title: 'Ensemble Boubou Soie & Bazin Getzner',
      category: 'Vêtements',
      price: 28500,
      stock: 15,
      status: 'Actif',
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      title: 'Sneakers Dakar Urban Street',
      category: 'Chaussures',
      price: 22000,
      stock: 4,
      status: 'Stock Faible',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      title: 'Robe Brodée Cérémonie Dakar',
      category: 'Vêtements',
      price: 35000,
      stock: 9,
      status: 'Actif',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '4',
      title: 'Sac à Main Cuir Thiès Artisanal',
      category: 'Accessoires',
      price: 15000,
      stock: 12,
      status: 'Actif',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '5',
      title: 'Chemise Lin Homme Style Dakar',
      category: 'Vêtements',
      price: 18000,
      stock: 0,
      status: 'Rupture',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '6',
      title: 'Sandales Cuir Sénégalais Fait Main',
      category: 'Chaussures',
      price: 12500,
      stock: 18,
      status: 'Actif',
      image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  const filteredProducts = products
    .filter((p) => {
      if (filter === 'Tous') return true;
      if (filter === 'Stock Faible') return p.stock > 0 && p.stock <= 5;
      if (filter === 'Rupture') return p.stock === 0;
      return p.category === filter;
    })
    .filter((p) => {
      if (!searchTerm.trim()) return true;
      return (
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  return (
    <VendorPortalShell
      title="Catalogue & Gestion des Stocks"
      subtitle="Ajoutez des articles, ajustez vos prix et suivez l'état de vos stocks en temps réel."
      breadcrumbs={[{ label: 'Mes Produits' }]}
      actionElement={
        <Link
          href="/vendeur/produits/ajouter"
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2 rounded-full transition shadow-xs flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5px]" />
          <span>Ajouter un produit</span>
        </Link>
      }
    >
      <div className="space-y-6">
        {/* ================= 1. 4 CARTES KPI PRODUITS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Total Références</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{products.length}</div>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Actifs en boutique</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Articles en Stock</span>
            <div className="text-2xl font-black text-slate-900 mt-2">
              {products.reduce((acc, p) => acc + p.stock, 0)}
            </div>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">Unités disponibles</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Stock Faible (&le; 5)</span>
            <div className="text-2xl font-black text-amber-600 mt-2">{lowStockCount}</div>
            <span className="text-[11px] text-amber-600 font-semibold block mt-1">À réapprovisionner</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">En Rupture</span>
            <div className="text-2xl font-black text-rose-600 mt-2">{outOfStockCount}</div>
            <span className="text-[11px] text-rose-600 font-semibold block mt-1">Non visible en vente</span>
          </div>
        </div>

        {/* ================= 2. RECHERCHE ET FILTRES ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par titre de produit ou catégorie..."
                className="w-full bg-[#f4f5f7] focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-200/80 focus:border-amber-400 focus:outline-none transition"
              />
            </div>

            {/* Filtres par catégories et stock */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {['Tous', 'Vêtements', 'Chaussures', 'Accessoires', 'Stock Faible', 'Rupture'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition flex-shrink-0 ${
                    filter === tab
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ================= 3. GRILLE DE PRODUITS RESPONSIVE ================= */}
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-800">Aucun produit trouvé</h3>
              <p className="text-xs text-slate-500">Essayez un autre mot-clé ou ajoutez un nouvel article.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          {item.category}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <div className="text-sm font-black text-slate-900 pt-0.5">
                          {formatFCFA(item.price)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-500 font-medium">
                        Stock :{' '}
                        <strong
                          className={
                            item.stock === 0
                              ? 'text-rose-600 font-black'
                              : item.stock <= 5
                              ? 'text-amber-600 font-black'
                              : 'text-slate-900 font-black'
                          }
                        >
                          {item.stock} unité{item.stock > 1 ? 's' : ''}
                        </strong>
                      </span>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          item.status === 'Actif'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === 'Stock Faible'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/boutiques/style-and-mode/produits`}
                      target="_blank"
                      className="text-[11px] font-semibold text-slate-600 hover:text-amber-600 transition flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Vitrine</span>
                    </Link>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/vendeur/produits/modifier?id=${item.id}`}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-200/50 rounded-lg transition"
                        title="Modifier"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </VendorPortalShell>
  );
}
