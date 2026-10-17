import Link from 'next/link';
import { ArrowLeft, Check, Clock, Truck, Phone, PackageCheck } from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function DeliveryTrackingScreen10() {
  const steps = [
    { title: 'Commande passée', time: '12 avr. 2025 - 10:34', done: true },
    { title: 'En préparation', time: '12 avr. 2025 - 14:20', done: true },
    { title: 'Expédiée', time: '13 avr. 2025 - 09:10', done: true },
    { title: 'En livraison', time: '13 avr. 2025 - 14:00', current: true },
    { title: 'Livrée', time: 'En attente de confirmation client (OTP)', pending: true },
  ];

  return (
    <div className="space-y-4 pb-12 bg-slate-50 min-h-screen">
      {/* Header Écran 10 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/vendeur/commandes" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Suivi des livraisons</h1>
        </Link>
      </header>

      <div className="px-4 space-y-4">
        {/* Résumé Colis */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=200&q=80"
              alt="Colis"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-black text-xs text-slate-900">
              #MB-2025-00123
            </h2>
            <span className="text-xs font-bold text-emerald-600 block mt-0.5">
              {formatFCFA(12000)}
            </span>
            <span className="text-[10px] text-slate-400 block">
              1 article • Coursier Express Dakar
            </span>
          </div>
        </div>

        {/* Timeline des 5 étapes */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-6">
          <span className="text-xs font-bold text-slate-900 block border-b border-slate-100 pb-2">
            Chronologie de livraison
          </span>

          <div className="relative pl-6 space-y-7 border-l-2 border-emerald-500 ml-2">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {step.done ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center absolute -left-[35px] -top-0.5 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3px]" />
                  </div>
                ) : step.current ? (
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center absolute -left-[35px] -top-0.5 shadow-sm ring-4 ring-amber-100 animate-pulse">
                    <Clock className="w-3 h-3 stroke-[2.5px]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center absolute -left-[35px] -top-0.5">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                  </div>
                )}

                <div>
                  <h3 className={`text-xs font-bold ${step.pending ? 'text-slate-400' : 'text-slate-900'}`}>
                    {step.title}
                  </h3>
                  <span className={`text-[10px] block mt-0.5 ${step.current ? 'text-amber-600 font-semibold' : 'text-slate-400'}`}>
                    {step.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton Contacter le Transporteur */}
        <div className="pt-2">
          <a
            href="tel:+221770000002"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98]"
          >
            <Phone className="w-4 h-4" />
            <span>Contacter le transporteur</span>
          </a>
        </div>
      </div>
    </div>
  );
}
