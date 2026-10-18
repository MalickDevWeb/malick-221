'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Sparkles,
  X,
  Upload,
} from 'lucide-react';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';
import { getVendorProfile, saveVendorProfile, VendorProfile } from '../../../services/vendorProfileStore';
import { getVendorProducts } from '../../../services/productStore';
import { uploadImageToCloudinary } from '../../../services/cloudinaryService';

export default function VendorShopProfilePage() {
  const [profile, setProfile] = useState<VendorProfile>(getVendorProfile());
  const [copied, setCopied] = useState(false);
  const [prodCount, setProdCount] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [shopName, setShopName] = useState(profile.shopName);
  const [description, setDescription] = useState(profile.description);
  const [address, setAddress] = useState(profile.address);
  const [phone, setPhone] = useState(profile.phone);
  const [openingHours, setOpeningHours] = useState(profile.openingHours);
  const [deliveryZones, setDeliveryZones] = useState(profile.deliveryZones);
  const [paymentMethods, setPaymentMethods] = useState(profile.paymentMethods);
  const [returnPolicy, setReturnPolicy] = useState(profile.returnPolicy);

  useEffect(() => {
    const sync = () => {
      const p = getVendorProfile();
      setProfile(p);
      setShopName(p.shopName);
      setDescription(p.description);
      setAddress(p.address);
      setPhone(p.phone);
      setOpeningHours(p.openingHours);
      setDeliveryZones(p.deliveryZones);
      setPaymentMethods(p.paymentMethods);
      setReturnPolicy(p.returnPolicy);

      const prods = getVendorProducts();
      setProdCount(prods.length);
    };

    sync();
    window.addEventListener('malick_profile_updated', sync);
    window.addEventListener('malick_products_updated', sync);
    return () => {
      window.removeEventListener('malick_profile_updated', sync);
      window.removeEventListener('malick_products_updated', sync);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`https://malickbuss.sn/boutiques/${profile.shopSlug}/produits`);
      setCopied(true);
      showToast('🔗 Lien de votre boutique copié dans le presse-papier !');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveShopSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopName.trim()) {
      showToast('⚠️ Le nom de la boutique est requis.');
      return;
    }

    const updated = saveVendorProfile({
      shopName: shopName.trim(),
      description: description.trim(),
      address: address.trim(),
      phone: phone.trim(),
      openingHours: openingHours.trim(),
      deliveryZones: deliveryZones.trim(),
      paymentMethods: paymentMethods.trim(),
      returnPolicy: returnPolicy.trim(),
    });

    setProfile(updated);
    setEditModal(false);
    showToast('✅ Paramètres de la vitrine enregistrés avec succès !');
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const res = await uploadImageToCloudinary(file);
      const updated = saveVendorProfile({ coverUrl: res.url });
      setProfile(updated);
      showToast('✅ Bannière de couverture mise à jour !');
    } catch (err) {
      showToast('❌ Erreur lors du téléversement de la bannière.');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const res = await uploadImageToCloudinary(file);
      const updated = saveVendorProfile({ avatarUrl: res.url });
      setProfile(updated);
      showToast('✅ Logo de la boutique mis à jour !');
    } catch (err) {
      showToast('❌ Erreur lors du téléversement du logo.');
    } finally {
      setUploadingLogo(false);
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
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition active:scale-95 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Lien copié !' : 'Partager'}</span>
          </button>
          <button
            onClick={() => setEditModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs px-3.5 py-2 rounded-full transition shadow-xs flex items-center gap-1.5 active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modifier la vitrine</span>
          </button>
          <Link
            href={`/boutiques/${profile.shopSlug || 'style-and-mode'}/produits`}
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
        {/* Toast Notif */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-[#071328] text-amber-400 font-bold px-4 py-3 rounded-2xl shadow-2xl border border-amber-400/40 text-xs flex items-center gap-2 animate-in slide-in-from-top">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Inputs de fichiers cachés */}
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverUpload}
        />
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoUpload}
        />

        {/* ================= 1. COUVERTURE ET HEADER DE BOUTIQUE ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs">
          {/* Bannière de Couverture HD */}
          <div className="relative h-44 sm:h-60 w-full overflow-hidden bg-slate-900">
            {profile.coverUrl ? (
              <img
                src={profile.coverUrl}
                alt={profile.shopName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-[#071328] via-[#0c1a35] to-[#071328] flex items-center justify-center text-amber-400 font-black text-xl">
                {profile.shopName}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            <button
              onClick={() => coverInputRef.current?.click()}
              disabled={uploadingCover}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-bold text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 border border-white/20 transition shadow-sm active:scale-95"
              title="Changer l'image de couverture"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{uploadingCover ? 'Téléversement...' : 'Changer la couverture'}</span>
            </button>
          </div>

          {/* Profil et Infos Boutique */}
          <div className="p-6 sm:p-8 -mt-12 sm:-mt-16 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              {/* Logo / Monogramme */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-4 border-white shadow-xl bg-slate-950 text-white flex flex-col items-center justify-center overflow-hidden flex-shrink-0">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.shopName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Crown className="w-6 h-6 text-amber-400 fill-amber-400 mb-0.5" />
                      <span className="font-black text-xl tracking-tight">
                        {profile.shopName.substring(0, 2).toUpperCase()}
                      </span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => logoInputRef.current?.click()}
                  disabled={uploadingLogo}
                  className="absolute bottom-1 right-1 p-2 bg-slate-900 text-amber-400 rounded-full border-2 border-white shadow-md hover:scale-105 active:scale-95 transition"
                  title="Changer le logo de la boutique"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              {/* Titre & Statuts */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {profile.shopName}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    En Ligne & Vérifié
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                    👑 Sponsorisé VIP
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium max-w-2xl leading-relaxed">
                  {profile.description}
                </p>

                <p className="text-xs text-slate-400 flex items-center gap-3 pt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-slate-600 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    {profile.address || profile.district}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-600 font-semibold">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {profile.phone}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/${profile.phone.replace(/[\s\-\+]/g, '')}`}
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
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">{prodCount || 28}</span>
            <span className="text-xs font-semibold text-slate-500 block mt-1">Produits publiés</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 block">{profile.followersCount}</span>
            <span className="text-xs font-semibold text-slate-500 block mt-1">Abonnés fidèles</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs text-center">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center justify-center gap-1">
              <span>{profile.rating}</span>
              <span className="text-amber-400 text-xl">★</span>
            </div>
            <span className="text-xs font-semibold text-slate-500 block mt-1">{profile.reviewsCount} avis vérifiés</span>
          </div>
        </div>

        {/* ================= 3. PARAMÈTRES COMMERCIAUX DE LA BOUTIQUE ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-500" />
              <span>Configuration commerciale de la boutique</span>
            </h3>
            <button
              onClick={() => setEditModal(true)}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modifier</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Horaires de la boutique</span>
              <p className="font-bold text-slate-900">{profile.openingHours}</p>
              <p className="text-slate-500 text-[11px]">Commandes en ligne traitées 24h/24</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Zone de livraison</span>
              <p className="font-bold text-slate-900">{profile.deliveryZones}</p>
              <p className="text-slate-500 text-[11px]">Livraison rapide assurée par les coursiers partenaires</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Paiements acceptés</span>
              <p className="font-bold text-slate-900">{profile.paymentMethods}</p>
              <p className="text-slate-500 text-[11px]">Garantie de paiement sécurisé Malick Buss</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Politique d'échange</span>
              <p className="font-bold text-slate-900">{profile.returnPolicy}</p>
              <p className="text-slate-500 text-[11px]">Article neuf non porté avec étiquette d'origine</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ÉDITION VITRINE ================= */}
      {editModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900">Personnaliser la vitrine</h3>
                <p className="text-xs text-slate-500">Ces informations sont visibles sur votre vitrine publique</p>
              </div>
              <button
                onClick={() => setEditModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveShopSettings} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nom de la Boutique *</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description commerciale</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400 resize-none"
                  placeholder="Présentez les spécialités de votre boutique..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Adresse à Dakar</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">WhatsApp Client</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Horaires d'ouverture</label>
                <input
                  type="text"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Zone de livraison</label>
                <input
                  type="text"
                  value={deliveryZones}
                  onChange={(e) => setDeliveryZones(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Politique d'échange</label>
                <input
                  type="text"
                  value={returnPolicy}
                  onChange={(e) => setReturnPolicy(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
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
    </VendorPortalShell>
  );
}
