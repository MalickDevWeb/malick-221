'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

export default function VendorProductConfirmationScreen20() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 max-w-xs mx-auto">
        {/* Grande Icône Verte Circulaire Écran 20 */}
        <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-sm bg-emerald-50/40">
          <Check className="w-10 h-10 stroke-[3px]" />
        </div>

        {/* Titre & Message */}
        <div className="space-y-1.5 pt-2">
          <h1 className="text-lg font-black text-slate-900 tracking-tight">
            Produit ajouté avec succès !
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Votre produit a été publié sur votre boutique.
          </p>
        </div>
      </div>

      {/* 2 Boutons d'Action Inférieurs Écran 20 */}
      <div className="space-y-2.5 max-w-sm mx-auto w-full pb-4">
        <Link
          href="/vendeur/produits"
          className="block w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl text-center shadow-sm text-xs transition"
        >
          Voir mon produit
        </Link>
        <Link
          href="/vendeur/boutique"
          className="block w-full bg-white hover:bg-slate-50 active:scale-[0.99] border border-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl text-center text-xs transition shadow-2xs"
        >
          Retour à la boutique
        </Link>
      </div>
    </div>
  );
}
