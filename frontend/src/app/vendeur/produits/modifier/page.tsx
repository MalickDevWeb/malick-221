'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

export default function EditProductScreen7() {
  const router = useRouter();
  const [title, setTitle] = useState('T-shirt oversize');
  const [category, setCategory] = useState('Vêtements');
  const [price, setPrice] = useState('12000');
  const [stock, setStock] = useState('15');
  const [isPromo, setIsPromo] = useState(false);
  const [saved, setSaved] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push('/vendeur/produits');
    }, 1000);
  };

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 7 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/produits" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Modifier un produit</h1>
        </Link>
      </header>

      <form onSubmit={handleSave} className="px-4 space-y-4">
        {/* Galerie Photos Écran 7 */}
        <div className="flex gap-2.5 items-center">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm flex-shrink-0">
            <img src={images[0]} alt="main" className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2">
            {images.slice(1).map((img, idx) => (
              <div key={idx} className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Nom du Produit */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">Nom du produit *</label>
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
          <label className="text-xs font-bold text-slate-800">Catégorie *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm"
          >
            <option value="Vêtements">Vêtements</option>
            <option value="Chaussures">Chaussures</option>
            <option value="Accessoires">Accessoires</option>
          </select>
        </div>

        {/* Prix et Stock */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">Prix *</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm font-semibold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-800">Stock *</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm font-semibold"
          />
        </div>

        {/* Toggle Promotion */}
        <div className="flex items-center justify-between bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm">
          <span className="text-xs font-semibold text-slate-800">Produit en promotion</span>
          <button
            type="button"
            onClick={() => setIsPromo(!isPromo)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${
              isPromo ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md transform" />
          </button>
        </div>

        {/* Bouton Enregistrer */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-md transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 stroke-[3px]" />
                <span>Modifications enregistrées !</span>
              </>
            ) : (
              <span>Enregistrer</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
