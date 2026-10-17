'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';

interface TimelineStep {
  id: number;
  title: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export default function OrderTrackingPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || 'MB-2025-00123';

  // Liste des étapes exactement conforme à la maquette
  const steps: TimelineStep[] = [
    {
      id: 1,
      title: 'Commande confirmée',
      timestamp: '12 avr. 2025 • 14:35',
      completed: true,
    },
    {
      id: 2,
      title: 'En préparation',
      timestamp: '12 avr. 2025 • 16:20',
      completed: true,
    },
    {
      id: 3,
      title: 'Expédiée',
      timestamp: '13 avr. 2025 • 09:10',
      completed: true,
    },
    {
      id: 4,
      title: 'En livraison',
      timestamp: '13 avr. 2025 • 14:00',
      completed: false,
      current: true,
    },
    {
      id: 5,
      title: 'Livrée',
      timestamp: 'En attente',
      completed: false,
    },
  ];

  const orderItem = {
    title: 'Veste en jean vintage',
    price: 12000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80',
    shop: 'Style & Mode Dakar',
    courier: {
      name: 'Moussa Diop',
      phone: '+221 77 123 45 67',
      vehicle: 'Moto Express Dakar',
    },
    address: 'Avenue Léopold Sédar Senghor, Dakar Plateau',
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-20">
      {/* Conteneur principal adapté Mobile & Desktop */}
      <div className="max-w-xl mx-auto px-4 py-4 space-y-5">
        
        {/* Entête conforme maquette : Flèche retour + Titre centré */}
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

        {/* 1. Carte Entête Commande (Identique à la maquette) */}
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
              Commande #{orderId}
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Passée le 12 avr. 2025 • 14:32
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-700">
                Arrivée estimée : Aujourd'hui à 14h00
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
                  {orderItem.title}
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
                    Livreur assigné
                  </span>
                </div>
                <p className="text-xs font-black text-slate-900">{orderItem.courier.name}</p>
                <p className="text-[11px] text-slate-500">{orderItem.courier.vehicle}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Adresse de livraison
                  </span>
                </div>
                <p className="text-xs font-black text-slate-900 truncate">
                  {orderItem.address}
                </p>
                <p className="text-[11px] text-emerald-600 font-bold">Paiement Wave validé</p>
              </div>
            </div>

            {/* Boutons d'action direct avec le livreur / support */}
            <div className="pt-1 flex gap-2">
              <a
                href={`https://wa.me/221771234567?text=${encodeURIComponent(
                  `Bonjour Moussa, je suis le client de la commande #${orderId} (${orderItem.title}). Pouvez-vous me confirmer votre heure d'arrivée ?`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp livreur</span>
              </a>

              <a
                href="tel:+221771234567"
                className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4" />
                <span>Appeler</span>
              </a>
            </div>
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
    </div>
  );
}
