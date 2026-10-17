import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck, Trash2, Truck } from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function CartPage() {
  return (
    <div className="p-4 space-y-4 pb-8">
      <div className="flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-emerald-600" />
        <h1 className="text-lg font-bold text-slate-900">
          Mon Panier Multi-Boutiques
        </h1>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p>
          Vos articles sont automatiquement regroupés par boutique pour une livraison et une facturation indépendantes.
        </p>
      </div>

      {/* Sous-commande Boutique 1 */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <Link href="/boutiques/keur-friperie-dakar" className="font-bold text-xs text-slate-900 hover:text-emerald-600">
            🏪 Keur Friperie Dakar
          </Link>
          <span className="text-[11px] text-slate-500 font-medium">1 article</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80"
              alt="Veste Vintage Levi's"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-slate-900 truncate">Veste Vintage en Jean Levi’s</h4>
            <span className="text-[10px] text-slate-400">Taille L • Très bon état</span>
            <div className="font-bold text-xs text-slate-900 mt-1">{formatFCFA(12500)}</div>
          </div>
          <button className="text-slate-400 hover:text-rose-500 p-1">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-slate-400" />
            <span>Livraison Dakar (Sandaga)</span>
          </div>
          <span className="font-semibold text-slate-800">{formatFCFA(1500)}</span>
        </div>
      </div>

      {/* Sous-commande Boutique 2 */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <Link href="/boutiques/dakar-streetwear" className="font-bold text-xs text-slate-900 hover:text-emerald-600">
            🏪 Dakar Streetwear
          </Link>
          <span className="text-[11px] text-slate-500 font-medium">1 article</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=200&q=80"
              alt="Hoodie Dakar Club"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-slate-900 truncate">Hoodie Oversize Dakar Club Noir</h4>
            <span className="text-[10px] text-slate-400">Taille XL • Neuf</span>
            <div className="font-bold text-xs text-slate-900 mt-1">{formatFCFA(19500)}</div>
          </div>
          <button className="text-slate-400 hover:text-rose-500 p-1">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-slate-400" />
            <span>Livraison Almadies / Ngor</span>
          </div>
          <span className="font-semibold text-slate-800">{formatFCFA(2000)}</span>
        </div>
      </div>

      {/* Récapitulatif Total */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
        <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
          Récapitulatif de la commande
        </h3>

        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Sous-total articles</span>
            <span>{formatFCFA(32000)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Frais de livraison cumulés (2 boutiques)</span>
            <span>{formatFCFA(3500)}</span>
          </div>
          <div className="border-t border-slate-100 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
            <span>Total Général</span>
            <span className="text-emerald-600">{formatFCFA(35500)}</span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition text-xs"
        >
          <span>Procéder au paiement (Wave / OM / Cash)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
