'use client';

import React, { useState, useEffect } from 'react';
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
  Send,
  Ticket,
  Check,
} from 'lucide-react';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';
import { addVendorNotification } from '../../../services/notificationStore';

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  message: string;
  status: 'OUVERT' | 'EN_COURS' | 'RESOLU';
  createdAt: string;
}

export default function VendorSupportPage() {
  const [contactModal, setContactModal] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Ticket form
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Paiement Wave / Orange Money');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [myTickets, setMyTickets] = useState<SupportTicket[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('malick_vendor_tickets');
      if (raw) {
        setMyTickets(JSON.parse(raw));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      showToast('⚠️ Veuillez renseigner le sujet et le message.');
      return;
    }

    const newTicket: SupportTicket = {
      id: `TICKET-SN-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject.trim(),
      category: ticketCategory,
      message: ticketMessage.trim(),
      status: 'OUVERT',
      createdAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newTicket, ...myTickets];
    setMyTickets(updated);
    try {
      localStorage.setItem('malick_vendor_tickets', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    // Add a notification to the vendor
    addVendorNotification({
      type: 'SUPPORT',
      title: `Ticket ${newTicket.id} ouvert`,
      subtitle: `Votre demande « ${newTicket.subject} » a bien été transmise à l'équipe d'assistance.`,
      time: 'À l\'instant',
      href: '/vendeur/support',
    });

    setTicketSuccess(true);
    setTimeout(() => {
      setTicketSuccess(false);
      setTicketModal(false);
      setTicketSubject('');
      setTicketMessage('');
      showToast(`✅ Ticket ${newTicket.id} transmis avec succès ! Réponse sous 15 min.`);
    }, 1200);
  };

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
          href="https://wa.me/221771719013?text=Bonjour%20Support%20Malick%20Buss%2C%20je%20suis%20g%C3%A9rant%20de%20boutique"
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
        {/* Toast Notif */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-[#071328] text-amber-400 font-bold px-4 py-3 rounded-2xl shadow-2xl border border-amber-400/40 text-xs flex items-center gap-2 animate-in slide-in-from-top">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}

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
              onClick={() => setTicketModal(true)}
              className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30 font-bold text-xs px-4 py-3 rounded-full transition shadow-xs flex items-center gap-2 active:scale-95"
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              <span>Ouvrir un ticket</span>
            </button>
            <button
              onClick={() => setContactModal(true)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-3 rounded-full transition shadow-xs flex items-center gap-2 active:scale-95"
            >
              <Headphones className="w-4 h-4 stroke-[2.2px]" />
              <span>Contacter un conseiller</span>
            </button>
          </div>
        </div>

        {/* ================= 2. 3 CANAUX DE CONTACT RAPIDES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://wa.me/221771719013?text=Bonjour%20Support%20Malick%20Buss"
            target="_blank"
            rel="noreferrer"
            className="group bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-emerald-500 hover:shadow-lg transition-all flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-600 transition">
                WhatsApp Vendeurs
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Discussion directe avec un agent support dédié à Dakar.
              </p>
              <span className="text-[11px] font-bold text-emerald-600 block pt-1">
                +221 77 171 90 13 →
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
            <div className="space-y-1">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition">
                Ligne Directe
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Appel gratuit pour assistance sur retraits et litiges de livraison.
              </p>
              <span className="text-[11px] font-bold text-amber-600 block pt-1">
                7j/7 de 8h à 21h →
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
            <div className="space-y-1">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sky-600 transition">
                Support par Email
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Pour vos demandes de facturation et questions juridiques.
              </p>
              <span className="text-[11px] font-bold text-sky-600 block pt-1">
                support@malickbuss.sn →
              </span>
            </div>
          </a>
        </div>

        {/* ================= 3. MES TICKETS EN COURS ================= */}
        {myTickets.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Ticket className="w-4 h-4 text-amber-500" />
                <span>Mes tickets d'assistance récents ({myTickets.length})</span>
              </h3>
              <button
                onClick={() => setTicketModal(true)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
              >
                + Nouveau ticket
              </button>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {myTickets.map((t) => (
                <div key={t.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">{t.id}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                        {t.category}
                      </span>
                    </div>
                    <p className="text-slate-700 font-semibold mt-0.5">{t.subject}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{t.message}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      ● Pris en charge
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-1">{t.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 4. FOIRE AUX QUESTIONS VENDEUR (FAQ) ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>Questions Fréquentes des Vendeurs</span>
            </h3>
            <span className="text-xs font-semibold text-slate-400">4 réponses clés</span>
          </div>

          <div className="divide-y divide-slate-100">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 group"
                  >
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-amber-600 transition">
                      {faq.q}
                    </h4>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-transform ${
                        isOpen
                          ? 'bg-amber-100 text-amber-700 rotate-90'
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

      {/* ================= MODAL OUVRIR UN TICKET ================= */}
      {ticketModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Ouvrir un ticket d'assistance</h3>
                <p className="text-xs text-slate-500">Un agent dédié prendra en charge votre demande en priorité</p>
              </div>
              <button
                onClick={() => setTicketModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Catégorie du problème</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                >
                  <option value="Paiement Wave / Orange Money">Paiement Wave / Orange Money</option>
                  <option value="Problème Coursier / Expédition Colis">Problème Coursier / Expédition Colis</option>
                  <option value="Gestion Catalogue & Produits">Gestion Catalogue & Produits</option>
                  <option value="Compte & Identifiants">Compte & Identifiants</option>
                  <option value="Autre demande">Autre demande</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Objet de la demande *</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Ex: Retard coursier commande #MB-00123"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message détaillé *</label>
                <textarea
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Expliquez la situation avec un maximum de précisions..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400 resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTicketModal(false)}
                  className="flex-1 py-3 px-4 rounded-full border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={ticketSuccess}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black py-3 px-4 rounded-full shadow-md shadow-amber-500/20 active:scale-95 transition flex items-center justify-center gap-2"
                >
                  {ticketSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-900" />
                      <span>Ticket envoyé !</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmettre le ticket</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                href="https://wa.me/221771719013?text=Bonjour%20Support%20Malick%20Buss"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3.5 text-emerald-900 hover:bg-emerald-100 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">WhatsApp Direct (Recommandé)</h4>
                  <p className="text-[11px] text-emerald-700">+221 77 171 90 13 • Réponse en ~2 min</p>
                </div>
              </a>

              <a
                href="tel:+221771719013"
                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3.5 text-slate-900 hover:bg-slate-100 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Appel Téléphonique Direct</h4>
                  <p className="text-[11px] text-slate-500">+221 77 171 90 13 • Gratuit</p>
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
