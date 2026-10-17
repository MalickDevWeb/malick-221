'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, PlusCircle, Truck, CreditCard } from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function CheckoutPage() {
  const router = useRouter();
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentOption, setPaymentOption] = useState<'cod' | 'mobile_money'>('cod');

  const handleConfirm = () => {
    router.push('/confirmation');
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Header Écran 9 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/panier" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Commander</h1>
        </Link>
      </header>

      {/* Stepper Horizontal (1 Panier -> 2 Livraison -> 3 Confirmation) */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-1.5 z-10 bg-slate-50 pr-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
              1
            </span>
            <span className="text-[11px] font-semibold text-slate-700">Panier</span>
          </div>
          <div className="flex items-center gap-1.5 z-10 bg-slate-50 px-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-4 ring-emerald-100">
              2
            </span>
            <span className="text-[11px] font-bold text-emerald-700">Livraison</span>
          </div>
          <div className="flex items-center gap-1.5 z-10 bg-slate-50 pl-2">
            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold flex items-center justify-center">
              3
            </span>
            <span className="text-[11px] font-medium text-slate-400">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Adresse de livraison */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-900">Adresse de livraison</h2>
          <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Dakar, Médina / Sandaga</span>
                <span className="text-[11px] text-slate-400">+221 77 123 45 67</span>
              </div>
            </div>
            <button className="text-[11px] font-semibold text-emerald-600">
              Modifier
            </button>
          </div>
        </div>

        {/* Options de Livraison (Standard vs Express) */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-900">Mode de livraison</h2>
          <div className="space-y-2">
            <label
              onClick={() => setDeliveryOption('standard')}
              className={`bg-white rounded-2xl border p-3.5 shadow-sm flex items-center justify-between cursor-pointer transition ${
                deliveryOption === 'standard' ? 'border-emerald-600 ring-1 ring-emerald-600' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  deliveryOption === 'standard' ? 'border-emerald-600' : 'border-slate-300'
                }`}>
                  {deliveryOption === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Livraison standard</span>
                  <span className="text-[11px] text-slate-400">{formatFCFA(3000)} (2-3 jours)</span>
                </div>
              </div>
            </label>

            <label
              onClick={() => setDeliveryOption('express')}
              className={`bg-white rounded-2xl border p-3.5 shadow-sm flex items-center justify-between cursor-pointer transition ${
                deliveryOption === 'express' ? 'border-emerald-600 ring-1 ring-emerald-600' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  deliveryOption === 'express' ? 'border-emerald-600' : 'border-slate-300'
                }`}>
                  {deliveryOption === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Livraison express</span>
                  <span className="text-[11px] text-slate-400">{formatFCFA(5000)} (1 jour)</span>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Mode de Paiement */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-slate-900">Mode de paiement</h2>
          <div className="space-y-2">
            <label
              onClick={() => setPaymentOption('cod')}
              className={`bg-white rounded-2xl border p-3.5 shadow-sm flex items-center justify-between cursor-pointer transition ${
                paymentOption === 'cod' ? 'border-emerald-600 ring-1 ring-emerald-600' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentOption === 'cod' ? 'border-emerald-600' : 'border-slate-300'
                }`}>
                  {paymentOption === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />}
                </div>
                <span className="text-xs font-bold text-slate-900">À la livraison</span>
              </div>
            </label>

            <label
              onClick={() => setPaymentOption('mobile_money')}
              className={`bg-white rounded-2xl border p-3.5 shadow-sm flex items-center justify-between cursor-pointer transition ${
                paymentOption === 'mobile_money' ? 'border-emerald-600 ring-1 ring-emerald-600' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentOption === 'mobile_money' ? 'border-emerald-600' : 'border-slate-300'
                }`}>
                  {paymentOption === 'mobile_money' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />}
                </div>
                <span className="text-xs font-bold text-slate-900">Mobile Money (Wave, Orange Money)</span>
              </div>
            </label>
          </div>
        </div>

        {/* Bouton de Confirmation Écran 9 */}
        <div className="pt-4">
          <button
            onClick={handleConfirm}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98]"
          >
            <span>Confirmer la commande</span>
          </button>
        </div>
      </div>
    </div>
  );
}
