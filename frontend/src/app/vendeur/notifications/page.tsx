'use client';

import React, { useState, useEffect } from 'react';
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
  Trash2,
  Info,
  ExternalLink,
} from 'lucide-react';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';
import {
  getVendorNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  VendorNotification,
} from '../../../services/notificationStore';

export default function VendorNotificationsPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'ORDERS' | 'COMMISSIONS' | 'SUPPORT'>('ALL');
  const [notifications, setNotifications] = useState<VendorNotification[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const syncNotifs = () => setNotifications(getVendorNotifications());
    syncNotifs();
    window.addEventListener('malick_notifications_updated', syncNotifs);
    return () => window.removeEventListener('malick_notifications_updated', syncNotifs);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMarkAllRead = () => {
    const updated = markAllNotificationsAsRead();
    setNotifications(updated);
    showToast('✅ Toutes les notifications ont été marquées comme lues.');
  };

  const handleMarkOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = markNotificationAsRead(id);
    setNotifications(updated);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteNotification(id);
    setNotifications(updated);
    showToast('🗑️ Notification supprimée.');
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === 'ALL') return true;
    return n.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'ORDERS':
        return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      case 'COMMISSIONS':
        return <Wallet className="w-5 h-5 text-amber-600" />;
      case 'SUPPORT':
        return <MessageCircle className="w-5 h-5 text-sky-600" />;
      default:
        return <Info className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'ORDERS':
        return 'bg-emerald-50 border-emerald-100';
      case 'COMMISSIONS':
        return 'bg-amber-50 border-amber-100';
      case 'SUPPORT':
        return 'bg-sky-50 border-sky-100';
      default:
        return 'bg-indigo-50 border-indigo-100';
    }
  };

  return (
    <VendorPortalShell
      title="Centre de Notifications"
      subtitle="Restez informé en temps réel des commandes, encaissements Wave/OM et messages clients."
      breadcrumbs={[{ label: 'Notifications' }]}
      actionElement={
        unreadCount > 0 ? (
          <button
            onClick={handleMarkAllRead}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs active:scale-95"
          >
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5px]" />
            <span>Tout marquer comme lu</span>
          </button>
        ) : undefined
      }
    >
      <div className="space-y-6">
        {/* Toast Notif */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-[#071328] text-amber-400 font-bold px-4 py-3 rounded-2xl shadow-2xl border border-amber-400/40 text-xs flex items-center gap-2 animate-in slide-in-from-top">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ================= BARRE D'ONGLETS FILTRES ================= */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { key: 'ALL', label: 'Toutes les alertes', count: notifications.length },
              { key: 'ORDERS', label: 'Commandes', count: notifications.filter((n) => n.type === 'ORDERS').length },
              { key: 'COMMISSIONS', label: 'Finances & Wave', count: notifications.filter((n) => n.type === 'COMMISSIONS').length },
              { key: 'SUPPORT', label: 'Support & Clients', count: notifications.filter((n) => n.type === 'SUPPORT').length },
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                    isActive
                      ? 'bg-slate-900 text-amber-400 shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {unreadCount > 0 && (
            <span className="text-xs font-semibold text-slate-500">
              <strong className="text-rose-600 font-bold">{unreadCount}</strong> non lue{unreadCount > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* ================= LISTE DES NOTIFICATIONS ================= */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-3 shadow-2xs">
            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Bell className="w-6 h-6 stroke-[1.5px]" />
            </div>
            <h3 className="font-bold text-sm text-slate-800">Aucune notification dans cette rubrique</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Vous recevrez ici des alertes instantanées dès qu'une commande sera passée ou qu'un virement sera effectué.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden shadow-2xs">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                className={`p-4 sm:p-5 flex items-start gap-4 transition cursor-pointer hover:bg-slate-50/80 ${
                  !item.read ? 'bg-amber-50/30' : ''
                }`}
              >
                {/* Icône de type */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center border flex-shrink-0 mt-0.5 ${getIconBg(
                    item.type
                  )}`}
                >
                  {getIcon(item.type)}
                </div>

                {/* Corps de la notification */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs sm:text-sm font-bold text-slate-900 truncate ${
                        !item.read ? 'font-black' : ''
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.subtitle}</p>

                  <div className="pt-1 flex items-center gap-3">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 hover:underline"
                    >
                      <span>Voir les détails</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>

                    {!item.read && (
                      <button
                        onClick={(e) => handleMarkOne(item.id, e)}
                        className="text-[11px] font-semibold text-slate-400 hover:text-emerald-600 transition"
                      >
                        Marquer comme lu
                      </button>
                    )}
                  </div>
                </div>

                {/* Actions à droite */}
                <div className="flex items-center gap-1 self-center pl-2">
                  {!item.read && (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs mr-2" />
                  )}
                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    title="Supprimer la notification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </VendorPortalShell>
  );
}
