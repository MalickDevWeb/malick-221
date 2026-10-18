'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Package,
  ShoppingBag,
  Store,
  User,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { getOrders, OrderStatus, StoredOrder } from '../../../services/order-flow';
import { VendorBottomNavigation } from '../../../components/layout/VendorBottomNavigation';

const STATUS_LABELS: Record<OrderStatus, string> = {
  CONFIRMED: 'En cours',
  PREPARING: 'En cours',
  SHIPPED: 'En cours',
  DELIVERED: 'Livrées',
  CANCELLED: 'Annulées',
};

const STATUS_CLASSES: Record<OrderStatus, string> = {
  CONFIRMED: 'bg-amber-50 text-amber-700 border-amber-200',
  PREPARING: 'bg-amber-50 text-amber-700 border-amber-200',
  SHIPPED: 'bg-amber-50 text-amber-700 border-amber-200',
  DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CANCELLED: 'bg-slate-50 text-slate-600 border-slate-200',
};

export default function VendorOrdersScreen8() {
  const [filter, setFilter] = useState('Toutes');
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const filteredOrders =
    filter === 'Toutes'
      ? orders
      : orders.filter((order) => STATUS_LABELS[order.status] === filter);

  return (
    <div className="space-y-4 pb-20 bg-slate-50 min-h-screen">
      {/* Header Écran 8 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Gestion des commandes</h1>
        </Link>
      </header>

      {/* Onglets Pilules Filtres */}
      <div className="px-4 flex gap-2 overflow-x-auto scrollbar-none">
        {['Toutes', 'En cours', 'Livrées', 'Annulées'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full transition flex-shrink-0 ${
              filter === tab
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Liste des Commandes Écran 8 */}
      <div className="px-4 space-y-2.5">
        {filteredOrders.map((ord) => (
          <Link
            key={ord.id}
            href={`/vendeur/commandes/${ord.id}`}
            className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm flex items-center justify-between hover:border-emerald-200 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={ord.items[0]?.image ?? ''} alt={ord.id} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-slate-900">
                  #{ord.id}
                </h3>
                <span className="font-bold text-xs text-slate-900 block mt-0.5">
                  {formatFCFA(ord.total)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {new Date(ord.createdAt).toLocaleDateString('fr-FR')} • {ord.items.length} article{ord.items.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${STATUS_CLASSES[ord.status]}`}>
                {STATUS_LABELS[ord.status]}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" />
            </div>
          </Link>
        ))}
      </div>

      {/* Barre de Navigation Vendeur Adaptée (Mobile & Desktop) */}
      <VendorBottomNavigation activeTab="commandes" />
    </div>
  );
}
