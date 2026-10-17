import Link from 'next/link';
import { ArrowRight, ShieldCheck, ShoppingBag, DollarSign, Store } from 'lucide-react';
import { BrandLogo } from '../../../components/ui/BrandLogo';

export default function VendorWelcomeScreen() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 overflow-hidden">
      {/* Photo d'ambiance commerçant/friperie */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
          alt="Boutique background"
          className="w-full h-full object-cover opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
      </div>

      {/* Header Logo */}
      <div className="relative z-10 pt-10 flex flex-col items-center text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-amber-400/30 flex items-center justify-center shadow-xl">
          <BrandLogo size="md" variant="light" />
        </div>
        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20">
          Espace boutiquier
        </span>
      </div>

      {/* Titre & Proposition de valeur */}
      <div className="relative z-10 space-y-3 text-center px-2">
        <h1 className="text-2xl font-black text-white leading-tight">
          Bienvenue sur votre espace boutiquier !
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-[280px] mx-auto">
          Gérez votre boutique, vos produits, vos ventes et vos commissions en toute simplicité.
        </p>

        {/* 3 Avantages clés */}
        <div className="grid grid-cols-3 gap-2 pt-4">
          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl flex flex-col items-center text-center gap-1">
            <Store className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] text-slate-300 font-semibold">Votre Vitrine</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl flex flex-col items-center text-center gap-1">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] text-slate-300 font-semibold">Commandes</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl flex flex-col items-center text-center gap-1">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] text-slate-300 font-semibold">Retraits Wave</span>
          </div>
        </div>
      </div>

      {/* 2 Boutons d'action Écran 1 Vendeur */}
      <div className="relative z-10 space-y-2.5 pb-8">
        <Link
          href="/vendeur/connexion"
          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-[0.98] text-xs"
        >
          <span>Se connecter</span>
        </Link>

        <Link
          href="/vendeur/dashboard"
          className="w-full bg-transparent hover:bg-white/5 border border-white/30 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98] text-xs"
        >
          <span>Créer mon compte</span>
        </Link>
      </div>
    </div>
  );
}
