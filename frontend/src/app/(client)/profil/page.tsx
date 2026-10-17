import Link from 'next/link';
import {
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function ProfilePage() {
  const profileOptions = [
    { label: 'Mes commandes', href: '/panier', icon: ShoppingBag },
    { label: 'Mes favoris', href: '/', icon: Heart },
    { label: 'Mes adresses', href: '/checkout', icon: MapPin },
    { label: 'Paramètres', href: '/', icon: Settings },
    { label: 'Aide & support', href: 'https://wa.me/221771234567', icon: HelpCircle, external: true },
    { label: 'Déconnexion', href: '/splash', icon: LogOut, danger: true },
  ];

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 16 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3">
        <h1 className="font-bold text-base text-slate-900 text-center">
          Mon profil
        </h1>
      </header>

      {/* Carte Utilisateur Écran 16 */}
      <div className="px-4 flex items-center gap-3.5 pt-1">
        <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 font-black text-lg flex items-center justify-center shadow-sm flex-shrink-0 border-2 border-white">
          MB
        </div>
        <div>
          <h2 className="font-bold text-sm text-slate-900">Malick Buss</h2>
          <span className="text-xs text-slate-400 block mt-0.5">Client fidèle</span>
        </div>
      </div>

      {/* Menu Options Écran 16 */}
      <div className="px-4 space-y-2 pt-1">
        {profileOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <Link
              key={opt.label}
              href={opt.href}
              target={opt.external ? '_blank' : undefined}
              className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm flex items-center justify-between hover:border-slate-200 transition group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    opt.danger ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2px]" />
                </div>
                <span
                  className={`text-xs font-semibold ${
                    opt.danger ? 'text-rose-600' : 'text-slate-800'
                  }`}
                >
                  {opt.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          );
        })}
      </div>

      {/* Bannière Verte de Pied de Page Écran 16 */}
      <div className="px-4 pt-2">
        <Link
          href="/vendeur/dashboard"
          className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-sm flex items-center justify-between group transition active:scale-[0.98]"
        >
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">
              Espace Marchand
            </span>
            <p className="text-xs font-bold leading-snug">
              Ensemble, faisons grandir vos boutiques !
            </p>
          </div>
          <span className="text-xs font-bold bg-white text-emerald-700 px-3 py-1.5 rounded-xl shadow-sm group-hover:bg-emerald-50 transition">
            Ouvrir
          </span>
        </Link>
      </div>
    </div>
  );
}

