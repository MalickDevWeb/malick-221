import Link from 'next/link';
import { ArrowLeft, Percent, CheckCircle2 } from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function CommissionsPage() {
  const commissions = [
    {
      id: 'MB-00123',
      shop: 'Style & Mode',
      amount: 2000,
      avatar: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'MB-00122',
      shop: 'TechZone',
      amount: 1200,
      avatar: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'MB-00121',
      shop: 'Beauty World',
      amount: 950,
      avatar: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'MB-00120',
      shop: 'Style & Mode',
      amount: 1500,
      avatar: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 14 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/dashboard" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Commissions</h1>
        </Link>
      </header>

      {/* Carte Verte Totale Écran 14 */}
      <div className="px-4">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl p-5 shadow-md space-y-1 text-center">
          <span className="text-xs text-emerald-100 font-medium">
            Total des commissions
          </span>
          <div className="text-2xl font-black tracking-tight">
            {formatFCFA(12450)}
          </div>
          <span className="text-[11px] text-emerald-200 block">
            Ce mois-ci
          </span>
        </div>
      </div>

      {/* Liste des Détails de Commission Écran 14 */}
      <div className="px-4 space-y-2.5">
        <h2 className="text-xs font-bold text-slate-900">
          Détail des commissions
        </h2>

        <div className="space-y-2">
          {commissions.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={c.avatar} alt={c.shop} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900">
                    Vente #{c.id}
                  </h3>
                  <span className="text-[11px] text-slate-400 block">
                    {c.shop}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-xs text-emerald-600">
                  {formatFCFA(c.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
