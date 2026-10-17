'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  HelpCircle,
  Headphones,
  Video,
  AlertTriangle,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  Home,
  Package,
  ShoppingBag,
  Store,
  User,
  X,
  CheckCircle2,
} from 'lucide-react';

export default function VendorSupportScreen16() {
  const [contactModal, setContactModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'faq',
      title: 'FAQ',
      subtitle: 'Trouvez des réponses à vos questions',
      icon: HelpCircle,
      iconColor: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'contact',
      title: 'Contacter le support',
      subtitle: 'Chat, email ou appel',
      icon: Headphones,
      iconColor: 'bg-amber-50 text-amber-600',
      action: () => setContactModal(true),
    },
    {
      id: 'tutorials',
      title: 'Tutoriels',
      subtitle: 'Vidéos et guides',
      icon: Video,
      iconColor: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'report',
      title: 'Signaler un problème',
      subtitle: 'Aide en cas de bug ou litige',
      icon: AlertTriangle,
      iconColor: 'bg-rose-50 text-rose-600',
      action: () => setSelectedIssue('bug'),
    },
  ];

  return (
    <div className="space-y-4 pb-20 bg-slate-50 min-h-screen">
      {/* Header Écran 16 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/vendeur/dashboard" className="text-slate-800">
            <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          </Link>
          <h1 className="font-bold text-base text-slate-900">Support / Assistance</h1>
        </div>
      </header>

      {/* Liste des sections de support */}
      <div className="px-4 space-y-3">
        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-sm overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action || (() => setContactModal(true))}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50/70 transition text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.iconColor}`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2px]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Bouton Principal Nous Contacter */}
        <div className="pt-2">
          <button
            onClick={() => setContactModal(true)}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl transition shadow-sm text-sm"
          >
            Nous contacter
          </button>
        </div>
      </div>

      {/* Modal Contact Rapide Support Malick Buss */}
      {contactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Support Équipe Malick Buss</h3>
              <button
                onClick={() => setContactModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Notre équipe d’assistance pour boutiquiers est disponible 7j/7 de 8h à 21h (GMT Dakar).
            </p>

            <div className="space-y-2">
              <a
                href="https://wa.me/221771234567"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 hover:bg-emerald-100 transition"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">WhatsApp Direct</h4>
                  <p className="text-[10px] text-emerald-700">+221 77 123 45 67 • Réponse en ~2 min</p>
                </div>
              </a>

              <a
                href="tel:+221771234567"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 text-slate-800 hover:bg-slate-100 transition"
              >
                <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Appel Téléphonique</h4>
                  <p className="text-[10px] text-slate-500">+221 77 123 45 67 (Gratuit)</p>
                </div>
              </a>

              <a
                href="mailto:support@malickbuss.sn"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 text-slate-800 hover:bg-slate-100 transition"
              >
                <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Email Support Vendeurs</h4>
                  <p className="text-[10px] text-slate-500">support@malickbuss.sn</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Barre de navigation Boutiquier */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 py-2 px-3 flex justify-around items-center max-w-md mx-auto shadow-[0_-4px_20px_rgba(0,0,0,0.04)] text-[10px]">
        <Link href="/vendeur/dashboard" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Home className="w-5 h-5 stroke-[1.8px]" />
          <span>Accueil</span>
        </Link>
        <Link href="/vendeur/produits" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Package className="w-5 h-5 stroke-[1.8px]" />
          <span>Produits</span>
        </Link>
        <Link href="/vendeur/commandes" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <ShoppingBag className="w-5 h-5 stroke-[1.8px]" />
          <span>Commandes</span>
        </Link>
        <Link href="/vendeur/boutique" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <Store className="w-5 h-5 stroke-[1.8px]" />
          <span>Boutique</span>
        </Link>
        <Link href="/vendeur/profil" className="flex flex-col items-center text-slate-400 hover:text-slate-600 font-medium gap-1">
          <User className="w-5 h-5 stroke-[1.8px]" />
          <span>Profil</span>
        </Link>
      </nav>
    </div>
  );
}
