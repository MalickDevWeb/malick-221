'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  Truck,
  Zap,
  CreditCard,
  User,
  Phone,
  MapPin,
  Edit3,
  ShieldCheck,
  ShoppingBag,
  Banknote,
  Smartphone,
  ChevronRight,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { CartItem, createOrder, getCartItems } from '../../../services/order-flow';
import { getClientAccount, saveClientAccount } from '../../../services/clientAccountStore';

const DAKAR_DISTRICTS = [
  'Médina / Sandaga',
  'Plateau / Centre-ville',
  'Almadies / Ngor',
  'Mermoz / Sacré-Cœur',
  'Fann / Point E',
  'Ouakam / Mamelles',
  'Yoff / Ouest Foire',
  'Grand Dakar / HLM',
  'Parcelles Assainies',
  'Pikine / Guédiawaye',
  'Rufisque / Diamniadio',
];

export default function CheckoutPage() {
  const router = useRouter();
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentOption, setPaymentOption] = useState<'cod' | 'mobile_money'>('cod');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Customer contact & address state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState('Médina / Sandaga');
  const [address, setAddress] = useState('Rue 6 x Blaise Diagne');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setCartItems(getCartItems());
    const client = getClientAccount();
    if (client) {
      setFullName(client.fullName || '');
      setPhoneNumber(client.phoneNumber || '');
      setDistrict(client.district || 'Médina / Sandaga');
      setAddress(client.address || 'Rue 6 x Blaise Diagne');
    }
    setIsClientLoaded(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = deliveryOption === 'express' ? 5000 : 3000;
  const total = subtotal + shippingCost;
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleConfirm = () => {
    if (cartItems.length === 0) {
      router.push('/panier');
      return;
    }

    if (!fullName.trim() || !phoneNumber.trim()) {
      setFormError('Veuillez renseigner votre nom complet et votre numéro de téléphone.');
      setIsEditingAddress(true);
      return;
    }

    setFormError('');

    // Sauvegarde et synchronisation automatique du profil client
    saveClientAccount({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      district: district.trim(),
      address: address.trim(),
    });

    const order = createOrder(cartItems, deliveryOption, paymentOption, {
      name: fullName.trim(),
      phone: phoneNumber.trim(),
      address: `${district.trim()} - ${address.trim()}`,
    });

    router.push(`/confirmation?id=${encodeURIComponent(order.id)}`);
  };

  if (isClientLoaded && cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 mb-2">Votre panier est actuellement vide</h1>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          Ajoutez des articles de nos boutiques artisanales ou bons plans Dakar avant de finaliser votre commande.
        </p>
        <Link
          href="/boutiques"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition active:scale-95"
        >
          <span>Découvrir nos boutiques</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Barre de navigation supérieure de commande */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/panier"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-emerald-700 font-bold text-xs sm:text-sm transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Retour au panier</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-500">
              Passage en caisse sécurisé
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Sécurisé
            </span>
          </div>
        </div>
      </header>

      {/* Stepper moderne Malick Buss */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between relative max-w-xl mx-auto">
            {/* Ligne d'arrière-plan */}
            <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />

            {/* Étape 1 : Panier */}
            <div className="flex flex-col items-center gap-1 z-10 bg-white px-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-[11px] font-bold text-slate-700">1. Panier</span>
            </div>

            {/* Étape 2 : Livraison & Coordonnées (En cours) */}
            <div className="flex flex-col items-center gap-1 z-10 bg-white px-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center ring-4 ring-emerald-100 shadow-xs">
                2
              </div>
              <span className="text-[11px] font-black text-emerald-800">2. Livraison</span>
            </div>

            {/* Étape 3 : Confirmation */}
            <div className="flex flex-col items-center gap-1 z-10 bg-white px-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 text-xs font-bold flex items-center justify-center border border-slate-200">
                3
              </div>
              <span className="text-[11px] font-medium text-slate-400">3. Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal : 2 colonnes Desktop, 1 colonne Mobile */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Colonne gauche (Formulaire & Sélections) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Coordonnées & Adresse de livraison */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs transition">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">
                      Coordonnées & Adresse de livraison
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Où et à qui devons-nous livrer votre commande ?
                    </p>
                  </div>
                </div>

                {!isEditingAddress && (
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>
                )}
              </div>

              {formError && (
                <div className="mb-4 flex items-center gap-2 text-xs text-rose-700 font-bold bg-rose-50 p-3 rounded-xl border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              {isEditingAddress ? (
                <div className="space-y-4 pt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Nom complet du destinataire <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex: Malick Diop"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-semibold text-slate-800 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Numéro de téléphone WhatsApp (Création automatique de compte) <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Ex: 77 123 45 67"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-semibold text-slate-800 transition"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Indispensable pour le livreur et le suivi de validation avec la boutique.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Quartier / Zone à Dakar <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-semibold text-slate-800 transition"
                    >
                      {DAKAR_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Adresse détaillée ou repère précis <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: Rue 6 x Blaise Diagne, en face de la pharmacie"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-semibold text-slate-800 transition"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!fullName.trim() || !phoneNumber.trim()) {
                          setFormError('Le nom et le téléphone sont obligatoires.');
                          return;
                        }
                        setFormError('');
                        setIsEditingAddress(false);
                      }}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-xs"
                    >
                      Enregistrer ces informations
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-900">
                        {fullName || 'Client Malick Buss'}
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        {district}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{address}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>WhatsApp : {phoneNumber || '+221 77 123 45 67'}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-3.5 flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>
                  Un compte client sécurisé sera automatiquement associé à ce numéro pour le suivi de votre colis.
                </span>
              </div>
            </section>

            {/* 2. Mode de livraison */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">Mode de livraison</h2>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Sélectionnez la rapidité d’acheminement souhaitée à Dakar
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Standard */}
                <div
                  onClick={() => setDeliveryOption('standard')}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    deliveryOption === 'standard'
                      ? 'border-emerald-600 bg-emerald-50/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-100/60 text-emerald-800">
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">Standard</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        deliveryOption === 'standard'
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {deliveryOption === 'standard' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-black text-slate-900">{formatFCFA(3000)}</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>2 à 3 jours ouvrés</span>
                    </div>
                  </div>
                </div>

                {/* Express */}
                <div
                  onClick={() => setDeliveryOption('express')}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    deliveryOption === 'express'
                      ? 'border-emerald-600 bg-emerald-50/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">Express VIP</span>
                        <span className="text-[9px] font-black uppercase bg-amber-500 text-white px-1.5 py-0.5 rounded">
                          24h
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        deliveryOption === 'express'
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {deliveryOption === 'express' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-black text-slate-900">{formatFCFA(5000)}</div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span>Livré le jour même ou sous 24h</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Mode de paiement */}
            <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">Mode de paiement</h2>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Choisissez votre méthode préférée de règlement
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Option 1: À la livraison */}
                <div
                  onClick={() => setPaymentOption('cod')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                    paymentOption === 'cod'
                      ? 'border-emerald-600 bg-emerald-50/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Paiement en espèces à la livraison
                        </span>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                          Sans avance
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Payez directement au livreur dès réception de votre commande
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${
                      paymentOption === 'cod'
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {paymentOption === 'cod' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                {/* Option 2: Mobile Money (Wave / Orange Money) */}
                <div
                  onClick={() => setPaymentOption('mobile_money')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center justify-between ${
                    paymentOption === 'mobile_money'
                      ? 'border-emerald-600 bg-emerald-50/30 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          Mobile Money (Wave & Orange Money)
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-black bg-[#1DA1F2] text-white px-1.5 py-0.5 rounded tracking-wide">
                            WAVE
                          </span>
                          <span className="text-[9px] font-black bg-[#FF7900] text-white px-1.5 py-0.5 rounded tracking-wide">
                            OM
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Validation WhatsApp immédiate avec le compte marchand de la boutique
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${
                      paymentOption === 'mobile_money'
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {paymentOption === 'mobile_money' && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Colonne droite : Récapitulatif collant de commande */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Récapitulatif de la commande
                </h3>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                  {totalItemsCount} article{totalItemsCount > 1 ? 's' : ''}
                </span>
              </div>

              {/* Liste d'articles condensée */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-slate-100 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=120&q=80'}
                      alt={item.title}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0 bg-slate-50"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400 truncate">Vendu par : {item.shop}</p>
                      <div className="text-[11px] text-slate-600 font-semibold">
                        Qté : <span className="text-slate-900">{item.quantity}</span> × {formatFCFA(item.price)}
                      </div>
                    </div>
                    <div className="text-xs font-extrabold text-slate-900 text-right shrink-0">
                      {formatFCFA(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Lignes de calcul des totaux */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Sous-total articles</span>
                  <span className="font-semibold text-slate-800">{formatFCFA(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <span>Frais de livraison</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {deliveryOption === 'express' ? 'Express VIP' : 'Standard'}
                    </span>
                  </span>
                  <span className="font-semibold text-slate-800">{formatFCFA(shippingCost)}</span>
                </div>
                <div className="pt-3 border-t border-slate-200/80 flex items-baseline justify-between text-slate-900">
                  <div>
                    <span className="text-sm font-black block">Total à régler</span>
                    <span className="text-[10px] text-slate-400 font-medium">Toutes taxes comprises</span>
                  </div>
                  <div className="text-lg font-black text-emerald-700 tracking-tight">
                    {formatFCFA(total)}
                  </div>
                </div>
              </div>

              {/* Bouton de confirmation principal */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-extrabold text-sm py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirmer la commande</span>
                </button>
              </div>

              {/* Garanties et réassurance */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Vendeurs vérifiés</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Échange sous 48h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Suivi en direct</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Support WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
