import Link from 'next/link';
import {
  ArrowLeft,
  Share2,
  Edit3,
  Star,
  Store,
  CreditCard,
  Truck,
  Settings,
  ChevronRight,
  Home,
  Package,
  ShoppingBag,
  User,
} from 'lucide-react';
import { VendorBottomNavigation } from '../../../components/layout/VendorBottomNavigation';

export default function VendorShopProfileScreen4() {
  const settingsLinks = [
    { label: 'Informations de la boutique', href: '/vendeur/parametres', icon: Store },
    { label: 'Moyens de paiement', href: '/vendeur/finances', icon: CreditCard },
    { label: 'Livraison et expédition', href: '/vendeur/livraisons', icon: Truck },
    { label: 'Paramètres', href: '/vendeur/parametres', icon: Settings },
  ];

  return (
    <div className="space-y-4 pb-20 bg-slate-50 min-h-screen">
      {/* Header Écran 4 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Ma boutique</h1>
        </Link>
        <button className="text-slate-700 p-1 hover:bg-slate-100 rounded-lg">
          <Share2 className="w-5 h-5 stroke-[2px]" />
        </button>
      </header>

      {/* Couverture Boutique avec Bouton Modifier */}
      <div className="px-4">
        <div className="relative h-32 w-full rounded-2xl overflow-hidden bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80"
            alt="Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <Link
            href="/vendeur/parametres"
            className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-md text-slate-900 font-bold text-[11px] px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm"
          >
            <Edit3 className="w-3 h-3" />
            <span>Modifier</span>
          </Link>
        </div>
      </div>

      {/* Carte Boutique, Avatar et Compteurs Écran 4 */}
      <div className="px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-50 -mt-10">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=300&q=80"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-extrabold text-base text-slate-900">Style & Mode</h2>
            <span className="text-xs text-slate-400 block mt-0.5">Vêtements, chaussures, accessoires</span>
            <span className="inline-block mt-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Active
            </span>
          </div>

          {/* 3 Compteurs : 124 Produits | 2.4K Abonnés | 4.8 ★ */}
          <div className="w-full grid grid-cols-3 divide-x divide-slate-100 py-2 border-y border-slate-100 text-center">
            <div>
              <span className="font-extrabold text-sm text-slate-900 block">124</span>
              <span className="text-[10px] text-slate-400">Produits</span>
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 block">2.4K</span>
              <span className="text-[10px] text-slate-400">Abonnés</span>
            </div>
            <div>
              <div className="flex items-center justify-center gap-0.5 font-extrabold text-sm text-slate-900">
                <span>4.8</span>
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              </div>
              <span className="text-[10px] text-slate-400">(328 avis)</span>
            </div>
          </div>

          {/* 2 Boutons d'action */}
          <div className="w-full grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/vendeur/parametres"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition text-center shadow-sm"
            >
              Gérer ma boutique
            </Link>
            <Link
              href="/boutiques/style-and-mode"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl transition text-center"
            >
              Partager ma boutique
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Paramètres Boutique Écran 4 */}
      <div className="px-4 space-y-2 pt-1">
        {settingsLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm flex items-center justify-between hover:border-emerald-200 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center">
                  <Icon className="w-4 h-4 stroke-[2px]" />
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

      {/* Barre de Navigation Vendeur Adaptée (Mobile & Desktop) */}
      <VendorBottomNavigation activeTab="boutique" />
    </div>
  );
}
