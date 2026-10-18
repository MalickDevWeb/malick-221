'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store,
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Package,
  Sparkles,
  Phone,
  Briefcase,
  CheckCircle2,
  Upload,
  Camera,
  MapPin,
  Tag,
  AlertCircle,
  FileText,
  X,
  Check,
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

const VENDOR_CATEGORIES = [
  'Mode & Prêt-à-porter',
  'Chaussures & Sneakers',
  'Beauté, Parfums & Cosmétiques',
  'High-Tech, Téléphonie & Informatique',
  'Artisanat Local & Maroquinerie',
  'Maison, Mobilier & Décoration',
  'Alimentation & Épicerie Fine',
  'Bijoux & Accessoires de Luxe',
  'Autre Univers',
];

const DAKAR_DISTRICTS = [
  'Dakar Plateau / Centre-ville',
  'Sandaga / Marché Petersen',
  'Médina / Fass / Gueule Tapée',
  'Almadies / Ngor / Virage',
  'Mermoz / Sacré-Cœur',
  'HLM / Grand Dakar',
  'Ouakam / Mamelles',
  'Grand Yoff / Liberté 6',
  'Parcelles Assainies',
  'Pikine / Guédiawaye',
  'Rufisque / Diamniadio',
  'En ligne uniquement / Tout Sénégal',
];

const PRESET_AVATARS = ['🛍️', '👑', '💎', '👗', '👟', '📱', '💄', '🇸🇳'];

export function AuthLoginView({
  initialRole = 'VENDEUR',
  initialMode = 'LOGIN',
}: {
  initialRole?: 'CLIENT' | 'VENDEUR';
  initialMode?: 'LOGIN' | 'SIGNUP';
}) {
  const router = useRouter();
  const [role, setRole] = useState<'CLIENT' | 'VENDEUR'>(initialRole);
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>(initialMode);

  // Form states
  const [identifier, setIdentifier] = useState(
    initialRole === 'VENDEUR' ? 'moussa@keurfriperie.sn' : 'malick.diop@gmail.com'
  );
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Additional vendor fields
  const [category, setCategory] = useState(VENDOR_CATEGORIES[0]);
  const [district, setDistrict] = useState(DAKAR_DISTRICTS[0]);
  const [description, setDescription] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedAvatarIcon, setSelectedAvatarIcon] = useState<string>('🛍️');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVendorSignup = mode === 'SIGNUP' && role === 'VENDEUR';
  const isPasswordsMatching = confirmPassword ? password === confirmPassword : true;

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("La taille du fichier ne doit pas dépasser 5 Mo.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'SIGNUP') {
      if (password !== confirmPassword) {
        setPasswordError('Les mots de passe ne correspondent pas.');
        return;
      }
      if (password.length < 6) {
        setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
        return;
      }
    }

    setPasswordError('');
    setLoading(true);

    setTimeout(() => {
      if (mode === 'SIGNUP') {
        if (role === 'VENDEUR') {
          try {
            const vendorProfile = {
              name: fullName || 'Boutiquier',
              shopName: shopName || 'Ma Boutique',
              phone: phone,
              category: category,
              district: district,
              description: description,
              logo: logoPreview || null,
              avatarIcon: selectedAvatarIcon,
              createdAt: new Date().toISOString(),
            };
            localStorage.setItem('malick_vendor_profile', JSON.stringify(vendorProfile));
            localStorage.setItem('malick_user_role', 'VENDEUR');
          } catch (err) {
            console.error('Failed to save vendor to localStorage', err);
          }
        }
        setSuccessMessage(true);
        setTimeout(() => {
          if (role === 'VENDEUR') {
            router.push('/vendeur/dashboard');
          } else {
            router.push('/');
          }
        }, 800);
      } else {
        if (role === 'VENDEUR') {
          router.push('/vendeur/dashboard');
        } else {
          router.push('/');
        }
      }
    }, 700);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#040b17] text-white flex flex-col justify-between overflow-x-hidden font-sans select-none">
      {/* ================= 1. BACKGROUND IMMERSIF HD DU BOUTIQUIER DAKAROIS ================= */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90 transition-all duration-700"
        style={{
          backgroundImage: `url('/images/auth/login_seller_bg_hd.jpg')`,
        }}
      />
      {/* Dégradés d'ambiance pour une lisibilité parfaite des cartes */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#040b17] via-transparent to-[#040b17]/85 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#040b17]/95 via-[#040b17]/60 to-[#040b17]/90 lg:to-[#040b17]/70 pointer-events-none" />

      {/* ================= 2. EN-TÊTE ÉLÉGANT FIDÈLE À LA MAQUETTE ================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 flex items-center justify-between">
        {/* Logo MB + Badge Espace Boutiquier */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <Link href="/" className="hover:opacity-95 transition">
            <BrandLogo size="md" variant="light" layout="horizontal" />
          </Link>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-400 text-xs font-bold tracking-wide shadow-xs">
            {role === 'VENDEUR' ? (
              <>
                <Store className="w-3.5 h-3.5" />
                <span>ESPACE BOUTIQUIER</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5" />
                <span>ESPACE CLIENT</span>
              </>
            )}
          </div>
        </div>

        {/* Liens d'aide et sécurité à droite */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs font-semibold">
          <Link
            href="/support"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Aide</span>
          </Link>

          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[2.2px]" />
            <span className="hidden sm:inline">Espace sécurisé</span>
          </div>
        </div>
      </header>

      {/* ================= 3. CORPS CENTRAL : FORMULAIRE GLASSMORPHIC & CARTES FLOTTANTES ================= */}
      <main className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
        {/* CARTE DE CONNEXION / CRÉATION DE COMPTE GAUCHE */}
        <motion.div
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full ${
            isVendorSignup ? 'max-w-xl lg:max-w-2xl' : 'max-w-md'
          } bg-[#071328]/95 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.65)] space-y-4`}
        >
          {/* Commutateurs Vendeur / Client & Mode Connexion / Inscription */}
          <div className="flex items-center justify-between pb-1">
            <div className="inline-flex p-1 bg-[#0b172c] border border-slate-700/70 rounded-full text-xs">
              <button
                type="button"
                onClick={() => {
                  setRole('VENDEUR');
                  if (mode === 'LOGIN') setIdentifier('moussa@keurfriperie.sn');
                }}
                className={`px-3 py-1 rounded-full font-bold transition flex items-center gap-1.5 ${
                  role === 'VENDEUR'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Store className="w-3 h-3" />
                <span>Boutiquier</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('CLIENT');
                  if (mode === 'LOGIN') setIdentifier('malick.diop@gmail.com');
                }}
                className={`px-3 py-1 rounded-full font-bold transition flex items-center gap-1.5 ${
                  role === 'CLIENT'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3 h-3" />
                <span>Client</span>
              </button>
            </div>

            <span className="text-[11px] font-bold text-amber-400/90 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Sénégal 🇸🇳</span>
            </span>
          </div>

          {/* Titre & Accroche Dynamiques selon le Mode */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              {mode === 'LOGIN' ? (
                role === 'VENDEUR' ? (
                  <>
                    Votre boutique mérite <br />
                    de <span className="text-amber-400">briller.</span>
                  </>
                ) : (
                  <>
                    Le meilleur de Dakar <br />
                    à <span className="text-amber-400">portée de clic.</span>
                  </>
                )
              ) : role === 'VENDEUR' ? (
                <>
                  Ouvrez votre boutique <br />
                  en <span className="text-amber-400">2 minutes.</span>
                </>
              ) : (
                <>
                  Créez votre compte <br />
                  <span className="text-amber-400">gratuitement.</span>
                </>
              )}
            </h1>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {mode === 'LOGIN'
                ? role === 'VENDEUR'
                  ? 'Connectez-vous pour gérer vos produits, vos commandes et vos revenus en toute simplicité.'
                  : 'Connectez-vous pour suivre vos commandes, vos favoris et vos livraisons express.'
                : role === 'VENDEUR'
                ? 'Rejoignez le premier marketplace sénégalais et commencez à vendre auprès de milliers de clients.'
                : 'Accédez à des milliers de produits authentiques au Sénégal avec livraison express.'}
            </p>
          </div>

          {/* Formulaire Dynamique (Connexion ou Inscription) */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* ================= ENROLLEMENT VENDEUR COMPLET ================= */}
            {isVendorSignup ? (
              <div className="space-y-4">
                {/* 1. SECTION LOGO ET IDENTITÉ VISUELLE */}
                <div className="bg-[#0b172c]/70 border border-slate-700/60 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Logo & Image de Marque</span>
                    </label>
                    <span className="text-[10px] text-slate-400">Recommandé • Max 5Mo</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Zone d'aperçu du Logo / Avatar */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#071328] border-2 border-dashed border-amber-400/50 hover:border-amber-400 flex items-center justify-center cursor-pointer overflow-hidden transition group shrink-0 shadow-inner"
                      title="Cliquez pour importer un logo"
                    >
                      {logoPreview ? (
                        <>
                          <img
                            src={logoPreview}
                            alt="Logo boutique"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLogoPreview(null);
                            }}
                            className="absolute top-1 right-1 w-5 h-5 bg-red-600/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-xs"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <div className="text-center p-1">
                          <span className="text-2xl sm:text-3xl block leading-none select-none">
                            {selectedAvatarIcon}
                          </span>
                          <span className="text-[9px] text-amber-400/90 font-bold block mt-1">
                            + Importer
                          </span>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </div>

                    {/* Explications & Badges d'emblème rapide */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <p className="text-xs text-slate-300 font-medium">
                        Importez le logo officiel de votre boutique ou choisissez un emblème :
                      </p>

                      {/* Émoticônes prédéfinies si le commerçant n'a pas encore de logo PNG */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {PRESET_AVATARS.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => {
                              setSelectedAvatarIcon(emoji);
                              setLogoPreview(null);
                            }}
                            className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition ${
                              selectedAvatarIcon === emoji && !logoPreview
                                ? 'bg-amber-400/30 border border-amber-400 scale-110 shadow-xs'
                                : 'bg-[#071328] border border-slate-700/60 hover:border-slate-500'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. INFORMATIONS SUR LA BOUTIQUE */}
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Nom de la boutique */}
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide block mb-1">
                        Nom de la boutique *
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                        <input
                          type="text"
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          placeholder="Ex: Keur Friperie, Dakar Luxe"
                          required
                          className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-3 py-2.5 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                        />
                      </div>
                    </div>

                    {/* Catégorie principale */}
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide block mb-1">
                        Catégorie principale *
                      </label>
                      <div className="relative">
                        <Tag className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px] pointer-events-none" />
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium appearance-none cursor-pointer"
                        >
                          {VENDOR_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-[#071328] text-white">
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Localisation / Quartier à Dakar */}
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide block mb-1">
                        Emplacement / Quartier *
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px] pointer-events-none" />
                        <select
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium appearance-none cursor-pointer"
                        >
                          {DAKAR_DISTRICTS.map((dist) => (
                            <option key={dist} value={dist} className="bg-[#071328] text-white">
                              {dist}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Courte présentation / Slogan */}
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide block mb-1">
                        Bio ou Slogan court
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Ex: Mode chic & streetwear 100% garanti"
                          className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-3 py-2.5 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. CONTACT ET SÉCURITÉ DU GÉRANT */}
                <div className="border-t border-slate-800/80 pt-3 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Nom complet du gérant */}
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide block mb-1">
                        Nom & Prénom du gérant *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Modou Fall"
                          required
                          className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-4 py-2.5 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                        />
                      </div>
                    </div>

                    {/* Téléphone WhatsApp */}
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide block mb-1">
                        Numéro WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+221 77 000 00 00"
                          required
                          className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-4 py-2.5 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Mot de passe */}
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide block mb-1">
                        Mot de passe *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (passwordError) setPasswordError('');
                          }}
                          placeholder="Au moins 6 caractères"
                          required
                          className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-9 py-2.5 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition"
                          aria-label={showPassword ? 'Masquer' : 'Afficher'}
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirmation du mot de passe */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wide block">
                          Confirmer le mot de passe *
                        </label>
                        {confirmPassword && (
                          <span
                            className={`text-[10px] font-bold flex items-center gap-1 ${
                              isPasswordsMatching ? 'text-emerald-400' : 'text-amber-400'
                            }`}
                          >
                            {isPasswordsMatching ? (
                              <>
                                <Check className="w-3 h-3 stroke-[2.5px]" />
                                <span>Identique</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-3 h-3" />
                                <span>Différent</span>
                              </>
                            )}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (passwordError) setPasswordError('');
                          }}
                          placeholder="Retapez le mot de passe"
                          required
                          className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-9 py-2.5 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                            confirmPassword && !isPasswordsMatching
                              ? 'border-amber-400/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                              : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition"
                          aria-label={showConfirmPassword ? 'Masquer' : 'Afficher'}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : mode === 'SIGNUP' ? (
              /* ================= INSCRIPTION CLIENT STANDARD ================= */
              <div className="space-y-3">
                {/* Nom complet */}
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nom & Prénom"
                    required
                    className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                  />
                </div>

                {/* Téléphone WhatsApp */}
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Numéro WhatsApp (+221 7X XXX XX XX)"
                    required
                    className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                  />
                </div>

                {/* Mot de passe */}
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Mot de passe (min 6 caractères)"
                    required
                    className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-10 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Confirmation Mot de passe */}
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    placeholder="Confirmer le mot de passe"
                    required
                    className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-10 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition"
                    aria-label={showConfirmPassword ? 'Masquer' : 'Afficher'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              /* ================= MODE CONNEXION STANDARD ================= */
              <div className="space-y-3">
                {/* Champ Identifiant (Email ou Téléphone) en mode LOGIN */}
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Adresse e-mail ou téléphone"
                    required
                    className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                  />
                </div>

                {/* Mot de passe */}
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    required
                    className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-10 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Message d'erreur de mot de passe */}
            {passwordError && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold animate-pulse">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {/* Options additionnelles */}
            {mode === 'LOGIN' ? (
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#0b172c] border-slate-700 text-amber-500 focus:ring-amber-400 cursor-pointer"
                  />
                  <span>Se souvenir de moi</span>
                </label>

                <Link
                  href="/mot-de-passe-oublie"
                  className="text-amber-400 hover:text-amber-300 font-semibold transition"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 leading-tight pt-1">
                En créant un compte, vous acceptez les{' '}
                <Link href="/terms" className="text-amber-400 hover:underline">
                  Conditions Générales
                </Link>{' '}
                de Malick Buss Sénégal.
              </div>
            )}

            {/* Bouton Primaire */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition duration-200 mt-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : successMessage ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Boutique créée avec succès !</span>
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 stroke-[2.8px]" />
                  <span>
                    {mode === 'LOGIN'
                      ? 'Se connecter'
                      : role === 'VENDEUR'
                      ? 'Ouvrir ma boutique officielle'
                      : 'Créer mon compte'}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Séparateur 'ou' */}
          <div className="relative flex items-center justify-center my-2.5">
            <div className="w-full border-t border-slate-800" />
            <span className="bg-[#071328] px-3 text-xs text-slate-500 font-medium">ou</span>
            <div className="w-full border-t border-slate-800" />
          </div>

          {/* Bouton Secondaire Alternatif (Bascule Connexion / Inscription) */}
          <button
            type="button"
            onClick={() => {
              setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
              setSuccessMessage(false);
              setPasswordError('');
            }}
            className="w-full border border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/70 text-white font-semibold text-xs py-3 rounded-xl transition flex items-center justify-center text-center shadow-xs cursor-pointer"
          >
            {mode === 'LOGIN'
              ? role === 'VENDEUR'
                ? 'Créer ma boutique'
                : 'Créer mon compte'
              : 'Déjà un compte ? Se connecter'}
          </button>

          {/* Note de Réassurance Bas de Carte */}
          <div className="pt-2 flex items-center gap-3 border-t border-slate-800/80">
            <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <p className="font-bold text-slate-200">
                {role === 'VENDEUR'
                  ? 'Vos ventes, vos commandes, vos commissions.'
                  : 'Paiements sécurisés Wave, Orange Money et Cash.'}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">Tout au même endroit.</p>
            </div>
          </div>
        </motion.div>

        {/* COLONNE DROITE : 3 CARTES FLOTTANTES GLASSMORPHIC (Visibles sur grand écran) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden lg:flex flex-col space-y-4 max-w-sm w-full"
        >
          {/* Card 1 : Vitrine en ligne */}
          <div className="bg-[#071328]/85 backdrop-blur-xl border border-slate-700/60 hover:border-amber-400/50 rounded-2xl p-4 shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-0.5">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5 stroke-[2px]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition">
                    Vitrine en ligne
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">
                  Présentez vos produits et attirez plus de clients à Dakar.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 : Commandes en temps réel */}
          <div className="bg-[#071328]/85 backdrop-blur-xl border border-slate-700/60 hover:border-cyan-400/50 rounded-2xl p-4 shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-0.5">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Package className="w-5 h-5 stroke-[2px]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-400 transition">
                    Commandes en temps réel
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">
                  Suivez vos commandes à chaque étape de la livraison.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 : Retraits Wave */}
          <div className="bg-[#071328]/85 backdrop-blur-xl border border-slate-700/60 hover:border-sky-400/50 rounded-2xl p-4 shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-0.5">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#1da1f2]/20 border border-[#1da1f2]/40 flex items-center justify-center text-[#1da1f2] font-black text-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                W
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white group-hover:text-sky-400 transition">
                    Retraits Wave
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1 transition" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">
                  Recevez vos revenus en toute sécurité instantanément.
                </p>
              </div>
            </div>
          </div>

          {/* Slogan & Carte du Sénégal stylisée */}
          <div className="pt-2 flex items-center gap-3 pl-2">
            <div className="w-0.5 h-8 bg-amber-400 rounded-full" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xs font-black">
                🇸🇳
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Tout votre commerce,{' '}
                <span className="text-amber-400 font-bold block sm:inline">
                  en un seul espace.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ================= 4. MINI-FOOTER DISCRET ================= */}
      <footer className="relative z-20 w-full text-center py-4 text-xs text-slate-500 font-medium">
        © {new Date().getFullYear()} Malick Buss • Le Marketplace du Sénégal 🇸🇳 • Tous droits réservés.
      </footer>
    </div>
  );
}
