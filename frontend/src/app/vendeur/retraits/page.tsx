'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Smartphone,
  CheckCircle2,
  Clock,
  Home,
  Store,
  Package,
  ShoppingBag,
  User,
  AlertCircle,
  X,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function VendorPayoutsScreen15() {
  const [modalOpen, setModalOpen] = useState(false);
  const [method, setMethod] = useState<'WAVE' | 'OM'>('WAVE');
  const [amount, setAmount] = useState('25000');
  const [phone, setPhone] = useState('+221 77 123 45 67');
  const [successMsg, setSuccessMsg] = useState(false);

  const transactions = [
    {
      id: 1,
      title: 'Retrait vers Wave',
      date: '12 avr. 2025',
      status: 'Traité',
      amount: -25000,
      type: 'retrait',
      operator: 'Wave',
    },
    {
      id: 2,
      title: 'Vente #MB-00123',
      date: '10 avr. 2025',
      status: 'Commission',
      amount: 30000,
      type: 'vente',
      operator: 'Malick Buss',
    },
    {
      id: 3,
      title: 'Retrait vers Orange Money',
      date: '8 avr. 2025',
      status: 'Traité',
      amount: -15000,
      type: 'retrait',
      operator: 'Orange Money',
    },
    {
      id: 4,
      title: 'Vente #MB-00120',
      date: '5 avr. 2025',
      status: 'Commission',
      amount: 12500,
      type: 'vente',
      operator: 'Malick Buss',
    },
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-4 pb-20 bg-slate-50 min-h-screen">
      {/* Header Écran 15 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/vendeur/dashboard" className="text-slate-800">
            <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          </Link>
          <h1 className="font-bold text-base text-slate-900">Paiements et retraits</h1>
        </div>
      </header>

      {/* Carte Solde Disponible */}
      <div className="px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm text-center space-y-3">
          <span className="text-xs font-medium text-slate-500 block">Solde disponible</span>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            28 750 FCFA
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-bold py-3 px-4 rounded-xl transition shadow-sm text-sm"
          >
            Demander un retrait
          </button>
        </div>
      </div>

      {/* Section Historique des paiements */}
      <div className="px-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-900">Historique des paiements</h2>
          <span className="text-xs text-slate-400">Total : 4 opérations</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden shadow-sm">
          {transactions.map((t) => {
            const isNegative = t.amount < 0;
            return (
              <div key={t.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50/60 transition">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isNegative
                        ? t.operator === 'Wave'
                          ? 'bg-sky-100 text-sky-600'
                          : 'bg-orange-100 text-orange-600'
                        : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    {isNegative ? (
                      <ArrowUpRight className="w-5 h-5 stroke-[2.2px]" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 stroke-[2.2px]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.title}</h4>
                    <p className="text-[11px] text-slate-500">
                      {t.date} • <span className="text-slate-600 font-medium">{t.status}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-bold ${
                      isNegative ? 'text-slate-800' : 'text-emerald-600'
                    }`}
                  >
                    {isNegative ? `- ${formatFCFA(Math.abs(t.amount))}` : `+ ${formatFCFA(t.amount)}`}
                  </span>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-slate-400">Réussi</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Demande de Retrait Mobile */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Demande de retrait rapide</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-slate-900">Demande envoyée !</h4>
                <p className="text-xs text-slate-500">
                  Votre retrait de {formatFCFA(Number(amount))} vers {method} est en cours de traitement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWithdraw} className="space-y-3.5">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">
                    Opérateur Mobile Money
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMethod('WAVE')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
                        method === 'WAVE'
                          ? 'border-sky-500 bg-sky-50/50 text-sky-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs">Wave</span>
                      <span className="text-[10px] text-sky-600">1% sans frais</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMethod('OM')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition ${
                        method === 'OM'
                          ? 'border-orange-500 bg-orange-50/50 text-orange-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs">Orange Money</span>
                      <span className="text-[10px] text-orange-600">Instantané</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Montant du retrait (FCFA)
                  </label>
                  <input
                    type="number"
                    max={28750}
                    min={1000}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                    required
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Solde max : 28 750 FCFA
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-xs transition"
                >
                  Confirmer le retrait
                </button>
              </form>
            )}
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
