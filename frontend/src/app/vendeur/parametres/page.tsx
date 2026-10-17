'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Camera } from 'lucide-react';

export default function VendorSettingsScreen14() {
  const [shopName, setShopName] = useState('Style & Mode');
  const [category, setCategory] = useState('Vêtements');
  const [description, setDescription] = useState('Vêtements, chaussures, accessoires');
  const [contact, setContact] = useState('+221 77 123 45 67');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 14 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Paramètres de la boutique</h1>
        </Link>
      </header>

      <form onSubmit={handleSave} className="px-4 space-y-4">
        <span className="text-xs font-bold text-slate-900 block">
          Informations générales
        </span>

        {/* Nom Boutique */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Nom de la boutique</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm"
          />
        </div>

        {/* Catégorie Principale */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Catégorie principale</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm"
          >
            <option value="Vêtements">Vêtements</option>
            <option value="Chaussures">Chaussures</option>
            <option value="Accessoires">Accessoires</option>
            <option value="Électronique">Électronique</option>
          </select>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm"
          />
        </div>

        {/* Logo Boutique */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Logo de la boutique</label>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-900 border-2 border-white shadow-sm flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=200&q=80"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm hover:bg-slate-50 transition"
            >
              Modifier
            </button>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-sm"
          />
        </div>

        {/* Bouton Enregistrer */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 stroke-[3px]" />
                <span>Paramètres enregistrés !</span>
              </>
            ) : (
              <span>Enregistrer les modifications</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
