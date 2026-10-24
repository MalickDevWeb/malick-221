'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Check,
  MessageCircle,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Package,
  MapPin,
  Phone,
  Clock,
  Store,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { getOrder, StoredOrder } from '../../../services/order-flow';
import { getClientAccount, setClientPassword, ClientAccount } from '../../../services/clientAccountStore';
import { buildWhatsAppUrl } from '../../../services/platformSettingsStore';
import { resolveShopContact } from '../../../services/vendorProfileStore';

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const orderNumber = searchParams.get('id') ?? '';

  // Client account password setup state
  const [clientAccount, setClientAccount] = useState<ClientAccount | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const foundOrder = orderNumber ? getOrder(orderNumber) : undefined;
    if (!foundOrder) {
      router.replace('/commandes');
      return;
    }
    setOrder(foundOrder);
    setClientAccount(getClientAccount());
  }, [orderNumber, router]);

  if (!order) return null;

  const firstItem = order.items[0];
  const shopContact = resolveShopContact(firstItem?.shop);

  const orderSummaryText = order.items
    .map((item) => `• ${item.title} (x${item.quantity}) : ${formatFCFA(item.price * item.quantity)}`)
    .join('\n');

  const shopWhatsAppMessage = `Bonjour ${shopContact.name} 🇸🇳, je viens de passer la commande n° *${order.id}* sur votre vitrine Malick Buss :\n\n${orderSummaryText}\n\nTotal : ${formatFCFA(order.total)}\nClient : ${order.customerName || 'Client'}\nTéléphone : ${order.customerPhone || ''}\nAdresse : ${order.shippingAddress || ''}\n\nMerci de bien vouloir confirmer ma commande.`;

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 4) {
      setPasswordError('Le mot de passe doit comporter au moins 4 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Les deux mots de passe ne correspondent pas.');
      return;
    }
    const res = setClientPassword(password);
    if (res.success) {
      setPasswordSaved(true);
      setPasswordError('');
    } else {
      setPasswordError(res.error || 'Erreur lors de la sauvegarde.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* En-tête sobre de confirmation (Pas de confettis, pas d'éclats fête) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 text-center shadow-xs">
          {/* Icône de succès posée et professionnelle */}
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <Check className="w-8 h-8 stroke-[2.5px]" />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-1.5">
            Commande enregistrée avec succès
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Votre commande a bien été transmise à la boutique pour préparation.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800">
            <span className="text-slate-500 font-semibold">N° de commande :</span>
            <span className="text-emerald-700 font-black">{order.id}</span>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full w-fit mx-auto">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Statut : En attente de validation par la boutique</span>
          </div>
        </div>

        {/* Détails de la commande */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900">
                Articles commandés ({order.items.length})
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Vendu par : <strong className="text-slate-800">{firstItem?.shop || 'Boutique Malick Buss'}</strong>
            </span>
          </div>

          {/* Liste des articles */}
          <div className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3.5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0 bg-slate-50"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 truncate">{item.title}</h3>
                  <p className="text-[11px] text-slate-500">
                    Quantité : <strong className="text-slate-800">{item.quantity}</strong> × {formatFCFA(item.price)}
                  </p>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 text-right shrink-0">
                  {formatFCFA(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Récapitulatif montants */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span className="font-semibold text-slate-900">{formatFCFA(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison ({order.deliveryOption === 'express' ? 'Express 24h' : 'Standard'})</span>
              <span className="font-semibold text-slate-900">{formatFCFA(order.shipping)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
              <span className="text-sm font-bold">Total réglé / à régler</span>
              <span className="text-base font-black text-emerald-700">{formatFCFA(order.total)}</span>
            </div>
          </div>

          {/* Coordonnées de livraison */}
          <div className="pt-3 border-t border-slate-100 bg-slate-50/80 rounded-xl p-3.5 text-xs space-y-1.5 text-slate-600">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Adresse de livraison :</span>
            </div>
            <p className="pl-5 text-slate-700">{order.shippingAddress || 'Médina, Dakar'}</p>
            <div className="pl-5 flex items-center gap-2 text-slate-500 text-[11px]">
              <Phone className="w-3 h-3 text-slate-400" />
              <span>Contact : {order.customerPhone || clientAccount?.phoneNumber || '77 123 45 67'}</span>
            </div>
          </div>
        </div>

        {/* Contact direct WhatsApp avec la boutique */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-emerald-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <MessageCircle className="w-5 h-5 fill-emerald-600 stroke-emerald-600" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                Échanger avec la boutique vendeuse
              </h3>
              <p className="text-[11px] text-slate-500">
                Contact direct WhatsApp avec {shopContact.name} pour confirmer ou poser une question.
              </p>
            </div>
          </div>

          <a
            href={buildWhatsAppUrl(shopContact.phone, shopWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-xs shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Ouvrir WhatsApp</span>
          </a>
        </div>

        {/* Sécurisation du compte client (Mot de passe pour suivi) */}
        {!clientAccount?.hasPassword && !passwordSaved ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                  Sécurisez votre espace client
                </h3>
                <p className="text-[11px] text-slate-500">
                  Compte lié au {order.customerPhone || clientAccount?.phoneNumber || '77 123 45 67'}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Pour suivre l’acheminement de vos colis, confirmer la bonne réception et retrouver vos factures en toute sécurité, vous pouvez définir un mot de passe :
            </p>

            {passwordError && (
              <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {passwordError}
              </p>
            )}

            <form onSubmit={handleSavePassword} className="space-y-2.5">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Créer un mot de passe (min. 4 car.)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 pr-10 font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer votre mot de passe"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-semibold"
              />

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition shadow-xs"
              >
                Activer et sécuriser mon compte
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Votre compte client est sécurisé et actif pour le suivi de commande.</span>
          </div>
        )}

        {/* Boutons d'actions principaux */}
        <div className="space-y-2.5 pt-2">
          <Link
            href={`/suivre-commande?id=${encodeURIComponent(order.id)}`}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
          >
            <span>Suivre l&apos;état de ma commande en direct</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/boutiques"
            className="w-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition"
          >
            <span>Continuer mes achats sur Malick Buss</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
