'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  MapPin,
  CreditCard,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { formatFCFA } from '../../../../services/api';
import { getOrder, OrderStatus, StoredOrder } from '../../../../services/order-flow';

const STATUS_LABELS: Record<OrderStatus, string> = {
  CONFIRMED: 'Confirmée',
  PREPARING: 'En préparation',
  SHIPPED: 'Expédiée',
  DELIVERED: 'Livrée',
  CANCELLED: 'Annulée',
};

const STATUS_CLASSES: Record<OrderStatus, string> = {
  CONFIRMED: 'bg-amber-50 text-amber-700 border-amber-200',
  PREPARING: 'bg-amber-50 text-amber-700 border-amber-200',
  SHIPPED: 'bg-amber-50 text-amber-700 border-amber-200',
  DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CANCELLED: 'bg-slate-50 text-slate-600 border-slate-200',
};

export default function VendorOrderDetailScreen9({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const orderId = params.id;
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    const foundOrder = getOrder(orderId);
    if (!foundOrder) {
      router.replace('/vendeur/commandes');
      return;
    }
    setOrder(foundOrder);
  }, [orderId, router]);

  if (!order) return null;

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 9 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/commandes" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Détails de la commande</h1>
        </Link>
      </header>

      <div className="px-4 space-y-4">
        {/* N° Commande & Statut */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Commande N°
            </span>
            <h2 className="font-black text-sm text-slate-900">
              #{orderId}
            </h2>
          </div>
          <span className={`${STATUS_CLASSES[order.status]} text-xs font-bold px-3 py-1 rounded-full border`}>
            {STATUS_LABELS[order.status]}
          </span>
        </div>

        {/* Client */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Client"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Client</span>
              <h3 className="font-bold text-xs text-slate-900">Awa Diop</h3>
              <span className="text-[11px] text-slate-500 block">+221 77 123 45 67</span>
            </div>
          </div>
          <a
            href="tel:+221771234567"
            className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Produits (2) */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
          <span className="text-xs font-bold text-slate-900 block">
            Produits ({order.items.length})
          </span>

          <div className="divide-y divide-slate-100 space-y-2">
            {order.items.map((item) => (
            <div key={item.id} className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{item.title} ×{item.quantity}</h4>
                  <span className="text-[10px] text-slate-400">{item.shop}</span>
                </div>
              </div>
              <span className="font-extrabold text-xs text-slate-900">{formatFCFA(item.price * item.quantity)}</span>
            </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-black">
            <span>Total</span>
            <span className="text-emerald-600 text-sm">{formatFCFA(order.total)}</span>
          </div>
        </div>

        {/* Détails Paiement & Adresse */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-slate-400" /> Mode de paiement
            </span>
            <span className="font-bold text-slate-900">
              {order.paymentOption === 'cod' ? 'Paiement à la livraison' : 'Mobile Money'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> Adresse de livraison
            </span>
            <span className="font-semibold text-slate-900">Dakar, Sénégal</span>
          </div>
        </div>

        {/* Stepper d'avancement vertical */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
          <span className="text-xs font-bold text-slate-900 block">
            Statut de préparation
          </span>

          <div className="space-y-3 pl-2 border-l-2 border-emerald-500 ml-2">
            <div className="relative pl-4">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute -left-[21px] top-1" />
              <h5 className="font-bold text-xs text-slate-900">Commande passée</h5>
              <span className="text-[10px] text-slate-400">{new Date(order.createdAt).toLocaleString('fr-FR')}</span>
            </div>

            <div className="relative pl-4">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute -left-[21px] top-1 animate-pulse" />
              <h5 className="font-bold text-xs text-slate-900">En préparation</h5>
              <span className="text-[10px] text-amber-600 font-semibold">{STATUS_LABELS[order.status]}</span>
            </div>

            <div className="relative pl-4 opacity-50">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 absolute -left-[21px] top-1" />
              <h5 className="font-medium text-xs text-slate-600">Livraison en cours</h5>
            </div>
          </div>
        </div>

        {/* 2 Boutons en bas */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <a
            href="https://wa.me/221771234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Contacter le client</span>
          </a>

          <Link
            href="/vendeur/livraisons"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition text-center"
          >
            <span>Suivre la livraison</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
