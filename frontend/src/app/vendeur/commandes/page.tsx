'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Search,
  Filter,
  Eye,
  Truck,
  Phone,
  User,
  ExternalLink,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { getOrders, OrderStatus, StoredOrder } from '../../../services/order-flow';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';

const STATUS_LABELS: Record<OrderStatus, string> = {
  CONFIRMED: 'En cours',
  PREPARING: 'En préparation',
  SHIPPED: 'En livraison',
  DELIVERED: 'Livrées',
  CANCELLED: 'Annulées',
};

const STATUS_CLASSES: Record<OrderStatus, string> = {
  CONFIRMED: 'bg-amber-50 text-amber-700 border-amber-200',
  PREPARING: 'bg-amber-50 text-amber-700 border-amber-200',
  SHIPPED: 'bg-sky-50 text-sky-700 border-sky-200',
  DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CANCELLED: 'bg-slate-50 text-slate-600 border-slate-200',
};

export default function VendorOrdersPage() {
  const [filter, setFilter] = useState('Toutes');
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const list = getOrders();
    setOrders(list);
  }, []);

  const filteredOrders = orders
    .filter((order) => {
      if (filter === 'Toutes') return true;
      if (filter === 'En cours') {
        return (
          order.status === 'CONFIRMED' ||
          order.status === 'PREPARING' ||
          order.status === 'SHIPPED'
        );
      }
      return STATUS_LABELS[order.status] === filter;
    })
    .filter((order) => {
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.items.some((i) => i.title.toLowerCase().includes(q))
      );
    });

  const preparingCount = orders.filter(
    (o) => o.status === 'CONFIRMED' || o.status === 'PREPARING'
  ).length;

  return (
    <VendorPortalShell
      title="Gestion des Commandes"
      subtitle="Suivez la préparation des colis, organisez les expéditions coursier et validez les livraisons."
      breadcrumbs={[{ label: 'Commandes' }]}
      actionElement={
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1.5 rounded-full">
            {preparingCount} commande{preparingCount > 1 ? 's' : ''} à préparer
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* ================= 1. 4 CARTES KPI COMMANDES ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Total Commandes</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{orders.length}</div>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">Ce mois-ci</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">À Préparer / Expédier</span>
            <div className="text-2xl font-black text-amber-600 mt-2">{preparingCount}</div>
            <span className="text-[11px] text-amber-600 font-bold block mt-1">Priorité immédiate</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Livrées avec succès</span>
            <div className="text-2xl font-black text-emerald-600 mt-2">
              {orders.filter((o) => o.status === 'DELIVERED').length}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">100% sans litige</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Volume d'affaires</span>
            <div className="text-2xl font-black text-slate-900 mt-2">
              {formatFCFA(orders.reduce((acc, o) => acc + (o.total || 0), 0))}
            </div>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">Paiements Wave & OM</span>
          </div>
        </div>

        {/* ================= 2. RECHERCHE ET FILTRES ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par # commande, nom de client ou téléphone..."
                className="w-full bg-[#f4f5f7] focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-200/80 focus:border-amber-400 focus:outline-none transition"
              />
            </div>

            {/* Filtres par statut */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {['Toutes', 'En cours', 'Livrées', 'Annulées'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition flex-shrink-0 ${
                    filter === tab
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ================= 3. LISTE / TABLEAU DES COMMANDES ================= */}
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-800">Aucune commande trouvée</h3>
              <p className="text-xs text-slate-500">
                {searchTerm
                  ? 'Aucun résultat ne correspond à votre recherche.'
                  : 'Les nouvelles commandes apparaîtront ici dès que les clients commandent.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => {
                const statusClass =
                  STATUS_CLASSES[ord.status] || 'bg-slate-50 text-slate-700 border-slate-200';
                const statusText = STATUS_LABELS[ord.status] || ord.status;

                return (
                  <div
                    key={ord.id}
                    className="py-4 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 rounded-2xl transition"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center flex-shrink-0 font-black text-xs border border-amber-400/20">
                        MB
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-extrabold text-slate-900">
                            {ord.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusClass}`}
                          >
                            {statusText}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                            {ord.paymentOption === 'mobile_money'
                              ? 'Mobile Money (Wave / OM)'
                              : 'Paiement à la livraison (Cash)'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 font-bold truncate">
                          Client Malick Buss • <span className="text-slate-500 font-medium">+221 77 123 45 67</span>
                        </p>

                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {ord.items.map((i) => `${i.title} (x${i.quantity})`).join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-left sm:text-right">
                        <span className="text-sm font-black text-slate-900 block">
                          {formatFCFA(ord.total)}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Récemment'}
                        </span>
                      </div>

                      <Link
                        href={`/vendeur/commandes/${ord.id}`}
                        className="inline-flex items-center gap-1.5 bg-[#0c1527] hover:bg-amber-400 text-white hover:text-slate-950 font-bold text-xs py-2 px-3.5 rounded-full transition shadow-xs"
                      >
                        <span>Détails</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </VendorPortalShell>
  );
}
