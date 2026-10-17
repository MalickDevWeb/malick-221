'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Check } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState('Veste en jean vintage');
  const [category, setCategory] = useState('Mode > Homme');
  const [price, setPrice] = useState('12000');
  const [stock, setStock] = useState('10');
  const [published, setPublished] = useState(false);

  const thumbnails = [
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPublished(true);
    setTimeout(() => {
      router.push('/vendeur/dashboard');
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-8 bg-slate-50 min-h-screen">
      {/* Header Écran 12 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Ajouter un produit</h1>
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="px-4 space-y-4">
        {/* Téléversement Photos Écran 12 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Ajouter des photos</span>
            <span className="text-[11px] text-slate-400">(1 à 5 photos)</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition cursor-pointer shadow-sm">
              <Camera className="w-6 h-6 stroke-[1.8px]" />
            </div>

            {thumbnails.map((thumb, idx) => (
              <div key={idx} className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                <img src={thumb} alt={`preview ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Nom du Produit */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">Nom du produit</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm"
          />
        </div>

        {/* Catégorie */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">Catégorie</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm"
          >
            <option value="Mode > Homme">Mode &gt; Homme</option>
            <option value="Mode > Femme">Mode &gt; Femme</option>
            <option value="Mode > Enfant">Mode &gt; Enfant</option>
            <option value="Friperie">Friperie de sélection</option>
            <option value="Sneakers">Sneakers & Chaussures</option>
          </select>
        </div>

        {/* Prix FCFA et Stock (2 colonnes) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">Prix (FCFA)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm font-semibold"
            />
          </div>
        </div>

        {/* Bouton de Soumission */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={published}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98]"
          >
            {published ? (
              <>
                <Check className="w-4 h-4 stroke-[3px]" />
                <span>Produit publié avec succès !</span>
              </>
            ) : (
              <span>Publier le produit</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
