'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Store,
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  HelpCircle,
  ArrowLeft,
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

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.16 }}
      className="flex items-center gap-1.5 mt-1.5 text-[11px] font-semibold text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2.5 py-1.5 rounded-xl shadow-xs"
    >
      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
      <span>{error}</span>
    </motion.div>
  );
}

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
  const [password, setPassword] = useState(initialMode === 'SIGNUP' ? '' : 'password123');
  const [confirmPassword, setConfirmPassword] = useState(initialMode === 'SIGNUP' ? '' : 'password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Custom Form Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Multi-step signup state
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [stepDirection, setStepDirection] = useState<1 | -1>(1);

  // Additional vendor fields
  const [category, setCategory] = useState(VENDOR_CATEGORIES[0]);
  const [district, setDistrict] = useState(DAKAR_DISTRICTS[0]);
  const [description, setDescription] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [selectedAvatarIcon, setSelectedAvatarIcon] = useState<string>('🛍️');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVendorSignup = mode === 'SIGNUP' && role === 'VENDEUR';
  const isPasswordsMatching = confirmPassword ? password === confirmPassword : true;

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!shopName.trim()) {
      newErrors.shopName = 'Veuillez saisir le nom de votre boutique.';
    } else if (shopName.trim().length < 2) {
      newErrors.shopName = 'Le nom de la boutique doit comporter au moins 2 caractères.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Veuillez indiquer le nom & prénom du gérant.';
    }
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Le numéro WhatsApp commercial est requis.';
    } else if (cleanPhone.length < 7) {
      newErrors.phone = 'Numéro de téléphone incomplet (min. 7 chiffres).';
    }
    if (!password) {
      newErrors.password = 'Veuillez créer un mot de passe sécurisé.';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit comporter au moins 6 caractères.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateClientSignup = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Veuillez indiquer votre nom complet.';
    }
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Le numéro WhatsApp est requis.';
    } else if (cleanPhone.length < 7) {
      newErrors.phone = 'Numéro de téléphone incomplet (min. 7 chiffres).';
    }
    if (!password) {
      newErrors.password = 'Veuillez créer un mot de passe.';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit comporter au moins 6 caractères.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne sont pas identiques.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!identifier.trim()) {
      newErrors.identifier = 'Veuillez renseigner votre email ou téléphone.';
    }
    if (!password) {
      newErrors.password = 'Veuillez saisir votre mot de passe.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const stepVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(3px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 340,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      filter: 'blur(3px)',
      transition: {
        duration: 0.16,
        ease: 'easeOut',
      },
    }),
  };

  const handleNextStep = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!validateStep1()) {
      return;
    }
    setStepDirection(1);
    setSignupStep(2);
  };

  const handlePrevStep = () => {
    setStepDirection(-1);
    setSignupStep(1);
    setErrors({});
  };

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

    if (isVendorSignup) {
      if (signupStep === 1) {
        handleNextStep();
        return;
      }
      if (!validateStep2()) {
        return;
      }
    } else if (mode === 'SIGNUP') {
      if (!validateClientSignup()) {
        return;
      }
    } else {
      if (!validateLogin()) {
        return;
      }
    }

    setErrors({});
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
    <div className="relative h-screen w-full bg-[#040b17] text-white flex flex-col justify-between overflow-hidden font-sans select-none">
      {/* ================= 1. BACKGROUND IMMERSIF HD DU BOUTIQUIER DAKAROIS ================= */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90 transition-all duration-700"
        style={{
          backgroundImage: `url('/images/auth/login_seller_bg_hd.jpg')`,
        }}
      />
      {/* Dégradés d'ambiance pour une lisibilité parfaite des cartes */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#040b17] via-transparent to-[#040b17]/90 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#040b17]/95 via-[#040b17]/75 to-[#040b17]/95 pointer-events-none" />

      {/* ================= 2. EN-TÊTE ÉLÉGANT FIDÈLE À LA MAQUETTE ================= */}
      <header className="relative z-30 w-full max-w-4xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shrink-0">
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
        <div className="flex items-center gap-3 sm:gap-5 text-xs font-semibold">
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

      {/* ================= 3. CORPS CENTRAL : FORMULAIRE CENTRÉ SANS SCROLL ================= */}
      <main className="relative z-20 flex-1 w-full max-w-xl mx-auto px-4 flex items-center justify-center overflow-y-auto sm:overflow-hidden py-1 sm:py-2">
        {/* CARTE DE CONNEXION / CRÉATION DE COMPTE CENTRÉE */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`w-full ${
            isVendorSignup ? 'max-w-lg lg:max-w-xl' : 'max-w-md'
          } bg-[#071328]/95 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.65)] space-y-3 mx-auto my-auto`}
        >
          {/* Commutateurs Vendeur / Client & Mode Connexion / Inscription */}
          <div className="flex items-center justify-between pb-0.5">
            <div className="inline-flex p-1 bg-[#0b172c] border border-slate-700/70 rounded-full text-xs">
              <button
                type="button"
                onClick={() => {
                  setRole('VENDEUR');
                  setSignupStep(1);
                  setErrors({});
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
                  setSignupStep(1);
                  setErrors({});
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
          <div className="space-y-0.5">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {mode === 'LOGIN' ? (
                role === 'VENDEUR' ? (
                  <>
                    Votre boutique mérite de <span className="text-amber-400">briller.</span>
                  </>
                ) : (
                  <>
                    Le meilleur de Dakar à <span className="text-amber-400">portée de clic.</span>
                  </>
                )
              ) : role === 'VENDEUR' ? (
                signupStep === 1 ? (
                  <>
                    Étape 1 : Créez votre <span className="text-amber-400">boutique.</span>
                  </>
                ) : (
                  <>
                    Étape 2 : Vos accès <span className="text-amber-400">gérant officiel.</span>
                  </>
                )
              ) : (
                <>
                  Créez votre compte <span className="text-amber-400">gratuitement.</span>
                </>
              )}
            </h1>
            <p className="text-xs text-slate-300 font-medium">
              {mode === 'LOGIN'
                ? role === 'VENDEUR'
                  ? 'Connectez-vous pour gérer vos produits, vos commandes et vos revenus.'
                  : 'Connectez-vous pour suivre vos commandes et vos livraisons express.'
                : role === 'VENDEUR'
                ? signupStep === 1
                  ? 'Renseignez l’identité et la catégorie de votre boutique en quelques clics.'
                  : 'Définissez vos identifiants pour sécuriser vos accès et vos retraits Wave.'
                : 'Accédez à des milliers de produits authentiques au Sénégal avec livraison express.'}
            </p>
          </div>

          {/* ================= STEPPER 2027 EN MODE VENDEUR ================= */}
          {isVendorSignup && (
            <div className="bg-[#0b172c]/80 border border-slate-700/60 rounded-2xl p-2.5 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-2">
                {/* Capsule Étape 1 */}
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                    signupStep === 1
                      ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-[1.02]'
                      : 'bg-[#071328] text-emerald-400 border border-emerald-500/30 hover:border-emerald-400'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-950/20 flex items-center justify-center text-[10px] font-black">
                    {signupStep > 1 ? '✓' : '1'}
                  </span>
                  <span>1. La Boutique</span>
                </button>

                {/* Barre animée */}
                <div className="w-8 sm:w-12 h-1 bg-slate-800 relative overflow-hidden rounded-full">
                  <div
                    className={`h-full bg-amber-400 transition-all duration-500 ${
                      signupStep === 2 ? 'w-full' : 'w-1/2'
                    }`}
                  />
                </div>

                {/* Capsule Étape 2 */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    signupStep === 2
                      ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-[1.02]'
                      : 'bg-[#071328] text-slate-400 border border-slate-700/60 hover:text-slate-200 cursor-pointer'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-950/20 flex items-center justify-center text-[10px] font-black">
                    2
                  </span>
                  <span>2. Accès Gérant</span>
                </button>
              </div>

              <span className="text-[11px] font-black text-amber-400 tracking-wide px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25">
                Étape {signupStep}/2
              </span>
            </div>
          )}

          {/* Formulaire Dynamique (Connexion ou Inscription) avec Validation Personnalisée */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
            {/* ================= ENROLLEMENT VENDEUR EN 2 ÉTAPES ================= */}
            {isVendorSignup ? (
              <AnimatePresence mode="wait" custom={stepDirection}>
                {signupStep === 1 ? (
                  <motion.div
                    key="vendor-step-1"
                    custom={stepDirection}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-4"
                  >
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
                            Importez le logo officiel ou choisissez un emblème :
                          </p>

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
                              onChange={(e) => {
                                setShopName(e.target.value);
                                clearError('shopName');
                              }}
                              placeholder="Ex: Keur Friperie, Dakar Luxe"
                              className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-3 py-2.5 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                                errors.shopName
                                  ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                                  : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                              }`}
                            />
                          </div>
                          <FieldError error={errors.shopName} />
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
                              placeholder="Ex: Mode chic 100% garantie"
                              className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-3 py-2.5 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bouton Suivant de l'Étape 1 */}
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition duration-200 mt-2 cursor-pointer"
                    >
                      <span>Continuer vers les accès gérant</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.8px]" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="vendor-step-2"
                    custom={stepDirection}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-4"
                  >
                    {/* Badge récapitulatif boutique */}
                    <div className="bg-[#0b172c]/80 border border-slate-700/60 rounded-2xl p-3 flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-400 flex items-center justify-center text-base font-bold shrink-0 overflow-hidden">
                          {logoPreview ? (
                            <img src={logoPreview} alt="" className="w-full h-full object-cover" />
                          ) : (
                            selectedAvatarIcon
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-white truncate">{shopName}</h4>
                          <p className="text-[10px] text-slate-400 truncate">
                            {category} • {district}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="text-[10px] font-bold text-amber-400 hover:underline px-2 py-1 shrink-0 cursor-pointer"
                      >
                        Modifier
                      </button>
                    </div>

                    {/* 3. CONTACT ET SÉCURITÉ DU GÉRANT */}
                    <div className="space-y-3">
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
                              onChange={(e) => {
                                setFullName(e.target.value);
                                clearError('fullName');
                              }}
                              placeholder="Modou Fall"
                              className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-4 py-2.5 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                                errors.fullName
                                  ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                                  : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                              }`}
                            />
                          </div>
                          <FieldError error={errors.fullName} />
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
                              onChange={(e) => {
                                setPhone(e.target.value);
                                clearError('phone');
                              }}
                              placeholder="+221 77 000 00 00"
                              className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-4 py-2.5 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                                errors.phone
                                  ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                                  : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                              }`}
                            />
                          </div>
                          <FieldError error={errors.phone} />
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
                                clearError('password');
                                clearError('confirmPassword');
                              }}
                              placeholder="Au moins 6 caractères"
                              className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-9 py-2.5 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                                errors.password
                                  ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                                  : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition"
                              aria-label={showPassword ? 'Masquer' : 'Afficher'}
                            >
                              {showPassword ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <FieldError error={errors.password} />
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
                                clearError('confirmPassword');
                              }}
                              placeholder="Retapez le mot de passe"
                              className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-9 py-2.5 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                                errors.confirmPassword
                                  ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                                  : confirmPassword && !isPasswordsMatching
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
                          <FieldError error={errors.confirmPassword} />
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 leading-tight pt-1">
                      En créant votre boutique, vous acceptez les{' '}
                      <Link href="/terms" className="text-amber-400 hover:underline">
                        Conditions Vendeur
                      </Link>{' '}
                      de Malick Buss Sénégal.
                    </div>

                    {/* 2 Boutons Étape 2 : Précédent et Ouvrir */}
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex-1 border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-900 text-slate-300 font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Précédent</span>
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-[2] bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : successMessage ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-slate-950" />
                            <span>Boutique créée !</span>
                          </>
                        ) : (
                          <>
                            <span>Ouvrir ma boutique</span>
                            <ArrowRight className="w-4 h-4 stroke-[2.8px]" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ) : mode === 'SIGNUP' ? (
              /* ================= INSCRIPTION CLIENT STANDARD ================= */
              <div className="space-y-3">
                {/* Nom complet */}
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      clearError('fullName');
                    }}
                    placeholder="Nom & Prénom"
                    className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                      errors.fullName
                        ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                        : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                    }`}
                  />
                  <FieldError error={errors.fullName} />
                </div>

                {/* Téléphone WhatsApp */}
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      clearError('phone');
                    }}
                    placeholder="Numéro WhatsApp (+221 7X XXX XX XX)"
                    className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                      errors.phone
                        ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                        : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                    }`}
                  />
                  <FieldError error={errors.phone} />
                </div>

                {/* Mot de passe */}
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError('password');
                      clearError('confirmPassword');
                    }}
                    placeholder="Mot de passe (min 6 caractères)"
                    className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-10 py-3 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                      errors.password
                        ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                        : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <FieldError error={errors.password} />
                </div>

                {/* Confirmation Mot de passe */}
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearError('confirmPassword');
                    }}
                    placeholder="Confirmer le mot de passe"
                    className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-10 py-3 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                      errors.confirmPassword
                        ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                        : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition"
                    aria-label={showConfirmPassword ? 'Masquer' : 'Afficher'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <FieldError error={errors.confirmPassword} />
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
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      clearError('identifier');
                    }}
                    placeholder="Adresse e-mail ou téléphone"
                    className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                      errors.identifier
                        ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                        : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                    }`}
                  />
                  <FieldError error={errors.identifier} />
                </div>

                {/* Mot de passe */}
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError('password');
                    }}
                    placeholder="Mot de passe"
                    className={`w-full bg-[#0b172c]/90 border rounded-xl text-xs pl-10 pr-10 py-3 text-white placeholder:text-slate-400 focus:outline-none transition font-medium ${
                      errors.password
                        ? 'border-rose-500/90 ring-2 ring-rose-500/30 bg-rose-950/20 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                        : 'border-slate-700/80 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400 transition"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <FieldError error={errors.password} />
                </div>
              </div>
            )}

            {/* Options additionnelles pour le mode LOGIN */}
            {mode === 'LOGIN' && (
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
            )}

            {/* Conditions pour Client Signup */}
            {!isVendorSignup && mode === 'SIGNUP' && (
              <div className="text-[11px] text-slate-400 leading-tight pt-1">
                En créant un compte, vous acceptez les{' '}
                <Link href="/terms" className="text-amber-400 hover:underline">
                  Conditions Générales
                </Link>{' '}
                de Malick Buss Sénégal.
              </div>
            )}

            {/* Bouton Primaire (pour Login et Inscription Client) */}
            {!isVendorSignup && (
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
                    <span>Compte créé avec succès !</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 stroke-[2.8px]" />
                    <span>
                      {mode === 'LOGIN' ? 'Se connecter' : 'Créer mon compte'}
                    </span>
                  </>
                )}
              </button>
            )}
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
              const newMode = mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN';
              setMode(newMode);
              setSignupStep(1);
              setSuccessMessage(false);
              setErrors({});
              if (newMode === 'SIGNUP') {
                setPassword('');
                setConfirmPassword('');
              }
            }}
            className="w-full border border-slate-700/80 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-900/80 text-white font-semibold text-xs py-2.5 rounded-xl transition flex items-center justify-center text-center shadow-xs cursor-pointer"
          >
            {mode === 'LOGIN' ? (
              <span>
                Nouveau sur Malick Buss ?{' '}
                <strong className="text-amber-400 underline font-bold">
                  {role === 'VENDEUR' ? 'Ouvrir ma boutique' : 'Créer un compte'}
                </strong>
              </span>
            ) : (
              <span>
                Vous avez déjà un compte ?{' '}
                <strong className="text-amber-400 underline font-bold">Se connecter</strong>
              </span>
            )}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
