'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  DollarSign,
  Wallet,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  Bell,
  Check,
  Clock,
  Sparkles,
} from 'lucide-react';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';

export default function VendorNotificationsPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'ORDERS' | 'COMMISSIONS' | 'SUPPORT'>('ALL');
  const [markedAllRead, setMarkedAllRead] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'ORDERS',
      title: 'Nouvelle commande à préparer',
      subtitle: 'Commande #MB-2025-00124 (Awa Diop) • Ensemble Boubou Soie • 28 500 FCFA',
      time: 'Il y a 10 min',
      icon: ShoppingBag,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      href: '/vendeur/commandes',
      read: false,
    },
    {
      id: 2,
      type: 'COMMISSIONS',
      title: 'Virement Wave reçu avec succès',
      subtitle: 'Votre retrait de 25 000 FCFA vers Wave (+221 77 123 45 67) a été validé.',
      time: 'Il y a 1 h',
      icon: Wallet,
      iconBg: 'bg-sky-50 text-sky-600 border border-sky-100',
      href: '/vendeur/retraits',
      read: false,
    },
    {
      id: 3,
      type: 'COMMISSIONS',
      title: 'Commission validée sur vente #MB-00120',
      subtitle: 'Crédit net de 12 500 FCFA ajouté à votre solde disponible.',
      time: 'Il y a 3 h',
      icon: DollarSign,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      href: '/vendeur/retraits',
      read: true,
    },
    {
      id: 4,
      type: 'SUPPORT',
      title: 'Nouveau message client (Fatou Ndiaye)',
      subtitle: '« Bonjour, la livraison à Point E est-elle possible avant 17h ? »',
      time: 'Il y a 5 h',
      icon: MessageCircle,
      iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
      href: '/vendeur/support',
      read: true,
    },
    {
      id: 5,
      type: 'ORDERS',
      title: 'Commande livrée & terminée',
      subtitle: 'La commande #MB-2025-00122 a été remise au client Moussa Fall.',
      time: 'Hier',
      icon: CheckCircle2,
      iconBg: 'bg-slate-100 text-slate-700 border border-slate-200',
      href: '/vendeur/commandes',
      read: true,
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setMarkedAllRead(true);
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === 'ALL') return true;
    return n.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <VendorPortalShell
      title="Centre de Notifications"
      subtitle="Restez informé en temps réel des commandes, encaissements Wave/OM et messages clients."
      breadcrumbs={[{ label: 'Notifications' }]}
      actionElement={
        unreadCount > 0 ? (
          <button
            onClick={handleMarkAllRead}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
          >
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tout marquer comme lu</span>
          </button>
        ) : undefined
      }
    >
      <div className="space-y-5">
        {/* Filtres Pilules & Compteur */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition flex items-center gap-1.5 ${
                activeTab === 'ALL'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span>Toutes</span>
              <span className="bg-slate-950/10 text-inherit text-[10px] px-1.5 py-0.2 rounded-full">
                {notifications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ORDERS')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition ${
                activeTab === 'ORDERS'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Commandes & Livraisons
            </button>

            <button
              onClick={() => setActiveTab('COMMISSIONS')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition ${
                activeTab === 'COMMISSIONS'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Retraits & Finances
            </button>

            <button
              onClick={() => setActiveTab('SUPPORT')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition ${
                activeTab === 'SUPPORT'
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Messages Clients
            </button>
          </div>

          {unreadCount > 0 && (
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full self-start sm:self-auto">
              {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Liste des Notifications */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">Aucune notification pour cette catégorie</p>
              <p className="text-xs text-slate-500">Toutes vos alertes s'afficheront ici en direct.</p>
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition ${
                    !item.read ? 'bg-amber-50/20' : ''
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2px]" />
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {item.title}
                        </h3>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">{item.subtitle}</p>
                      <span className="text-[10px] text-slate-400 block sm:hidden font-medium">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium">
                      {item.time}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </VendorPortalShell>
  );
}
