import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function VendorCommissionsScreen12() {
  const commissionsList = [
    {
      id: 'MB-00123',
      amount: 2000,
      date: '12 avr. 2025',
      status: 'En attente',
      statusClass: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      id: 'MB-00122',
      amount: 3500,
      date: '11 avr. 2025',
      status: 'Payée',
      statusClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'MB-00120',
      amount: 1250,
      date: '9 avr. 2025',
      status: 'En attente',
      statusClass: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      id: 'MB-00118',
      amount: 2100,
      date: '8 avr. 2025',
      status: 'Payée',
      statusClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 12 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Mes commissions</h1>
        </Link>
      </header>

      {/* Total des Commissions */}
      <div className="px-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm text-center space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total des commissions</span>
          <div className="text-2xl font-black text-emerald-600">{formatFCFA(28750)}</div>
        </div>
      </div>

      {/* 2 Sous-Cartes : En attente & Payées */}
      <div className="px-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] font-semibold">En attente</span>
          </div>
          <div className="text-sm font-black text-slate-900">{formatFCFA(9850)}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-semibold">Payées</span>
          </div>
          <div className="text-sm font-black text-slate-900">{formatFCFA(18900)}</div>
        </div>
      </div>

      {/* Détails des Commissions */}
      <div className="px-4 space-y-2.5">
        <h3 className="font-bold text-xs text-slate-900">Détails des commissions</h3>
        <div className="space-y-2">
          {commissionsList.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-xs text-slate-900">Vente #{c.id}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400">{c.date}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${c.statusClass}`}>
                    {c.status}
                  </span>
                </div>
              </div>
              <span className="font-black text-xs text-slate-900">{formatFCFA(c.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
