import Link from 'next/link';
import { ArrowRight, Shirt, Smartphone, Sparkles, ShoppingBag } from 'lucide-react';
import { BrandLogo } from '../../components/ui/BrandLogo';

export default function SplashScreenPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 overflow-hidden">
      {/* Arrière-plan avec photo sombre et overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
          alt="Shopping background"
          className="w-full h-full object-cover opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
      </div>

      {/* Partie Haute : Logo & Slogan */}
      <div className="relative z-10 pt-16 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900/90 border border-amber-400/30 flex items-center justify-center shadow-xl shadow-amber-500/10 mb-2">
          <BrandLogo size="lg" variant="light" />
        </div>

        <p className="text-sm font-medium text-slate-300 max-w-[260px] leading-relaxed">
          Ta marketplace, tes boutiques, tes opportunités !
        </p>
      </div>

      {/* Partie Centrale : 3 Bulles Catégories */}
      <div className="relative z-10 space-y-6">
        <div className="flex justify-center items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <Shirt className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-slate-300">Mode</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-slate-300">Électronique</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-slate-300">Beauté</span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 font-normal">
          Des milliers de produits de plusieurs boutiques
        </p>
      </div>

      {/* Partie Basse : Bouton d'action */}
      <div className="relative z-10 pb-8">
        <Link
          href="/"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/40 transition active:scale-[0.98]"
        >
          <span>Commencer</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
        </Link>
      </div>
    </div>
  );
}

