import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Package, Store, DollarSign, Bell } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'Nouvelle commande',
      desc: '#MB-00125 • 12 000 FCFA',
      time: 'il y a 5 min',
      icon: ShoppingBag,
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      id: 2,
      title: 'Un produit a été vendu',
      desc: "Votre produit 'Hoodie Nike'",
      time: 'il y a 12 min',
      icon: Package,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      id: 3,
      title: 'Nouveau vendeur',
      desc: "'TechZone' s'est inscrit",
      time: 'il y a 1 h',
      icon: Store,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      id: 4,
      title: 'Retrait de commission',
      desc: '+ 1 200 FCFA (Style & Mode)',
      time: 'il y a 2 h',
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-600',
    },
  ];

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 15 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Notifications</h1>
        </Link>
      </header>

      {/* Onglets Filtres Pilules Écran 15 */}
      <div className="px-4 flex gap-2 overflow-x-auto scrollbar-none">
        <button className="bg-emerald-600 text-white font-semibold text-xs px-4 py-1.5 rounded-full flex-shrink-0">
          Toutes
        </button>
        {['Commandes', 'Ventes', 'Système'].map((tab) => (
          <button
            key={tab}
            className="bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs px-4 py-1.5 rounded-full flex-shrink-0 border border-slate-100 transition"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Liste des Notifications Écran 15 */}
      <div className="px-4 space-y-2.5">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-slate-900 truncate">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

