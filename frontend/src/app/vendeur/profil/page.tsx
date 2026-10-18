'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Check,
  AlertCircle,
  Upload,
} from 'lucide-react';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';
import { getVendorProfile, saveVendorProfile, VendorProfile } from '../../../services/vendorProfileStore';
import { uploadImageToCloudinary } from '../../../services/cloudinaryService';

export default function VendorProfilePage() {
  const [profile, setProfile] = useState<VendorProfile>(getVendorProfile());
  const [activeModal, setActiveModal] = useState<'info' | 'security' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states for profile editing
  const [editName, setEditName] = useState(profile.name);
  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editShopName, setEditShopName] = useState(profile.shopName);
  const [editAddress, setEditAddress] = useState(profile.address);
  const [editDistrict, setEditDistrict] = useState(profile.district);

  // Form states for security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState(false);

  // Notification toggles
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);

  useEffect(() => {
    const syncProfile = () => {
      const p = getVendorProfile();
      setProfile(p);
      setEditName(p.name);
      setEditPhone(p.phone);
      setEditEmail(p.email);
      setEditShopName(p.shopName);
      setEditAddress(p.address);
      setEditDistrict(p.district);
    };

    syncProfile();
    window.addEventListener('malick_profile_updated', syncProfile);
    return () => window.removeEventListener('malick_profile_updated', syncProfile);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editPhone.trim()) {
      showToast('⚠️ Veuillez renseigner au moins le nom et le téléphone.');
      return;
    }

    const updated = saveVendorProfile({
      name: editName.trim(),
      phone: editPhone.trim(),
      email: editEmail.trim(),
      shopName: editShopName.trim(),
      address: editAddress.trim(),
      district: editDistrict.trim(),
    });

    setProfile(updated);
    setActiveModal(null);
    showToast('✅ Coordonnées et boutique mises à jour avec succès !');
  };

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    try {
      const res = await uploadImageToCloudinary(file);
      const updated = saveVendorProfile({ avatarUrl: res.url });
      setProfile(updated);
      showToast('✅ Photo de profil actualisée avec succès !');
    } catch (err) {
      showToast('❌ Erreur lors du téléversement de la photo.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('⚠️ Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('⚠️ Les deux mots de passe ne correspondent pas.');
      return;
    }

    setSecuritySuccess(true);
    setTimeout(() => {
      setSecuritySuccess(false);
      setActiveModal(null);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('🔒 Mot de passe modifié et sécurisé avec succès !');
    }, 1000);
  };

  return (
    <VendorPortalShell
      title="Profil & Paramètres"
      subtitle="Gérez vos identifiants, votre statut commerçant certifié et la sécurité de votre compte."
      breadcrumbs={[{ label: 'Profil' }]}
    >
      <div className="space-y-6">
        {/* Toast Notif */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-[#071328] text-amber-400 font-bold px-4 py-3 rounded-2xl shadow-2xl border border-amber-400/40 text-xs flex items-center gap-2 animate-in slide-in-from-top">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Input fichier caché pour l'avatar */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarFile}
        />

        {/* Alerte si boutique non vérifiée */}
        {!profile.isVerified && (
          <div className="rounded-3xl border-2 border-amber-400 bg-amber-50/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 font-bold">
                <AlertCircle className="w-5 h-5 stroke-[2.3px]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Boutique en attente de vérification</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Votre boutique &ldquo;{profile.shopName}&rdquo; a été soumise au Super Admin. Contactez directement l&apos;équipe au <strong>+221 77 171 90 13</strong> sur WhatsApp pour accélérer l&apos;approbation.
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/221771719013?text=${encodeURIComponent(
                `Bonjour Super Admin Malick Buss, je viens de créer ma boutique "${profile.shopName}" (Commerçant: ${profile.name}). Pouvez-vous vérifier et valider ma boutique s'il vous plaît ? Merci !`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition active:scale-95 flex-shrink-0"
            >
              <span>Relancer sur WhatsApp</span>
            </a>
          </div>
        )}

        {/* ================= 1. CARTE PROFIL VENDEUR PRESTIGE ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-100 border-4 border-amber-400 shadow-md">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 text-amber-400 flex items-center justify-center font-black text-2xl">
                      {profile.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  {uploadingAvatar && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[10px] font-bold">
                      Chargement...
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute bottom-0 right-0 p-2 bg-slate-900 text-amber-400 rounded-full border-2 border-white shadow-xs hover:scale-105 active:scale-95 transition"
                  title="Changer de photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {profile.name}
                  </h2>
                  {profile.isVerified ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                  ) : (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      En attente 🟡
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-2 flex-wrap">
                  <span>Gérant Principal</span>
                  <span>•</span>
                  <span className="font-bold text-slate-800">{profile.shopName}</span>
                  <span>•</span>
                  <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 inline-flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {profile.badge}
                  </span>
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-3 pt-1 flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" /> {profile.address || profile.district}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-emerald-600" /> {profile.phone}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setActiveModal('info')}
                className="flex-1 sm:flex-initial bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs px-5 py-2.5 rounded-full transition shadow-xs active:scale-95"
              >
                Modifier mes infos
              </button>
              <Link
                href={`/boutiques/${profile.shopSlug || 'style-and-mode'}/produits`}
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
            {profile.isVerified ? (
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">✓ Statut active</span>
            ) : (
              <span className="text-[11px] text-amber-600 font-semibold block mt-1">⏳ En attente Super Admin</span>
            )}
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Solde disponible</span>
            <div className="text-2xl font-black text-emerald-600 mt-2">58 000 FCFA</div>
            <Link href="/vendeur/retraits" className="text-[11px] text-amber-600 font-bold block mt-1 hover:underline">
              Demander retrait Wave →
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Note de confiance</span>
            <div className="text-2xl font-black text-slate-900 mt-2 flex items-center gap-1">
              <span>{profile.rating}</span>
              <span className="text-amber-400 text-xl">★</span>
            </div>
            <span className="text-[11px] text-slate-500 block mt-1">{profile.reviewsCount} avis certifiés</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Abonnés Boutique</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{profile.followersCount}</div>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">+14% ce mois-ci</span>
          </div>
        </div>

        {/* ================= 3. PARAMÈTRES ET CONFIGURATION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloc Coordonnées & Sécurité */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Sécurité & Accès</span>
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Email de connexion</p>
                  <p className="text-slate-500 text-[11px]">{profile.email}</p>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Vérifié
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Numéro Mobile Money (Wave / OM)</p>
                  <p className="text-slate-500 text-[11px]">{profile.phone}</p>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Certifié
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Mot de passe</p>
                  <p className="text-slate-500 text-[11px]">Dernière modification il y a 3 semaines</p>
                </div>
                <button
                  onClick={() => setActiveModal('security')}
                  className="font-bold text-amber-600 hover:text-amber-700 hover:underline"
                >
                  Changer
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Authentification à 2 facteurs (2FA)</p>
                  <p className="text-slate-500 text-[11px]">Code SMS lors des retraits Wave</p>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Bloc Préférences de Notification */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <span>Canaux de Notifications Commandes</span>
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Alertes WhatsApp Instantanées</p>
                  <p className="text-slate-500 text-[11px]">Notification directe dès qu'un client passe commande</p>
                </div>
                <button
                  onClick={() => {
                    setNotifyWhatsapp(!notifyWhatsapp);
                    showToast(notifyWhatsapp ? 'WhatsApp désactivé' : 'WhatsApp activé');
                  }}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                    notifyWhatsapp ? 'bg-emerald-500 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Notifications SMS</p>
                  <p className="text-slate-500 text-[11px]">Envoi de code de validation retrait mobile</p>
                </div>
                <button
                  onClick={() => {
                    setNotifySms(!notifySms);
                    showToast(notifySms ? 'SMS désactivé' : 'SMS activé');
                  }}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                    notifySms ? 'bg-emerald-500 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                </button>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Rapports Financiers par Email</p>
                  <p className="text-slate-500 text-[11px]">Synthèse hebdomadaire des ventes et commissions</p>
                </div>
                <button
                  onClick={() => {
                    setNotifyEmail(!notifyEmail);
                    showToast(notifyEmail ? 'Email désactivé' : 'Email activé');
                  }}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                    notifyEmail ? 'bg-emerald-500 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                </button>
              </div>
            </div>
          </div>

          {/* Bloc Raccourcis Boutique & Déconnexion */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-2xs space-y-4 flex flex-col justify-between md:col-span-2">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-500" />
                <span>Gestion de l'Enseigne & Support</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <Link
                  href="/vendeur/boutique"
                  className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 flex items-center justify-between transition"
                >
                  <div>
                    <p className="font-bold text-slate-800">Personnaliser ma vitrine</p>
                    <p className="text-slate-500 text-[11px]">Bannière, logo, horaires, description</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/vendeur/support"
                  className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 flex items-center justify-between transition"
                >
                  <div>
                    <p className="font-bold text-slate-800">Assistance Vendeur Malick Buss</p>
                    <p className="text-slate-500 text-[11px]">Support WhatsApp 24/7 et conseillers locaux</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/vendeur/accueil"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter de l'Espace Boutiquier</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL INFORMATIONS PERSONNELLES (ÉDITABLE) ================= */}
      {activeModal === 'info' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Modifier mes coordonnées</h3>
                <p className="text-xs text-slate-500">Mettez à jour les informations visibles sur votre profil</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInfo} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nom & Prénom du Gérant *</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nom de la Boutique *</label>
                <input
                  type="text"
                  value={editShopName}
                  onChange={(e) => setEditShopName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Numéro WhatsApp & Wave *</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Professionnel</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Quartier & Adresse à Dakar</label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  placeholder="Ex: Dakar Plateau • Sandaga"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-3 px-4 rounded-full border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black py-3 px-4 rounded-full shadow-md shadow-amber-500/20 active:scale-95 transition"
                >
                  Enregistrer
                </button>
              </div>
            </form>
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

            <form onSubmit={handleSaveSecurity} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mot de passe actuel</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nouveau mot de passe</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  placeholder="Min. 6 caractères"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Confirmer le nouveau mot de passe</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  placeholder="Répétez le mot de passe"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={securitySuccess}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black py-3 rounded-full transition shadow-md shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  {securitySuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" />
                      <span>Mot de passe enregistré !</span>
                    </>
                  ) : (
                    <span>Enregistrer le mot de passe</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </VendorPortalShell>
  );
}
