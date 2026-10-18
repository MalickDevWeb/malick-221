'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Shield,
  Bell,
  LogOut,
  Store,
  Wallet,
  ChevronRight,
  Home,
  Package,
  ShoppingBag,
  Award,
  CheckCircle2,
  X,
} from 'lucide-react';
import { VendorBottomNavigation } from '../../../components/layout/VendorBottomNavigation';

export default function VendorProfileScreen17() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'info',
      title: 'Mes informations',
      icon: User,
      action: () => setActiveModal('info'),
    },
    {
      id: 'security',
      title: 'Sécurité',
      icon: Shield,
      action: () => setActiveModal('security'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      href: '/vendeur/notifications',
    },
    {
      id: 'logout',
      title: 'Déconnexion',
      icon: LogOut,
      href: '/vendeur/connexion',
      danger: true,
    },
  ];

  return (
    <div className="space-y-4 pb-20 bg-slate-50 min-h-screen">
      {/* Header Écran 17 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/vendeur/dashboard" className="text-slate-800">
            <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          </Link>
          <h1 className="font-bold text-base text-slate-900">Profil du vendeur</h1>
        </div>
      </header>

      {/* Profil Header Card */}
      <div className="px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200 border-2 border-amber-400 flex-shrink-0">
            <img
              src="/images/mockup/vendor_man_clean.jpg"
              alt="Malick Diop"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-slate-900">Malick Diop</h2>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <span>Vendeur</span>
              <span>•</span>
              <span className="inline-flex items-center gap-0.5 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                <Award className="w-3 h-3 text-amber-600" />
                Niveau : Bronze
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 2 Cartes Résumé Métriques */}
      <div className="px-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Store className="w-4 h-4" />
            <span className="text-[11px] font-medium text-slate-500">Mes boutiques</span>
          </div>
          <div className="text-base font-bold text-slate-900">1 boutique</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Wallet className="w-4 h-4" />
            <span className="text-[11px] font-medium text-slate-500">Mon solde</span>
          </div>
          <div className="text-base font-bold text-emerald-600">28 750 FCFA</div>
        </div>
      </div>

      {/* Menu Options Profil */}
      <div className="px-4">
        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-sm overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      item.danger
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2px]" />
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      item.danger ? 'text-rose-600' : 'text-slate-800'
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            );

            return item.href ? (
              <Link key={item.id} href={item.href} className="block">
                {content}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left"
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal Informations Personnelles */}
      {activeModal === 'info' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Mes Informations Vendeur</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Nom complet</span>
                <span className="font-semibold text-slate-900">Malick Diop</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Téléphone</span>
                <span className="font-semibold text-slate-900">+221 77 123 45 67 (Wave & Orange Money)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                <span className="font-semibold text-slate-900">malick.diop@malickbuss.sn</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Boutique gérée</span>
                <span className="font-semibold text-slate-900">Style & Mode (Dakar, Plateau)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barre de Navigation Vendeur Adaptée (Mobile & Desktop) */}
      <VendorBottomNavigation activeTab="profil" />
    </div>
  );
}

