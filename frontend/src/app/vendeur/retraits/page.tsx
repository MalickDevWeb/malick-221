'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Smartphone,
  CheckCircle2,
  Clock,
  Plus,
  TrendingUp,
  Download,
  AlertCircle,
  X,
  ShieldCheck,
  CreditCard,
  DollarSign,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    title: 'Retrait vers Wave Sénégal',
    date: '12 avr. 2025 • 14:32',
    status: 'Traité & Reçu',
    amount: -25000,
    type: 'RETRAIT',
    operator: 'Wave',
    ref: 'WAV-9812401',
  },
  {
    id: 2,
    title: 'Vente #MB-00123 (Ensemble Boubou Soie)',
    date: '10 avr. 2025 • 18:15',
    status: 'Commission validée',
    amount: 30000,
    type: 'VENTE',
    operator: 'Malick Buss',
    ref: 'CMD-2025-0123',
  },
  {
    id: 3,
    title: 'Retrait vers Orange Money',
    date: '8 avr. 2025 • 09:20',
    status: 'Traité & Reçu',
    amount: -15000,
    type: 'RETRAIT',
    operator: 'Orange Money',
    ref: 'OM-4410928',
  },
  {
    id: 4,
    title: 'Vente #MB-00120 (Chemise Lin Dakar)',
    date: '5 avr. 2025 • 11:45',
    status: 'Commission validée',
    amount: 12500,
    type: 'VENTE',
    operator: 'Malick Buss',
    ref: 'CMD-2025-0120',
  },
];

export default function VendorPayoutsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [method, setMethod] = useState<'WAVE' | 'OM'>('WAVE');
  const [amount, setAmount] = useState('25000');
  const [phone, setPhone] = useState('+221 77 123 45 67');
  const [successMsg, setSuccessMsg] = useState(false);
  const [filterType, setFilterType] = useState<'ALL' | 'RETRAIT' | 'VENTE'>('ALL');
  const [availableBalance, setAvailableBalance] = useState(28750);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('malick_vendor_payouts');
      if (stored) {
        setTransactions(JSON.parse(stored));
      }
      const storedBal = localStorage.getItem('malick_vendor_balance');
      if (storedBal) {
        setAvailableBalance(Number(storedBal));
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === 'ALL') return true;
    return t.type === filterType;
  });

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = Number(amount) || 0;
    if (withdrawAmount <= 0) return;

    const newTx = {
      id: Date.now(),
      title: `Retrait vers ${method === 'WAVE' ? 'Wave Sénégal' : 'Orange Money'} (${phone})`,
      date: `Aujourd'hui • ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
      status: 'Traité & Reçu',
      amount: -withdrawAmount,
      type: 'RETRAIT',
      operator: method === 'WAVE' ? 'Wave' : 'Orange Money',
      ref: `${method === 'WAVE' ? 'WAV' : 'OM'}-${Date.now().toString().slice(-7)}`,
    };

    const nextTransactions = [newTx, ...transactions];
    const nextBalance = Math.max(0, availableBalance - withdrawAmount);

    setTransactions(nextTransactions);
    setAvailableBalance(nextBalance);

    try {
      localStorage.setItem('malick_vendor_payouts', JSON.stringify(nextTransactions));
      localStorage.setItem('malick_vendor_balance', nextBalance.toString());
    } catch (e) {
      console.warn(e);
    }

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setModalOpen(false);
    }, 1200);
  };

  return (
    <VendorPortalShell
      title="Finances & Retraits"
      subtitle="Gérez votre trésorerie, vos retraits Wave / Orange Money et vos historiques de vente."
      breadcrumbs={[{ label: 'Finances & Retraits' }]}
      actionElement={
        <button
          onClick={() => setModalOpen(true)}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2 rounded-full transition shadow-xs flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5px]" />
          <span>Nouveau Retrait</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* ================= 1. KPI FINANCIERS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Solde Disponible */}
          <div className="bg-gradient-to-br from-[#071328] to-[#0c1a35] text-white rounded-3xl p-5 border border-slate-800 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Solde Disponible</span>
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="pt-3">
              <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
                {formatFCFA(availableBalance)}
              </div>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                <span>✓</span> Prêt pour virement immédiat
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Retirer mes fonds</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5px]" />
            </button>
          </div>

          {/* En attente de déblocage */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">En cours de livraison</span>
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="pt-3">
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                12 500 <span className="text-xs font-bold text-slate-400">FCFA</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Débloqué dès confirmation client
              </p>
            </div>
          </div>

          {/* Total Retiré */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Retiré (Cumul)</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="pt-3">
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                145 000 <span className="text-xs font-bold text-slate-400">FCFA</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                8 retraits effectués avec succès
              </p>
            </div>
          </div>

          {/* Taux de Commission */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Commission Marketplace</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="pt-3">
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                8 % <span className="text-xs font-bold text-slate-400">par vente</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Frais d'hébergement & logistique
              </p>
            </div>
          </div>
        </div>

        {/* ================= 2. TABLEAU DES TRANSACTIONS ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
          {/* Header du tableau & Filtres */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900">
                Historique des mouvements de fonds
              </h2>
              <p className="text-xs text-slate-500">
                Suivez en temps réel chaque crédit de vente et débit de virement.
              </p>
            </div>

            {/* Filtres Pilules */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full text-xs font-semibold">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1 rounded-full transition ${
                  filterType === 'ALL'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tous ({transactions.length})
              </button>
              <button
                onClick={() => setFilterType('RETRAIT')}
                className={`px-3 py-1 rounded-full transition ${
                  filterType === 'RETRAIT'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Retraits Wave/OM
              </button>
              <button
                onClick={() => setFilterType('VENTE')}
                className={`px-3 py-1 rounded-full transition ${
                  filterType === 'VENTE'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ventes créditées
              </button>
            </div>
          </div>

          {/* Liste des Opérations */}
          <div className="divide-y divide-slate-100">
            {filteredTransactions.map((t) => {
              const isNegative = t.amount < 0;

              return (
                <div
                  key={t.id}
                  className="p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/80 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        isNegative
                          ? t.operator === 'Wave'
                            ? 'bg-sky-50 text-sky-600 border border-sky-100'
                            : 'bg-orange-50 text-orange-600 border border-orange-100'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}
                    >
                      {isNegative ? (
                        <ArrowUpRight className="w-5 h-5 stroke-[2.2px]" />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5 stroke-[2.2px]" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {t.title}
                        </h4>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {t.ref}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {t.date} • <span className="text-slate-700 font-semibold">{t.status}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs sm:text-sm font-black ${
                        isNegative ? 'text-slate-900' : 'text-emerald-600'
                      }`}
                    >
                      {isNegative ? `- ${formatFCFA(Math.abs(t.amount))}` : `+ ${formatFCFA(t.amount)}`}
                    </span>
                    <div className="flex items-center justify-end gap-1 mt-0.5 text-[10px] text-emerald-600 font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Validé</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= MODAL DEMANDE DE RETRAIT ================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Demande de virement express</h3>
                <p className="text-xs text-slate-500">Transfert direct sur votre mobile money</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-black text-base text-slate-900">Demande envoyée avec succès !</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Votre virement de <span className="font-bold text-slate-900">{formatFCFA(Number(amount))}</span> vers <span className="font-bold text-slate-900">{method}</span> ({phone}) est en cours d'exécution.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-2">
                    Sélectionnez votre compte de réception
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setMethod('WAVE')}
                      className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition text-left ${
                        method === 'WAVE'
                          ? 'border-sky-500 bg-sky-50/60 text-sky-900 font-bold ring-2 ring-sky-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center font-black text-xs">
                        W
                      </div>
                      <span className="text-xs font-bold">Wave Sénégal</span>
                      <span className="text-[10px] text-sky-700 font-semibold">Sans frais de retrait</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMethod('OM')}
                      className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 transition text-left ${
                        method === 'OM'
                          ? 'border-orange-500 bg-orange-50/60 text-orange-900 font-bold ring-2 ring-orange-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-xs">
                        OM
                      </div>
                      <span className="text-xs font-bold">Orange Money</span>
                      <span className="text-[10px] text-orange-700 font-semibold">Transfert instantané</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Numéro de téléphone Wave / Orange Money
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400"
                    placeholder="+221 77 000 00 00"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-800">
                      Montant du retrait (FCFA)
                    </label>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                      Max : 28 750 FCFA
                    </span>
                  </div>
                  <input
                    type="number"
                    max={28750}
                    min={1000}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:brightness-110 active:scale-95 text-slate-950 font-black py-3 rounded-full text-xs transition shadow-md shadow-amber-500/20"
                >
                  Confirmer le retrait de {formatFCFA(Number(amount) || 0)}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </VendorPortalShell>
  );
}
