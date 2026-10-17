import Link from 'next/link';
import { Package, TrendingUp, ShoppingCart, AlertCircle, Plus, Wallet, ArrowUpRight } from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function VendorDashboardPage() {
  return (
    <div className="p-4 space-y-5 pb-8">
      {/* En-tête Vendeur */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider block">
            Espace Boutiquier
          </span>
          <h1 className="text-lg font-extrabold text-slate-900">
            Keur Friperie Dakar
          </h1>
        </div>
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
          Boutique Validée
        </span>
      </div>

      {/* Carte Portefeuille & Solde disponible */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 text-xs">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <span>Solde Net Retirable</span>
          </div>
          <span className="text-[10px] bg-slate-700/80 text-emerald-300 font-semibold px-2 py-0.5 rounded">
            Wave & OM
          </span>
        </div>

        <div>
          <div className="text-2xl font-black tracking-tight text-white">
            {formatFCFA(187500)}
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Commissions Malick Buss déduites (10%)
          </p>
        </div>

        <div className="pt-2 flex gap-2">
          <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 transition shadow-sm">
            <span>Demander un virement</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Ventes & Commandes */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs">Commandes</span>
            <ShoppingCart className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900">14</div>
          <span className="text-[10px] text-emerald-600 font-medium">3 à préparer aujourd'hui</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs">Articles en stock</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900">28</div>
          <span className="text-[10px] text-amber-600 font-medium">2 alertes stock bas</span>
        </div>
      </div>

      {/* Actions Rapides */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Actions Rapides
        </h2>
        <div className="grid grid-cols-1 gap-2">
          <Link
            href="/vendeur/produits/ajouter"
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 hover:border-emerald-500 shadow-sm flex items-center justify-between transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900">Publier un nouvel article</h3>
                <p className="text-[11px] text-slate-500">Prendre une photo et fixer le prix FCFA</p>
              </div>
            </div>
          </Link>

          <Link
            href="/vendeur/commandes"
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 hover:border-emerald-500 shadow-sm flex items-center justify-between transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900">Gérer les commandes reçues</h3>
                <p className="text-[11px] text-slate-500">Remettre les colis aux coursiers</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
