'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Store,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  ExternalLink,
  ChevronRight,
  Heart,
  Globe,
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export function DesktopFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 3500);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="hidden md:block bg-gradient-to-b from-[#0b101d] via-[#070b14] to-[#03050a] text-slate-300 border-t border-slate-800/80 mt-16 font-sans relative overflow-hidden">
      
      {/* Filet lumineux dégradé or & émeraude en haut du footer */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/60 to-emerald-400/60" />

      {/* Orbes de lumière tamisée en arrière-plan */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* ================= 1. BANDEAU DES 4 PILIERS DE CONFIANCE (CARTES EN VERRE) ================= */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 gap-6">
          
          {/* Pilier 1 */}
          <div className="group p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-amber-400/30 transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/30 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-amber-500/10">
              <ShieldCheck className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white group-hover:text-amber-400 transition-colors">
                Produits Authentiques
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Vendeurs certifiés & contrôlés à Dakar
              </p>
            </div>
          </div>

          {/* Pilier 2 */}
          <div className="group p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-emerald-400/30 transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/10">
              <Truck className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white group-hover:text-emerald-400 transition-colors">
                Livraison Express 2h à 24h
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Dakar & dans les 14 régions du Sénégal
              </p>
            </div>
          </div>

          {/* Pilier 3 */}
          <div className="group p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-sky-400/30 transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-sky-600/10 border border-sky-400/30 text-sky-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-sky-500/10">
              <Headphones className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white group-hover:text-sky-400 transition-colors">
                Service Client 7j/7
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Assistance directe WhatsApp & Appel
              </p>
            </div>
          </div>

          {/* Pilier 4 */}
          <div className="group p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-purple-400/30 transition-all flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/30 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg shadow-purple-500/10">
              <CreditCard className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white group-hover:text-purple-400 transition-colors">
                Paiements Sécurisés
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Wave, Orange Money & Cash à la livraison
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= 2. BANDEAU CLUB PRIVILÈGE & NEWSLETTER WHATSAPP ================= */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-amber-500/10 via-slate-900/60 to-emerald-500/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white tracking-tight">
                Rejoignez le Club Privilège Malick Buss
              </h3>
              <p className="text-xs text-slate-400">
                Recevez nos ventes privées, codes promos et arrivages de Dakar en avant-première.
              </p>
            </div>
          </div>

          {/* Formulaire d'inscription rapide */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre adresse email ou numéro WhatsApp..."
                className="w-full bg-slate-950/80 text-xs text-white pl-4 pr-3 py-2.5 rounded-full border border-slate-700 focus:border-amber-400 focus:outline-none transition placeholder:text-slate-500 font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs transition shadow-md flex items-center gap-1.5 flex-shrink-0"
            >
              <span>{newsletterSubscribed ? '✓ Inscrit !' : "S'inscrire"}</span>
              {!newsletterSubscribed && <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />}
            </button>
          </form>
        </div>
      </div>

      {/* ================= 3. LIENS PRINCIPAUX DU FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Colonne 1 : À Propos & Identité Teranga */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <BrandLogo size="md" variant="light" />
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Malick Buss est la plateforme e-commerce multi-boutiques de référence au Sénégal.
            Nous connectons les commerçants talentueux de Dakar avec des acheteurs exigeants dans tout le pays.
          </p>

          <div className="pt-2 text-xs space-y-2 text-slate-400">
            <p className="flex items-center gap-2.5 hover:text-white transition">
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

          {/* Réseaux sociaux */}
          <div className="pt-2 flex items-center gap-2 text-slate-400">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-rose-500 hover:text-white transition flex items-center justify-center"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/221771234567"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-emerald-600 hover:text-white transition flex items-center justify-center"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Colonne 2 : Univers Marchands & Acheter */}
        <div className="space-y-3.5">
          <h4 className="font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Acheter sur Malick Buss</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link href="/boutiques" className="hover:text-amber-400 transition flex items-center justify-between group">
                <span>Toutes nos boutiques vérifiées</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-amber-400 transition flex items-center justify-between group">
                <span>Grands rayons & univers</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">6 rayons</span>
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-amber-400 transition">
                Mode, Friperie & Bazin Riche
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-amber-400 transition">
                Électronique, iPhones & High-Tech
              </Link>
            </li>
            <li>
              <Link href="/suivre-commande" className="hover:text-amber-400 transition flex items-center gap-1.5 text-amber-300 font-semibold">
                <Truck className="w-3.5 h-3.5" />
                <span>Suivre ma commande en direct</span>
              </Link>
            </li>
            <li>
              <Link href="/panier" className="hover:text-amber-400 transition">
                Mon Panier d'achat
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Espace Commerçants & Vendeurs */}
        <div className="space-y-3.5">
          <h4 className="font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Espace Boutiquiers</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link
                href="/vendeur/accueil"
                className="hover:text-amber-400 transition font-bold text-amber-300 flex items-center justify-between group"
              >
                <span>Ouvrir ma boutique en 2 min</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-black px-2 py-0.5 rounded-full">0 FCFA</span>
              </Link>
            </li>
            <li>
              <Link href="/vendeur/dashboard" className="hover:text-amber-400 transition">
                Tableau de bord Vendeur
              </Link>
            </li>
            <li>
              <Link href="/vendeur/produits/ajouter" className="hover:text-amber-400 transition">
                Ajouter de nouveaux articles
              </Link>
            </li>
            <li>
              <Link href="/vendeur/commissions" className="hover:text-amber-400 transition">
                Commissions & Retraits Wave instantanés
              </Link>
            </li>
            <li>
              <Link href="/vendeur/galerie" className="hover:text-amber-400 transition flex items-center gap-1.5 text-sky-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Galerie des 19 Écrans Figma</span>
              </Link>
            </li>
            <li>
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition flex items-center gap-1"
              >
                <span>Portail Administrateur</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 4 : Paiement Agréé & Carte Marchand Prestige */}
        <div className="space-y-4">
          <h4 className="font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Paiements Agréés au Sénégal</span>
          </h4>

          {/* Badges de paiement réalistes et élégants */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-xl bg-[#00a8e8]/15 border border-[#00a8e8]/40 text-center">
              <span className="font-black text-[11px] text-[#38bdf8] block">WAVE</span>
              <span className="text-[9px] text-slate-400">Frais 1%</span>
            </div>
            <div className="p-2 rounded-xl bg-[#ff6600]/15 border border-[#ff6600]/40 text-center">
              <span className="font-black text-[11px] text-[#fb923c] block">ORANGE</span>
              <span className="text-[9px] text-slate-400">OM Money</span>
            </div>
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-center">
              <span className="font-black text-[11px] text-emerald-400 block">CASH</span>
              <span className="text-[9px] text-slate-400">À la livraison</span>
            </div>
          </div>

          {/* Carte Marchand Or Flottante */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/40 border border-amber-400/30 text-xs space-y-2.5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
              <Store className="w-4 h-4" />
              <span>Vous vendez des produits ?</span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              Exposez vos articles auprès de milliers de clients à Dakar. Encaissez directement par Wave.
            </p>

            <Link
              href="/vendeur/accueil"
              className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition shadow-md shadow-amber-500/20"
            >
              <span>Commencer à vendre</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
            </Link>
          </div>
        </div>

      </div>

      {/* ================= 4. BAS DE PAGE (COPYRIGHT & SÉCURITÉ DÉGAGÉ POUR LE BOUTON MAQUETTES) ================= */}
      <div className="border-t border-slate-800/80 py-6 text-xs text-slate-500 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <span>© 2026 Malick Buss. Tous droits réservés.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              Conçu avec fierté pour le Sénégal 🇸🇳
            </span>
          </div>

          {/* Espace réservé à droite avec padding-right pour ne pas heurter le widget flottant */}
          <div className="flex items-center gap-5 text-slate-400 text-[11px] pr-0 lg:pr-48">
            <Link href="/" className="hover:text-white hover:underline transition">
              Conditions d'utilisation
            </Link>
            <Link href="/" className="hover:text-white hover:underline transition">
              Politique de confidentialité
            </Link>
            <Link href="/vendeur/dashboard" className="text-amber-400 hover:text-amber-300 font-bold transition">
              Espace Boutiquier
            </Link>
          </div>

        </div>
      </div>

    </footer>
  );
}
