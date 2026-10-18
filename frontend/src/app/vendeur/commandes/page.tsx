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
  X,
  MessageCircle,
  CreditCard,
  MapPin,
  PackageCheck,
  Check,
  RotateCcw,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { getOrders, OrderStatus, StoredOrder, updateOrderStatus } from '../../../services/order-flow';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';

const STATUS_LABELS: Record<OrderStatus, string> = {
  CONFIRMED: 'En cours',
  PREPARING: 'En préparation',
  SHIPPED: 'Expédiée',
  DELIVERED: 'Livrée avec succès',
  CANCELLED: 'Annulée',
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
  const [selectedOrder, setSelectedOrder] = useState<StoredOrder | null>(null);

  const loadOrders = () => {
    let list = getOrders();
    if (list.length === 0 && typeof window !== 'undefined') {
      const defaultOrders: StoredOrder[] = [
        {
          id: 'MB-2026-e12bb490',
          createdAt: new Date().toISOString(),
          status: 'CONFIRMED',
          deliveryOption: 'standard',
          paymentOption: 'cod',
          paymentStatus: 'PENDING',
          items: [
            {
              id: 'item-1',
              title: 'Robe Brodée Cérémonie Dakar Chic',
              price: 28500,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80',
              shop: 'Style & Mode',
            },
          ],
          subtotal: 28500,
          shipping: 3000,
          total: 31500,
        },
        {
          id: 'MB-2026-560131d7',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          status: 'CONFIRMED',
          deliveryOption: 'express',
          paymentOption: 'mobile_money',
          paymentStatus: 'PENDING',
          items: [
            {
              id: 'item-2',
              title: 'Ensemble Boubou Bazin Getzner Riche Brodé',
              price: 32000,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&q=80',
              shop: 'Style & Mode',
            },
          ],
          subtotal: 32000,
          shipping: 5000,
          total: 37000,
        },
      ];
      localStorage.setItem('malick-buss-orders', JSON.stringify(defaultOrders));
      list = defaultOrders;
    }
    setOrders(list);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = (orderId: string, nextStatus: OrderStatus) => {
    updateOrderStatus(orderId, nextStatus);
    const updated = getOrders();
    setOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(updated.find((o) => o.id === orderId) || null);
    }
  };

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
      if (filter === 'Livrées') return order.status === 'DELIVERED';
      if (filter === 'Annulées') return order.status === 'CANCELLED';
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

  const deliveredCount = orders.filter((o) => o.status === 'DELIVERED').length;
  const totalVolume = orders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.total : 0), 0);

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
            <div className="text-2xl font-black text-emerald-600 mt-2">{deliveredCount}</div>
            <span className="text-[11px] text-emerald-600 font-bold block mt-1">100% sans litige</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Volume d&apos;affaires</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{formatFCFA(totalVolume)}</div>
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

          {/* ================= 3. LISTE DES COMMANDES ================= */}
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
                          {ord.createdAt
                            ? new Date(ord.createdAt).toLocaleDateString('fr-FR', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'Récemment'}
                        </span>
                      </div>

                      {/* Bouton Détails qui ouvre la modale interactive */}
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(ord)}
                        className="inline-flex items-center gap-1.5 bg-[#0c1527] hover:bg-amber-400 text-white hover:text-slate-950 font-bold text-xs py-2 px-3.5 rounded-full transition shadow-xs cursor-pointer active:scale-95"
                      >
                        <span>Détails</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ================= MODALE DÉTAILS DE COMMANDE & CRUD STATUT ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            {/* Header Modale */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Commande
                </span>
                <h3 className="font-mono font-black text-base text-slate-900">
                  {selectedOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Statut actuel + Badge */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-semibold text-slate-600">Statut actuel :</span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  STATUS_CLASSES[selectedOrder.status]
                }`}
              >
                {STATUS_LABELS[selectedOrder.status]}
              </span>
            </div>

            {/* Coordonnées Client */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Destinataire
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">Client Malick Buss</h4>
                  <p className="text-slate-500 font-medium">+221 77 123 45 67</p>
                  <p className="text-slate-500 font-medium">Dakar Plateau, Sénégal</p>
                </div>
                <a
                  href="https://wa.me/221771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Articles commandés */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-700 block">
                Articles dans le colis :
              </span>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-bold text-slate-900 truncate">{item.title}</h5>
                        <span className="text-slate-400 text-[11px]">Qté : {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-black text-slate-900 shrink-0">
                      {formatFCFA(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Récapitulatif financier */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Sous-total articles :</span>
                <span className="font-semibold text-slate-900">{formatFCFA(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Livraison ({selectedOrder.deliveryOption === 'express' ? 'Express' : 'Standard'}) :</span>
                <span className="font-semibold text-slate-900">{formatFCFA(selectedOrder.shipping)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-sm font-black text-slate-900">
                <span>Total perçu :</span>
                <span className="text-amber-600">{formatFCFA(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Actions de changement de statut */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-700 block">
                Faire progresser le statut :
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {selectedOrder.status === 'CONFIRMED' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'PREPARING')}
                    className="py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <PackageCheck className="w-4 h-4" />
                    <span>En préparation</span>
                  </button>
                )}

                {(selectedOrder.status === 'CONFIRMED' || selectedOrder.status === 'PREPARING') && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'SHIPPED')}
                    className="py-2.5 px-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Expédier colis</span>
                  </button>
                )}

                {selectedOrder.status === 'SHIPPED' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'DELIVERED')}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-1.5 transition col-span-2"
                  >
                    <Check className="w-4 h-4 stroke-[3px]" />
                    <span>Valider livraison client</span>
                  </button>
                )}

                {selectedOrder.status !== 'CANCELLED' && selectedOrder.status !== 'DELIVERED' && (
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'CANCELLED')}
                    className="py-2.5 px-3 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Annuler</span>
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </VendorPortalShell>
  );
}
