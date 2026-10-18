'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Shield,
  Bell,
  LogOut,
  Store,
  Wallet,
  ChevronRight,
  Award,
  CheckCircle2,
  X,
  CreditCard,
  Lock,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';

export default function VendorProfilePage() {
  const [activeModal, setActiveModal] = useState<'info' | 'security' | null>(null);

  return (
    <VendorPortalShell
      title="Profil & Paramètres"
      subtitle="Gérez vos identifiants, votre statut commerçant certifié et la sécurité de votre compte."
      breadcrumbs={[{ label: 'Profil' }]}
    >
      <div className="space-y-6">
        {/* ================= 1. CARTE PROFIL VENDEUR PRESTIGE ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-100 border-4 border-amber-400 shadow-md">
                  <img
                    src="/images/mockup/vendor_man_clean.jpg"
                    alt="Malick Diop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  className="absolute bottom-0 right-0 p-1.5 bg-slate-900 text-amber-400 rounded-full border-2 border-white shadow-xs hover:scale-105 transition"
                  title="Changer de photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Malick Diop
                  </h2>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                  <span>Gérant Principal</span>
                  <span>•</span>
                  <span className="font-bold text-slate-800">Style & Mode</span>
                  <span>•</span>
                  <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 inline-flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Vendeur Vérifié Or
                  </span>
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-3 pt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Dakar, Plateau</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +221 77 123 45 67</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setActiveModal('info')}
                className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs px-4 py-2.5 rounded-full transition shadow-xs"
              >
                Modifier mes infos
              </button>
              <Link
                href="/boutiques/style-and-mode/produits"
                target="_blank"
                className="flex-1 sm:flex-initial bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60 font-bold text-xs px-4 py-2.5 rounded-full transition flex items-center justify-center gap-1.5"
              >
                <span>Ma vitrine</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================= 2. 4 CARTES KPI VENDEUR ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Boutiques gérées</span>
            <div className="text-2xl font-black text-slate-900 mt-2">1 boutique</div>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">✓ Statut active</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Solde disponible</span>
            <div className="text-2xl font-black text-emerald-600 mt-2">28 750 FCFA</div>
            <Link href="/vendeur/retraits" className="text-[11px] text-amber-600 font-bold block mt-1 hover:underline">
              Demander un retrait →
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Note de la boutique</span>
            <div className="text-2xl font-black text-slate-900 mt-2 flex items-center gap-1">
              <span>4,9</span>
              <span className="text-amber-400 text-lg">★</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">Sur 1 240 avis clients</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Taux de réponse</span>
            <div className="text-2xl font-black text-slate-900 mt-2">99 %</div>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Réponse en moins de 15 min</span>
          </div>
        </div>

        {/* ================= 3. GRILLE DE PARAMÈTRES ET CONFIGURATION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Bloc Compte & Sécurité */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Sécurité & Accès</span>
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              <div
                onClick={() => setActiveModal('info')}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition"
              >
                <div>
                  <p className="font-bold text-slate-800">Mes coordonnées commerciales</p>
                  <p className="text-slate-500 text-[11px]">Nom, numéro Wave/OM, adresse</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => setActiveModal('security')}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition"
              >
                <div>
                  <p className="font-bold text-slate-800">Mot de passe & Double Authentification</p>
                  <p className="text-slate-500 text-[11px]">Protégez vos encaissements et retraits</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <Link
                href="/vendeur/notifications"
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition"
              >
                <div>
                  <p className="font-bold text-slate-800">Préférences de notifications</p>
                  <p className="text-slate-500 text-[11px]">Alertes commandes SMS, WhatsApp, Web</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Bloc Raccourcis Boutique & Déconnexion */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-500" />
                <span>Gestion de l'Enseigne</span>
              </h3>

              <div className="divide-y divide-slate-100 text-xs">
                <Link
                  href="/vendeur/boutique"
                  className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition"
                >
                  <div>
                    <p className="font-bold text-slate-800">Personnaliser ma vitrine</p>
                    <p className="text-slate-500 text-[11px]">Bannière, logo, horaires, description</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/vendeur/support"
                  className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition"
                >
                  <div>
                    <p className="font-bold text-slate-800">Assistance Vendeur Malick Buss</p>
                    <p className="text-slate-500 text-[11px]">Support technique et accompagnement vente</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/vendeur/connexion"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter de l'Espace Boutiquier</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL INFORMATIONS PERSONNELLES ================= */}
      {activeModal === 'info' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Coordonnées du Vendeur</h3>
                <p className="text-xs text-slate-500">Informations certifiées de votre compte</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-black block">Nom & Prénom</span>
                <span className="font-bold text-slate-900 text-sm">Malick Diop</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-black block">Téléphone Mobile Money</span>
                <span className="font-bold text-slate-900 text-sm">+221 77 123 45 67 (Wave & Orange Money)</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-black block">Adresse Email</span>
                <span className="font-bold text-slate-900 text-sm">malick.diop@malickbuss.sn</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 uppercase font-black block">Boutique</span>
                <span className="font-bold text-slate-900 text-sm">Style & Mode • Dakar Plateau</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full bg-[#0c1527] hover:bg-slate-900 text-amber-400 font-bold py-3 rounded-full text-xs transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL SÉCURITÉ ================= */}
      {activeModal === 'security' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Sécurité du Compte</h3>
                <p className="text-xs text-slate-500">Mettre à jour le mot de passe</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setActiveModal(null);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Mot de passe actuel</label>
                <input
                  type="password"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nouveau mot de passe</label>
                <input
                  type="password"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black py-3 rounded-full text-xs transition shadow-md shadow-amber-500/20"
              >
                Enregistrer le mot de passe
              </button>
            </form>
          </div>
        </div>
      )}
    </VendorPortalShell>
  );
}
