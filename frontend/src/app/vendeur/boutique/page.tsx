'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  Share2,
  Edit3,
  Star,
  CreditCard,
  Truck,
  Settings,
  ChevronRight,
  ExternalLink,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Camera,
  CheckCircle2,
  Award,
  Crown,
} from 'lucide-react';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';

export default function VendorShopProfilePage() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://malickbuss.sn/boutiques/style-and-mode/produits');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <VendorPortalShell
      title="Ma Boutique Vitrine"
      subtitle="Personnalisez la vitrine publique vue par les clients de Dakar et du Sénégal."
      breadcrumbs={[{ label: 'Ma Boutique' }]}
      actionElement={
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Lien copié !' : 'Partager'}</span>
          </button>
          <Link
            href="/boutiques/style-and-mode/produits"
            target="_blank"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2 rounded-full transition shadow-xs flex items-center gap-1.5 active:scale-95"
          >
            <ExternalLink className="w-4 h-4 stroke-[2.2px]" />
            <span>Voir ma vitrine client</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* ================= 1. COUVERTURE ET HEADER DE BOUTIQUE ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs">
          {/* Bannière de Couverture HD */}
          <div className="relative h-44 sm:h-60 w-full overflow-hidden bg-slate-900">
            <img
              src="/images/boutiques/cover_style_mode.jpg"
              alt="Couverture Style & Mode"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            <button
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-bold text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 border border-white/20 transition shadow-sm"
              title="Changer l'image de couverture"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Changer la couverture</span>
            </button>
          </div>

          {/* Profil et Infos Boutique */}
          <div className="p-6 sm:p-8 -mt-12 sm:-mt-16 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Logo / Monogramme */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-4 border-white shadow-xl bg-slate-950 text-white flex flex-col items-center justify-center overflow-hidden flex-shrink-0">
                  <Crown className="w-6 h-6 text-amber-400 fill-amber-400 mb-0.5" />
                  <span className="font-black text-xl tracking-tight">SM</span>
                </div>
              </div>

              {/* Titre & Statuts */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Style & Mode
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En Ligne & Vérifié
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                    👑 Sponsorisé VIP
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  Prêt-à-porter de luxe, Getzner Bazin Riche brodé, sneakers originales & maroquinerie.
                </p>

                <p className="text-xs text-slate-400 flex items-center gap-3 pt-1">
                  <span className="flex items-center gap-1 text-slate-600 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    Dakar, Avenue Ponty (Plateau)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-600 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    +221 77 123 45 67
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="https://wa.me/221771234567"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs px-4 py-2.5 rounded-full transition flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Client</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= 2. 3 CARTES STATS DE LA BOUTIQUE ================= */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">124</span>
            <span className="text-xs font-semibold text-slate-500 block mt-1">Produits publiés</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">2.4K</span>
            <span className="text-xs font-semibold text-slate-500 block mt-1">Abonnés fidèles</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center justify-center gap-1">
              <span>4,9</span>
              <span className="text-amber-400 text-xl">★</span>
            </div>
            <span className="text-xs font-semibold text-slate-500 block mt-1">1 240 avis vérifiés</span>
          </div>
        </div>

        {/* ================= 3. PARAMÈTRES COMMERCIAUX DE LA BOUTIQUE ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-5">
          <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
            <Settings className="w-4 h-4 text-amber-500" />
            <span>Configuration commerciale de la boutique</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Horaires de la boutique</span>
              <p className="font-bold text-slate-900">Du Lundi au Samedi : 09h00 - 20h30</p>
              <p className="text-slate-500 text-[11px]">Dimanche : Sur rendez-vous et commandes en ligne</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Zone de livraison</span>
              <p className="font-bold text-slate-900">Dakar Express 24h & Banlieue</p>
              <p className="text-slate-500 text-[11px]">Envois régionaux (Thiès, Saint-Louis, Mbour, Touba...)</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Paiements acceptés</span>
              <p className="font-bold text-slate-900">Wave Sénégal, Orange Money & Espèces à la livraison</p>
              <p className="text-slate-500 text-[11px]">Garantie de paiement sécurisé Malick Buss</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Politique d'échange</span>
              <p className="font-bold text-slate-900">Échange sous 48h en cas de problème de taille</p>
              <p className="text-slate-500 text-[11px]">Article non porté avec étiquette d'origine</p>
            </div>
          </div>
        </div>
      </div>
    </VendorPortalShell>
  );
}
