'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Briefcase,
  Check,
  Clock,
  Truck,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Package,
  CheckCircle2,
  Star,
  X,
  ThumbsUp,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { getOrder, getOrders, confirmOrderReceipt, StoredOrder } from '../../../services/order-flow';
import { resolveShopContact } from '../../../services/vendorProfileStore';

interface TimelineStep {
  id: number;
  title: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

const DEMO_FALLBACK_ORDER: StoredOrder = {
  id: 'CMD-2026-7842',
  createdAt: new Date().toISOString(),
  status: 'SHIPPED',
  paymentOption: 'cod',
  deliveryOption: 'express',
  paymentStatus: 'PENDING',
  subtotal: 30000,
  shipping: 2000,
  total: 32000,
  items: [
    {
      id: 'style-and-mode-p1',
      title: 'Ensemble Boubou Bazin Getzner Riche Brodé',
      price: 32000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
      shop: 'Style & Mode',
    },
  ],
};

function OrderTrackingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchOrderId, setSearchOrderId] = useState(searchParams.get('id') || '');
  const [order, setOrder] = useState<StoredOrder>(DEMO_FALLBACK_ORDER);

  // Client reception confirmation states
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedbackNote, setFeedbackNote] = useState('Colis bien reçu en main propre, articles conformes et en excellent état.');
  const [receptionConfirmedSuccess, setReceptionConfirmedSuccess] = useState(false);

  const handleConfirmReceipt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const updated = confirmOrderReceipt(order.id, rating, feedbackNote);
    if (updated) {
      setOrder(updated);
    }
    setShowReceiveModal(false);
    setReceptionConfirmedSuccess(true);
  };

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      const found = getOrder(idFromUrl);
      if (found) {
        setOrder(found);
        setSearchOrderId(idFromUrl);
        return;
      }
    }

    const allOrders = getOrders();
    if (allOrders && allOrders.length > 0) {
      setOrder(allOrders[0]);
      setSearchOrderId(allOrders[0].id);
    } else {
      setOrder(DEMO_FALLBACK_ORDER);
      setSearchOrderId(DEMO_FALLBACK_ORDER.id);
    }
  }, [searchParams]);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) return;
    const found = getOrder(searchOrderId.trim());
    if (found) {
      setOrder(found);
    } else {
      const allOrders = getOrders();
      const match = allOrders.find((o: StoredOrder) =>
        o.id.toLowerCase().includes(searchOrderId.trim().toLowerCase())
      );
      if (match) {
        setOrder(match);
      }
    }
  };

  const steps: TimelineStep[] = [
    {
      id: 1,
      title: 'Commande confirmée',
      timestamp: new Date(order.createdAt).toLocaleString('fr-FR'),
      completed: true,
    },
    {
      id: 2,
      title: order.status === 'CANCELLED' ? 'Commande annulée' : 'En préparation à Dakar',
      timestamp:
        order.status === 'CONFIRMED'
          ? 'En attente du vendeur'
          : order.status === 'PREPARING'
          ? 'En cours'
          : order.status === 'CANCELLED'
          ? 'Annulée'
          : 'Terminé',
      completed: ['SHIPPED', 'DELIVERED'].includes(order.status),
      current: order.status === 'CONFIRMED' || order.status === 'PREPARING',
    },
    {
      id: 3,
      title: 'En cours de livraison express',
      timestamp:
        order.status === 'SHIPPED'
          ? 'Coursier en route'
          : order.status === 'DELIVERED'
          ? 'Étape terminée'
          : 'En attente',
      completed: order.status === 'DELIVERED',
      current: order.status === 'SHIPPED',
    },
    {
      id: 4,
      title: 'Colis remis en main propre',
      timestamp: order.status === 'DELIVERED' ? 'Livré avec succès' : 'En attente',
      completed: order.status === 'DELIVERED',
    },
  ];

  const orderItem = order.items && order.items.length > 0 ? order.items[0] : DEMO_FALLBACK_ORDER.items[0];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* Conteneur principal adapté Mobile & Desktop */}
      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        {/* Entête : Flèche retour + Titre centré */}
        <header className="relative flex items-center justify-between pt-1 pb-2">
          <Link
            href="/commandes"
            className="w-9 h-9 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-800 hover:bg-slate-50 transition active:scale-95"
            aria-label="Retour aux commandes"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5px] -ml-0.5" />
          </Link>

          <h1 className="absolute left-1/2 -translate-x-1/2 font-black text-base md:text-lg text-slate-900 tracking-tight">
            Suivre ma commande
          </h1>

          <Link
            href="/profil"
            className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full hover:bg-emerald-100 transition"
          >
            Aide
          </Link>
        </header>

        {/* Barre de recherche d'une commande par identifiant */}
        <form
          onSubmit={handleSearchOrder}
          className="relative flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-1.5"
        >
          <Package className="w-4 h-4 ml-3 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            placeholder="Numéro de commande (ex: CMD-2026-7842)..."
            className="w-full text-xs font-semibold px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold px-4 py-2 rounded-xl transition shadow-2xs shrink-0"
          >
            Suivre
          </button>
        </form>

        {/* 1. Carte Entête Commande */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-slate-100 p-4 md:p-5 shadow-2xs flex items-center gap-4"
        >
          {/* Badge Icône Vert Émeraude avec sacoche / paquet */}
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-600/20">
            <Briefcase className="w-7 h-7 stroke-[2.2px]" />
          </div>

          {/* Numéro et date de passage */}
          <div className="flex-1 min-w-0">
            <h2 className="font-black text-sm md:text-base text-slate-900 truncate tracking-tight">
              Commande #{order.id}
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Passée le {new Date(order.createdAt).toLocaleString('fr-FR')}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-700">
                {order.deliveryOption === 'express' ? 'Livraison express 24h' : 'Livraison standard'} • Suivi en direct
              </span>
            </div>
          </div>
        </motion.div>

        {/* 2. Timeline Verticale (Stepper reproduisant fidèlement la maquette) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-2xs space-y-1"
        >
          <div className="relative pl-1">
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1;
              const nextStep = !isLast ? steps[idx + 1] : null;
              const isLineCompleted = step.completed && nextStep?.completed;

              return (
                <div key={step.id} className="relative flex items-start gap-4 pb-7 last:pb-1 group">
                  {/* Ligne verticale de connexion */}
                  {!isLast && (
                    <span
                      className={`absolute left-[13px] top-[26px] bottom-0 w-[2.5px] -translate-x-1/2 transition-colors ${
                        isLineCompleted ? 'bg-emerald-600' : 'bg-slate-200'
                      }`}
                    />
                  )}

                  {/* Cercle d'état (Icon node) */}
                  <div className="relative z-10 flex-shrink-0">
                    {step.completed ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs shadow-emerald-600/30">
                        <Check className="w-4 h-4 stroke-[3px]" />
                      </div>
                    ) : step.current ? (
                      <div className="w-7 h-7 rounded-full border-2 border-emerald-500 bg-white text-emerald-600 flex items-center justify-center shadow-xs">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full border-2 border-slate-200 bg-white text-slate-300 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      </div>
                    )}
                  </div>

                  {/* Détail du statut */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3
                      className={`font-black text-xs md:text-sm tracking-tight ${
                        step.completed
                          ? 'text-emerald-700'
                          : step.current
                          ? 'text-emerald-700 font-extrabold'
                          : 'text-slate-500 font-bold'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-[11px] mt-0.5 ${
                        step.current
                          ? 'text-emerald-600 font-medium'
                          : 'text-slate-400 font-normal'
                      }`}
                    >
                      {step.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>


        {/* 2.5. Bloc de Confirmation de Réception Client (Validation) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="space-y-2"
        >
          {order.status !== 'DELIVERED' ? (
            <div className="bg-gradient-to-br from-slate-900 to-[#071328] border-2 border-emerald-500/40 rounded-3xl p-5 text-white shadow-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.2px]" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">Validation de réception par le client</h3>
                  <p className="text-[11px] text-emerald-300 font-semibold">Le colis vous a-t-il été remis par le livreur ?</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Dès que vous avez votre colis entre les mains, confirmez la bonne réception ici. Cette validation sécurisée permet de débloquer le paiement pour le commerçant.
              </p>

              <button
                type="button"
                onClick={() => setShowReceiveModal(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-black text-xs py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition"
              >
                <Check className="w-4 h-4 stroke-[3px]" />
                <span>J&apos;ai bien reçu ma commande ✓</span>
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-3xl p-4 md:p-5 flex items-center gap-3.5 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Check className="w-6 h-6 stroke-[3px]" />
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-black text-emerald-950 text-sm">Réception validée par le client 🎉</p>
                <p className="text-emerald-700 font-medium">
                  {order.confirmedReceivedAt
                    ? `Confirmée reçue le ${new Date(order.confirmedReceivedAt).toLocaleString('fr-FR')}`
                    : 'Colis remis en main propre et réception confirmée avec succès.'}
                </p>
                {order.receivedFeedback && (
                  <p className="text-[11px] text-slate-600 italic mt-1">
                    &quot;{order.receivedFeedback}&quot; {order.receivedRating ? `• Note : ${'⭐'.repeat(order.receivedRating)}` : ''}
                  </p>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* 3. Section Détails de la commande (Maquette) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 pt-1"
        >
          <h2 className="font-black text-sm md:text-base text-slate-900 tracking-tight px-1">
            Détails de la commande
          </h2>

          <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-2xs space-y-4">
            {/* Ligne produit conforme : Image, Titre, Prix FCFA x1 */}
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/60 shadow-inner">
                <img
                  src={orderItem.image}
                  alt={orderItem.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-xs md:text-sm text-slate-900 truncate">
                  {orderItem.title}{order.items.length > 1 ? ` et ${order.items.length - 1} autre${order.items.length > 2 ? 's' : ''} article${order.items.length > 2 ? 's' : ''}` : ''}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="font-black text-xs md:text-sm text-slate-900">
                    {formatFCFA(orderItem.price)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    x{orderItem.quantity}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Vendu par <span className="font-semibold text-slate-600">{orderItem.shop}</span>
                </p>
              </div>
            </div>

            {/* Information Livreur & Contact express */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-slate-500">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Livraison
                  </span>
                </div>
                <p className="text-xs font-black text-slate-900">En attente d’attribution</p>
                <p className="text-[11px] text-slate-500">{order.deliveryOption === 'express' ? 'Express' : 'Standard'}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Adresse de livraison
                  </span>
                </div>
                <p className="text-xs font-black text-slate-900 truncate">
                  Dakar, Médina / Sandaga
                </p>
                <p className="text-[11px] text-emerald-600 font-bold">
                  {order.paymentOption === 'cod' ? 'Paiement à la livraison' : 'Paiement Mobile Money en attente'}
                </p>
              </div>
            </div>

            {/* Boutons d'action direct avec la boutique vendeuse */}
            {(() => {
              const shopContact = resolveShopContact(orderItem.shop);
              return (
                <div className="pt-1 flex gap-2">
                  <a
                    href={`https://wa.me/${shopContact.phone}?text=${encodeURIComponent(
                      `Bonjour ${shopContact.name}, je souhaite des nouvelles de ma commande #${order.id} passée sur votre boutique Malick Buss.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Boutique ({shopContact.name})</span>
                  </a>

                  <a
                    href={`tel:+${shopContact.phone}`}
                    className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Appeler</span>
                  </a>
                </div>
              );
            })()}
          </div>
        </motion.div>

        {/* Assistance & Liens rapides */}
        <div className="text-center pt-2">
          <Link
            href="/commandes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
          >
            <span>Voir toutes mes commandes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Modal interactif de confirmation de réception */}
      {showReceiveModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 text-slate-900 relative">
            <button
              type="button"
              onClick={() => setShowReceiveModal(false)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                🎁
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Confirmer la réception
              </h3>
              <p className="text-xs text-slate-500">
                Commande #{order.id}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 text-center">
                  Votre note sur la livraison :
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200 fill-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Commentaire / Avis pour le livreur et le vendeur :
                </label>
                <textarea
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  rows={3}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 resize-none"
                  placeholder="Ex: Colis reçu en bon état, livreur rapide..."
                />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleConfirmReceipt}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[3px]" />
                <span>Valider définitivement la réception</span>
              </button>

              <button
                type="button"
                onClick={() => setShowReceiveModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={null}>
      <OrderTrackingContent />
    </Suspense>
  );
}
