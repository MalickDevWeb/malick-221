'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
  Banknote,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  ShoppingBag,
  Store,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export function DesktopFooter() {
  const pathname = usePathname();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Pas de footer sur l'Espace Vendeur ni sur les pages de flux épuré
  if (
    pathname.startsWith('/vendeur') ||
    pathname === '/splash' ||
    pathname === '/connexion' ||
    pathname === '/login' ||
    pathname === '/checkout' ||
    pathname === '/confirmation'
  ) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 3500);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="hidden md:block relative text-white font-sans mt-16 overflow-hidden select-none bg-[#030a16]">
      
      {/* IMAGE D'ARRIÈRE-PLAN PANORAMIQUE OFFICIELLE FOURNIE PAR L'UTILISATEUR */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat opacity-90 pointer-events-none"
        style={{ backgroundImage: "url('/images/footer/footer_clean_bg.png')" }}
      />
      {/* Voile sombre transparent pour garantir un contraste optimal tout en laissant briller le skyline et le drapeau */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#040d1e]/90 via-[#040d1e]/75 to-[#020712]/95 pointer-events-none" />

      {/* Contenu principal calé sur la grille standard max-w-7xl */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 space-y-6">
        
        {/* ================= 1. LES 4 PILIERS DE RÉASSURANCE GLASSMORPHIC ================= */}
        <div className="grid grid-cols-4 gap-4 sm:gap-5">
          
          {/* Pilier 1 : Produits Authentiques */}
          <div className="bg-[#071328]/85 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 flex items-center gap-3.5 hover:border-amber-400/40 transition">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-400/80 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">
                Produits Authentiques
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Vendeurs certifiés & contrôlés à Dakar
              </p>
            </div>
          </div>

          {/* Pilier 2 : Livraison Express */}
          <div className="bg-[#071328]/85 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 flex items-center gap-3.5 hover:border-amber-400/40 transition">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-400/80 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-md">
              <Truck className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">
                Livraison Express 2h à 24h
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Dakar & dans les 14 régions du Sénégal
              </p>
            </div>
          </div>

          {/* Pilier 3 : Service Client 7j/7 */}
          <div className="bg-[#071328]/85 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 flex items-center gap-3.5 hover:border-amber-400/40 transition">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-400/80 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-md">
              <Headphones className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">
                Service Client 7j/7
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Assistance directe WhatsApp & Appel
              </p>
            </div>
          </div>

          {/* Pilier 4 : Paiements Sécurisés */}
          <div className="bg-[#071328]/85 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 flex items-center gap-3.5 hover:border-amber-400/40 transition">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-amber-400/80 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-md">
              <CreditCard className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">
                Paiements Sécurisés
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Wave, Orange Money & Cash à la livraison
              </p>
            </div>
          </div>

        </div>

        {/* ================= 2. BANDEAU CLUB PRIVILÈGE & NEWSLETTER WHATSAPP ================= */}
        <div className="relative w-full rounded-3xl border border-amber-400/70 bg-[#071328]/90 backdrop-blur-xl p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_0_35px_rgba(245,158,11,0.15)] overflow-hidden">
          
          {/* Gauche : Icône Enveloppe + Textes */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
              <Mail className="w-6 h-6 stroke-[2.5px]" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                Rejoignez le <span className="text-amber-400">Club Privilège Malick Buss</span>
              </h3>
              <p className="text-xs text-slate-300">
                Recevez nos ventes privées, codes promos et avantages exclusifs de Dakar en avant-première.
              </p>
            </div>
          </div>

          {/* Milieu : Devise manuscrite dorée avec drapeau */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
            <span className="font-serif italic font-extrabold text-amber-300 text-base drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
              Le Sénégal achète autrement !
            </span>
            <span className="text-lg">🇸🇳</span>
          </div>

          {/* Droite : Formulaire d'inscription rapide */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full lg:w-auto flex-shrink-0">
            <div className="relative w-full sm:w-80">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre adresse email ou numéro WhatsApp..."
                className="w-full bg-[#0a1832] text-xs text-white pl-10 pr-4 py-3 rounded-full border border-slate-700/80 focus:border-amber-400 focus:outline-none placeholder:text-slate-400 font-medium transition"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs px-6 py-3 rounded-full transition shadow-md flex items-center gap-1.5 flex-shrink-0"
            >
              <span>{newsletterSubscribed ? '✓ Inscrit !' : "S'inscrire"}</span>
              {!newsletterSubscribed && <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />}
            </button>
          </form>

        </div>

        {/* ================= 3. LES 4 COLONNES PRINCIPALES DU FOOTER ================= */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 border-b border-slate-800/80">
          
          {/* Colonne 1 : Logo MB & Coordonnées à Dakar */}
          <div className="space-y-4">
            <Link href="/" className="inline-block hover:opacity-90 transition">
              <BrandLogo size="md" variant="light" layout="horizontal" />
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed">
              Malick Buss est la plateforme e-commerce multi-boutiques de référence au Sénégal. Nous connectons les commerçants talentueux de Dakar avec des acheteurs exigeants dans tout le pays.
            </p>

            <div className="pt-1 text-xs space-y-2 text-slate-300">
              <p className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Avenue Léopold Sédar Senghor, Dakar Plateau</span>
              </p>
              <a
                href="https://wa.me/221771234567"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-emerald-400 transition"
              >
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+221 77 123 45 67 (WhatsApp & Appel)</span>
              </a>
              <a
                href="mailto:contact@malickbuss.sn"
                className="flex items-center gap-2.5 hover:text-sky-400 transition"
              >
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>contact@malickbuss.sn</span>
              </a>
            </div>

            {/* 4 Boutons Sociaux Cerclés */}
            <div className="pt-2 flex items-center gap-2.5 text-slate-300">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-slate-700/80 bg-white/5 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-slate-700/80 bg-white/5 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-slate-700/80 bg-white/5 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition text-xs font-bold"
                title="TikTok"
              >
                <span>♪</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-slate-700/80 bg-white/5 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center transition"
                title="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : ACHETER SUR MALICK BUSS */}
          <div className="space-y-3.5">
            <h4 className="font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400 stroke-[2.2px]" />
              <span>ACHETER SUR MALICK BUSS</span>
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/boutiques" className="hover:text-amber-400 transition flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Toutes nos boutiques vérifiées</span>
                </Link>
              </li>
              <li>
                <Link href="/boutiques?filter=promos" className="hover:text-amber-400 transition flex items-center justify-between group">
                  <span className="flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                    <span>Bons Plans & Promos Dakar</span>
                  </span>
                  <span className="text-[10px] bg-rose-500 text-white font-black px-2 py-0.5 rounded-full">
                    HOT 🔥
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/boutiques?category=Mode" className="hover:text-amber-400 transition flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Boutiques Mode & Bazin Riche</span>
                </Link>
              </li>
              <li>
                <Link href="/boutiques?category=Électronique" className="hover:text-amber-400 transition flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Boutiques High-Tech & Smartphones</span>
                </Link>
              </li>
              <li>
                <Link href="/suivre-commande" className="hover:text-amber-300 transition flex items-center gap-1.5 font-bold text-amber-400 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Suivre ma commande en direct</span>
                </Link>
              </li>
              <li>
                <Link href="/panier" className="hover:text-amber-400 transition flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Mon Panier d&apos;achat</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : ESPACE BOUTIQUIERS */}
          <div className="space-y-3.5">
            <h4 className="font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <Store className="w-4 h-4 text-amber-400 stroke-[2.2px]" />
              <span>ESPACE BOUTIQUIERS</span>
            </h4>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link
                  href="/vendeur/accueil"
                  className="hover:text-amber-300 transition font-bold text-amber-400 flex items-center justify-between group"
                >
                  <span className="flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                    <span>Ouvrir ma boutique en 2 min</span>
                  </span>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
                    0 FCFA
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/vendeur/dashboard" className="hover:text-amber-400 transition flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Tableau de bord Vendeur</span>
                </Link>
              </li>
              <li>
                <Link href="/vendeur/produits/ajouter" className="hover:text-amber-400 transition flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Ajouter de nouveaux articles</span>
                </Link>
              </li>
              <li>
                <Link href="/vendeur/retraits" className="hover:text-amber-400 transition flex items-center gap-1.5 group">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Commissions & Retraits Wave instantanés</span>
                </Link>
              </li>
              <li>
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Portail Administrateur</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : PAIEMENTS AGRÉÉS & ENCART VENDEUR */}
          <div className="space-y-4">
            <h4 className="font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400 stroke-[2.2px]" />
              <span>PAIEMENTS AGRÉÉS AU SÉNÉGAL</span>
            </h4>

            {/* Cartes de paiement Sénégal officielles & magnifiques : Wave, Orange Money, Cash, Free & Cartes */}
            <div className="grid grid-cols-2 gap-2">
              {/* 1. Wave Mobile Money */}
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#1DA1F2] to-[#0A85EA] text-white border border-sky-300/40 shadow-sm hover:border-white/60 transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="14" fill="#1DA1F2" />
                      <path d="M16 7C13.5 7 11.5 9 11.5 11.5v6c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5v-6C20.5 9 18.5 7 16 7z" fill="#0A2540" />
                      <path d="M16 12.5c-1.4 0-2.5 1.1-2.5 2.5v2.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V15c0-1.4-1.1-2.5-2.5-2.5z" fill="#FFFFFF" />
                      <path d="M16 11.5l-1.2 1.5h2.4L16 11.5z" fill="#FBBF24" />
                      <circle cx="14" cy="22.5" r="1.2" fill="#FBBF24" />
                      <circle cx="18" cy="22.5" r="1.2" fill="#FBBF24" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-xs tracking-tight text-white">Wave</span>
                    <span className="text-[8px] font-black uppercase bg-white/20 px-1 py-0.2 rounded text-white leading-none">
                      0%
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-semibold text-sky-100 block truncate">
                  Instantané • 0 Frais
                </span>
              </div>

              {/* 2. Orange Money */}
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#1c1917] to-[#0c0a09] text-white border border-[#FF7900]/50 shadow-sm hover:border-[#FF7900] transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md bg-[#FF7900] flex items-center justify-center shrink-0 shadow-xs">
                    <span className="font-black text-[10px] text-white tracking-tighter">OM</span>
                  </div>
                  <span className="font-extrabold text-xs text-white tracking-tight truncate">
                    Orange Money
                  </span>
                </div>
                <span className="text-[9px] font-semibold text-amber-200/90 block truncate">
                  Max it • Sécurisé
                </span>
              </div>

              {/* 3. Cash à la livraison */}
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#064e3b] to-[#022c22] text-white border border-emerald-400/50 shadow-sm hover:border-emerald-300 transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
                    <Banknote className="w-3.5 h-3.5 stroke-[2.2px]" />
                  </div>
                  <span className="font-extrabold text-xs text-emerald-200 tracking-tight">
                    CASH
                  </span>
                </div>
                <span className="text-[9px] font-semibold text-emerald-100/90 block truncate">
                  À la livraison • 0 Avance
                </span>
              </div>

              {/* 4. Free Money & Cartes Bancaires */}
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#18181b] to-[#09090b] text-white border border-slate-700 hover:border-slate-500 transition-all group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center shrink-0 shadow-xs">
                    <span className="font-serif italic font-black text-[10px] text-white">free</span>
                  </div>
                  <div className="flex items-center -space-x-1">
                    <div className="w-3 h-3 rounded-full bg-[#EB001B]" />
                    <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-80" />
                  </div>
                </div>
                <span className="text-[9px] font-semibold text-slate-300 block truncate">
                  Free & Cartes Bancaires
                </span>
              </div>
            </div>

            {/* Sceau de réassurance BCEAO */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Paiements 100% sécurisés</span>
              </span>
              <span className="text-slate-400 font-semibold">• Agréé BCEAO</span>
            </div>

            {/* Encart Vendeur Prestige Or */}
            <div className="p-4 rounded-2xl bg-[#091834]/85 border-2 border-amber-400/80 text-xs space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-white font-black text-xs">
                <Truck className="w-4 h-4 text-amber-400 stroke-[2.5px]" />
                <span>
                  Vous <span className="text-amber-400">vendez des produits ?</span>
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-snug">
                Exposez vos articles auprès de milliers de clients à Dakar. Encaissez directement par Wave.
              </p>

              <Link
                href="/vendeur/accueil"
                className="w-full mt-1 py-2 px-4 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition shadow-md shadow-amber-500/20"
              >
                <span>Commencer à vendre</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
              </Link>
            </div>
          </div>

        </div>

        {/* ================= 4. BAS DE PAGE (COPYRIGHT & SLOGAN) ================= */}
        <div className="pt-2 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2025 Malick Buss. Tous droits réservés.</span>
            <span>|</span>
            <span className="text-amber-300 flex items-center gap-1 font-medium">
              Le Sénégal achète autrement ! 💛
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link href="/conditions" className="hover:text-amber-400 transition">
              Conditions Générales
            </Link>
            <span>•</span>
            <Link href="/confidentialite" className="hover:text-amber-400 transition">
              Politique de Confidentialité
            </Link>
          </div>
        </div>

      </div>

    </footer>
  );
}
