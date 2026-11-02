'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  Truck,
  CreditCard,
  RotateCcw,
  Store,
  ShieldCheck,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: '1',
    category: 'Livraison & Expédition',
    question: 'Quels sont les délais de livraison à Dakar et dans les régions ?',
    answer:
      'À Dakar, les livraisons s’effectuent en 24h ouvrées (et en express sous 2h à 4h selon la boutique sélectionnée). Pour les régions de l’intérieur (Thiès, Saint-Louis, Mbour, Kaolack, Ziguinchor, etc.), l’acheminement prend entre 48h et 72h via nos transporteurs partenaires agréés.',
  },
  {
    id: '2',
    category: 'Livraison & Expédition',
    question: 'Combien coûtent les frais de livraison ?',
    answer:
      'Le tarif standard de livraison est forfaitaire par boutique (généralement 3 000 FCFA à Dakar). Si vous commandez auprès de plusieurs boutiques distinctes, les frais sont calculés par sous-commande car chaque boutique expédie son colis de manière autonome.',
  },
  {
    id: '3',
    category: 'Paiements & Sécurité',
    question: 'Quels sont les modes de paiement acceptés sur Malick Buss ?',
    answer:
      'Vous pouvez régler vos achats en toute sécurité par Wave, Orange Money, Free Money ou par Carte Bancaire. Le Paiement à la Livraison (Cash on Delivery / COD) est également proposé sur les articles et boutiques éligibles.',
  },
  {
    id: '4',
    category: 'Paiements & Sécurité',
    question: 'Mon paiement Wave ou Orange Money est-il sécurisé ?',
    answer:
      'Oui, à 100%. Les fonds sont retenus sous séquestre sécurisé par la marketplace. Le vendeur n’est crédité de son gain qu’une fois la commande réceptionnée et validée par vos soins.',
  },
  {
    id: '5',
    category: 'Retours & Remboursements',
    question: 'Puis-je retourner un produit si la taille ou la couleur ne convient pas ?',
    answer:
      'Conformément à la politique Malick Buss, vous disposez d’un délai légal de 7 jours ouvrés après réception pour déclarer un retour ou un litige. L’article doit être retourné dans son emballage d’origine, non porté et non détérioré.',
  },
  {
    id: '6',
    category: 'Retours & Remboursements',
    question: 'Comment s’effectue le remboursement en cas de retour accepté ?',
    answer:
      'Dès validation du retour par notre équipe d’arbitrage, le remboursement est exécuté directement sur votre compte Wave ou Orange Money sous 24h à 48h, sans frais supplémentaires.',
  },
  {
    id: '7',
    category: 'Boutiques & Authenticité',
    question: 'Comment garantissez-vous l’authenticité des photos de produits ?',
    answer:
      'Malick Buss applique une politique stricte de caméra directe ("requireLiveCapture") sur les boutiques certifiées. Les marchands doivent capturer des photos et vidéos en temps réel, garantissant que le produit reçu est exactement celui photographié.',
  },
  {
    id: '8',
    category: 'Boutiques & Authenticité',
    question: 'Comment ouvrir ma boutique et vendre sur Malick Buss ?',
    answer:
      'L’inscription vendeur est gratuite ! Rendez-vous sur notre page Inscription Vendeur (/vendeur/inscription), remplissez votre dossier KYC (nom de boutique, pièce d’identité, numéro Wave de reversement). Après validation par le Super Admin en 24h, vous pouvez commencer à vendre.',
  },
];

export default function ClientHelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [openAccordion, setOpenAccordion] = useState<string | null>('1');

  const categories = [
    'Tous',
    'Livraison & Expédition',
    'Paiements & Sécurité',
    'Retours & Remboursements',
    'Boutiques & Authenticité',
  ];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Tous' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const whatsappNumber = '221771719013';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Malick Buss, je contacte le support client depuis la page d'aide."
  )}`;

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* ================= HERO HEADER ================= */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Support Client & Assistance Dédiée (Sénégal)
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            Comment pouvons-nous vous aider ?
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Trouvez rapidement une réponse à vos questions sur vos commandes, les paiements Wave / Orange Money, la livraison à Dakar et les retours.
          </p>

          {/* Barre de recherche */}
          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une question (ex: Wave, délai livraison, retour...)"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm text-slate-900 placeholder-slate-400 font-medium"
            />
          </div>
        </div>

        {/* ================= CANAUX DE CONTACT RAPIDE ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                Instantané
              </span>
            </div>
            <h3 className="font-bold text-base mb-1">WhatsApp Direct</h3>
            <p className="text-xs text-emerald-100 mb-3">
              Échangez en direct avec nos conseillers sur WhatsApp.
            </p>
            <div className="text-xs font-bold text-white flex items-center gap-1 group-hover:underline">
              <span>+221 77 171 90 13</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href="tel:+221771719013"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                Lun-Sam 8h-20h
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-950 mb-1">Assistance Téléphonique</h3>
            <p className="text-xs text-slate-600 mb-3">
              Appel direct vers notre standard service client à Dakar.
            </p>
            <div className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:underline">
              <span>Appeler maintenant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-700" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                24h max
              </span>
            </div>
            <h3 className="font-bold text-base text-slate-950 mb-1">Email Support</h3>
            <p className="text-xs text-slate-600 mb-3">
              Pour vos questions administratives, factures ou partenariats.
            </p>
            <div className="text-xs font-bold text-blue-600">
              support@malickbuss.sn
            </div>
          </div>
        </div>

        {/* ================= FILTRES DE CATÉGORIES FAQ ================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ================= LISTE ACCORDÉON DES QUESTIONS ================= */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                Aucune question ne correspond à votre recherche "{searchTerm}".
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openAccordion === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-950 hover:bg-slate-50/80 transition-colors"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-amber-500' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= BANNIÈRE DE RÉASSURANCE BAS DE PAGE ================= */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base sm:text-lg">Vous ne trouvez pas votre réponse ?</h3>
            <p className="text-xs text-slate-400">
              Nos équipes d'assistance basées à Dakar sont prêtes à vous répondre sur WhatsApp.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all transform hover:scale-105 whitespace-nowrap"
          >
            Contacter un conseiller →
          </a>
        </div>
      </div>
    </div>
  );
}
