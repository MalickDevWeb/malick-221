import Link from 'next/link';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function OrderConfirmationPage() {
  const orderNumber = 'MB-2025-00123';
  const orderItem = {
    title: 'Veste en jean vintage',
    price: 12000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=300&q=80',
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Je viens de passer commande sur Malick Buss ! Commande n° ${orderNumber} (${orderItem.title}).`
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-slate-950 to-slate-950 text-white p-5 flex flex-col justify-between">
      <div className="space-y-6 pt-6 text-center">
        {/* Icône de validation Écran 10 */}
        <div className="w-16 h-16 rounded-full bg-emerald-600 border-4 border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-900/50">
          <Check className="w-8 h-8 text-white stroke-[3px]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-black text-white tracking-tight">
            Commande confirmée !
          </h1>
          <p className="text-xs text-emerald-100/80 max-w-[280px] mx-auto leading-relaxed">
            Merci pour votre achat sur Malick Buss. Votre commande a été prise en compte.
          </p>
        </div>

        <div className="inline-block bg-emerald-900/60 border border-emerald-700/50 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-200">
          N° de commande : <span className="font-bold text-white">{orderNumber}</span>
        </div>

        {/* Carte Détails Blanche Flottante */}
        <div className="bg-white text-slate-900 rounded-2xl p-4 text-left shadow-lg space-y-3">
          <h2 className="text-xs font-bold text-slate-900">
            Détails de la commande
          </h2>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
              <img
                src={orderItem.image}
                alt={orderItem.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-semibold text-slate-900 truncate">
                {orderItem.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {formatFCFA(orderItem.price)} × {orderItem.quantity}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-xs font-extrabold">
            <span>Total</span>
            <span className="text-emerald-600 text-sm">{formatFCFA(orderItem.price)}</span>
          </div>
        </div>

        {/* Boutons d'Action Écran 10 */}
        <div className="space-y-2.5 pt-2">
          <Link
            href="/profil"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98]"
          >
            <span>Voir mes commandes</span>
          </Link>

          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-transparent hover:bg-white/5 border border-emerald-500 text-emerald-300 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Partager sur WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="pb-4 pt-6 text-center">
        <p className="text-[11px] text-slate-400 max-w-[260px] mx-auto">
          Vous allez recevoir un message WhatsApp avec les détails de votre commande.
        </p>
      </div>
    </div>
  );
}

