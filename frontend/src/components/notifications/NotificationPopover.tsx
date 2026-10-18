'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Package,
  Flame,
  Store,
  CheckCircle2,
  X,
  Check,
  ArrowRight,
  Clock,
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  type: 'order' | 'promo' | 'shop' | 'payment';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'Commande expédiée',
    message: 'Votre commande #MB-2025-089 est en route avec notre livreur express à Dakar.',
    time: 'Il y a 10 min',
    unread: true,
    link: '/suivre-commande',
  },
  {
    id: 'notif-2',
    type: 'promo',
    title: 'Vente Flash Dakar 🔥',
    message: 'Jusqu’à -30% sur toute la collection prêt-à-porter chez Style & Mode aujourd’hui.',
    time: 'Il y a 2h',
    unread: true,
    link: '/boutiques/style-and-mode/produits',
  },
  {
    id: 'notif-3',
    type: 'payment',
    title: 'Paiement Wave validé',
    message: 'Votre transaction de 24 000 FCFA a été sécurisée avec succès.',
    time: 'Hier à 18h40',
    unread: false,
  },
  {
    id: 'notif-4',
    type: 'shop',
    title: 'Nouvelle Boutique Officielle 👑',
    message: 'Diallo Fashion vient d’ouvrir ses portes virtuelles sur Malick Buss.',
    time: 'Hier à 11h15',
    unread: false,
    link: '/boutiques',
  },
];

export function NotificationPopover({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Fermeture au clic extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-slate-200/90 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* En-tête Popover */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-600 flex items-center justify-center">
            <Bell className="w-4 h-4 stroke-[2.2px]" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-none">Notifications</h3>
            {unreadCount > 0 ? (
              <span className="text-[10px] font-bold text-amber-600 mt-0.5 block">
                {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 mt-0.5 block">Tout est à jour</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[10px] font-bold text-slate-600 hover:text-amber-600 transition hover:underline"
            >
              Tout marquer lu
            </button>
          )}
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 flex items-center justify-center transition"
            aria-label="Fermer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Liste des Notifications */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Aucune notification pour le moment.
          </div>
        ) : (
          notifications.map((notif) => {
            const getIcon = () => {
              switch (notif.type) {
                case 'order':
                  return <Package className="w-4 h-4 text-sky-500" />;
                case 'promo':
                  return <Flame className="w-4 h-4 text-rose-500" />;
                case 'payment':
                  return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
                case 'shop':
                  return <Store className="w-4 h-4 text-amber-500" />;
              }
            };

            const content = (
              <div
                className={`p-3.5 flex items-start gap-3 transition cursor-pointer hover:bg-slate-50 ${
                  notif.unread ? 'bg-amber-50/30' : 'bg-white'
                }`}
                onClick={() => {
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
                  );
                  if (notif.link) onClose();
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{notif.title}</h4>
                    {notif.unread && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">
                    {notif.message}
                  </p>
                  <span className="text-[9px] text-slate-400 font-medium flex items-center gap-1 mt-1.5">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{notif.time}</span>
                  </span>
                </div>
              </div>
            );

            return notif.link ? (
              <Link key={notif.id} href={notif.link} className="block">
                {content}
              </Link>
            ) : (
              <div key={notif.id}>{content}</div>
            );
          })
        )}
      </div>

      {/* Pied de Popover */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <Link
          href="/boutiques"
          onClick={onClose}
          className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 transition"
        >
          <span>Découvrir les offres du jour</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
