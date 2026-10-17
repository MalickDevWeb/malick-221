import Link from 'next/link';
import {
  Store,
  Settings,
  PlusCircle,
  Package,
  ShoppingBag,
  TrendingUp,
  Percent,
  ChevronRight,
  Home,
  BarChart2,
  DollarSign,
  User,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function VendorDashboardPage() {
  const menuItems = [
    { label: 'Ajouter un produit', href: '/vendeur/produits/ajouter', icon: PlusCircle },
    { label: 'Mes produits', href: '/boutiques/style-and-mode/produits', icon: Package },
    { label: 'Mes commandes', href: '/vendeur/commandes', icon: ShoppingBag },
    { label: 'Mes ventes', href: '/vendeur/ventes', icon: TrendingUp },
    { label: 'Mes commissions', href: '/vendeur/commissions', icon: Percent },
    { label: 'Paramètres de la boutique', href: '/vendeur/parametres', icon: Settings },
  ];

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 11 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="w-5 h-5 text-emerald-600 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Espace vendeur</h1>
        </div>
        <Link href="/vendeur/parametres" className="text-slate-700 p-1 hover:bg-slate-100 rounded-lg">
          <Settings className="w-5 h-5 stroke-[2px]" />
        </Link>
      </header>

      {/* Profil Vendeur */}
      <div className="px-4 flex items-center gap-3 pt-1">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-slate-100 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            alt="Modou"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold text-sm text-slate-900">Bonjour, Modou</h2>
          <span className="text-xs text-slate-400 block">Ma boutique : Style & Mode</span>
        </div>
      </div>

      {/* 2 Cartes de KPI Écran 11 */}
      <div className="px-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Ventes aujourd'hui</span>
          <div className="text-sm font-extrabold text-emerald-600">{formatFCFA(12000)}</div>
          <span className="text-[10px] text-slate-400 block">2 commandes</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Commission</span>
          <div className="text-sm font-extrabold text-slate-900">{formatFCFA(1200)}</div>
          <span className="text-[10px] text-slate-400 block">(10%)</span>
        </div>
      </div>

      {/* Menu Liste d'Actions Écran 11 */}
      <div className="px-4 space-y-2 pt-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm flex items-center justify-between hover:border-emerald-200 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon className="w-4 h-4 stroke-[2.2px]" />
                </div>
                <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
