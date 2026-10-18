'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Headphones,
  Video,
  AlertTriangle,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  X,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';

export default function VendorSupportPage() {
  const [contactModal, setContactModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Comment et quand mes paiements Wave / Orange Money sont-ils virés ?',
      a: 'Vos revenus sont crédités dès que le client accuse réception de sa commande. Vous pouvez demander un virement instantané à tout moment vers Wave ou Orange Money depuis votre onglet « Finances & Retraits », sans aucun frais caché.',
    },
    {
      q: 'Comment fonctionne la commission de 8% sur les ventes ?',
      a: 'Malick Buss applique une commission unique et transparente de 8% prélevée uniquement sur les ventes réussies. Si vous ne vendez pas, vous ne payez rien. Cela couvre les frais de passerelle Mobile Money, l’hébergement et le support.',
    },
    {
      q: 'Comment se passe la livraison des colis aux coursiers à Dakar ?',
      a: 'Dès qu’une commande arrive, vous préparez le colis dans votre emballage avec le bordereau Malick Buss. Nos livreurs partenaires passent directement récupérer le colis dans votre boutique physique ou domicile pour livraison au client en 24h.',
    },
    {
      q: 'Comment placer ma boutique en vedette ou en tête d’affiche ?',
      a: 'Les boutiques avec une note supérieure à 4.7/5 et un taux d’expédition rapide accèdent gratuitement au programme VIP. Des formules de visibilité sponsorisée sont également activables auprès de votre conseiller commercial.',
    },
  ];

  return (
    <VendorPortalShell
      title="Support & Assistance Vendeur"
      subtitle="Une équipe locale dédiée pour vous accompagner dans la croissance de vos ventes."
      breadcrumbs={[{ label: 'Support & Assistance' }]}
      actionElement={
        <a
          href="https://wa.me/221771234567?text=Bonjour%20Support%20Malick%20Buss%2C%20je%20suis%20g%C3%A9rant%20de%20boutique"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-full transition shadow-xs flex items-center gap-1.5 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Direct</span>
        </a>
      }
    >
      <div className="space-y-6">
        {/* ================= 1. CARTE BANNIÈRE SUPPORT PRESTIGE ================= */}
        <div className="bg-gradient-to-r from-[#071328] via-[#0c1a35] to-[#071328] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
              Assistance Partenaires 🇸🇳
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Besoin d'aide avec vos commandes ou livraisons ?
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Nos conseillers à Dakar vous répondent en moins de 2 minutes par WhatsApp et téléphone du lundi au dimanche de 8h à 21h.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setContactModal(true)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-3 rounded-full transition shadow-xs flex items-center gap-2"
            >
              <Headphones className="w-4 h-4 stroke-[2.2px]" />
              <span>Contacter un conseiller</span>
            </button>
          </div>
        </div>

        {/* ================= 2. 3 CANAUX DE CONTACT RAPIDES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://wa.me/221771234567?text=Bonjour%20Support%20Malick%20Buss"
            target="_blank"
            rel="noreferrer"
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-emerald-500 hover:shadow-lg transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition">
                WhatsApp Direct
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">+221 77 123 45 67</p>
              <span className="text-[10px] font-bold text-emerald-600 mt-2 inline-block">
                ⚡ Réponse moyenne : 2 min
              </span>
            </div>
          </a>

          <a
            href="tel:+221771234567"
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-amber-500 hover:shadow-lg transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition">
                Ligne Téléphonique
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Appel gratuit au Sénégal</p>
              <span className="text-[10px] font-bold text-amber-600 mt-2 inline-block">
                7j/7 de 8h à 21h
              </span>
            </div>
          </a>

          <a
            href="mailto:support@malickbuss.sn"
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-sky-500 hover:shadow-lg transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition">
                Email Vendeurs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">support@malickbuss.sn</p>
              <span className="text-[10px] font-bold text-sky-600 mt-2 inline-block">
                Traitement garanti en 24h
              </span>
            </div>
          </a>
        </div>

        {/* ================= 3. FAQ INTERACTIVE POUR BOUTIQUIERS ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                <span>Questions fréquentes des commerçants</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Tout ce que vous devez savoir pour piloter votre boutique sur Malick Buss.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;

              return (
                <div key={idx} className="py-3.5">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-amber-600 transition">
                      {faq.q}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                        isOpen
                          ? 'bg-amber-400 text-slate-950 rotate-90'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      ›
                    </span>
                  </button>

                  {isOpen && (
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed pl-1 animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= MODAL DE CONTACT ================= */}
      {contactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Support Boutiquiers Malick Buss</h3>
                <p className="text-xs text-slate-500">Choisissez votre moyen de contact préféré</p>
              </div>
              <button
                onClick={() => setContactModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/221771234567?text=Bonjour%20Support%20Malick%20Buss"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3.5 text-emerald-900 hover:bg-emerald-100 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">WhatsApp Direct (Recommandé)</h4>
                  <p className="text-[11px] text-emerald-700">+221 77 123 45 67 • Réponse en ~2 min</p>
                </div>
              </a>

              <a
                href="tel:+221771234567"
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3.5 text-slate-900 hover:bg-slate-100 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Appel Téléphonique Direct</h4>
                  <p className="text-[11px] text-slate-500">+221 77 123 45 67 • Gratuit</p>
                </div>
              </a>

              <a
                href="mailto:support@malickbuss.sn"
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3.5 text-slate-900 hover:bg-slate-100 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Courriel Écrit</h4>
                  <p className="text-[11px] text-slate-500">support@malickbuss.sn</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </VendorPortalShell>
  );
}
