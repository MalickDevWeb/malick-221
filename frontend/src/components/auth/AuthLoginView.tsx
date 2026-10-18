'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (mode === 'SIGNUP') {
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
      <main className="relative z-20 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* CARTE DE CONNEXION / CRÉATION DE COMPTE GAUCHE */}
        <motion.div
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#071328]/90 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.65)] space-y-4"
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
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            {mode === 'SIGNUP' && (
              <>
                {/* Nom complet */}
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nom complet du gérant"
                    required
                    className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                  />
                </div>

                {/* Nom de la boutique (si vendeur) */}
                {role === 'VENDEUR' && (
                  <div className="relative">
                    <Briefcase className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      placeholder="Nom de votre boutique (ex: Dakar Luxe)"
                      required
                      className="w-full bg-[#0b172c]/90 border border-slate-700/80 rounded-xl text-xs pl-10 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition font-medium"
                    />
                  </div>
                )}

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
              </>
            )}

            {/* Champ Identifiant (Email ou Téléphone) en mode LOGIN */}
            {mode === 'LOGIN' && (
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
            )}

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
              className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 active:scale-[0.99] text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition duration-200 mt-2"
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
                    {mode === 'LOGIN'
                      ? 'Se connecter'
                      : role === 'VENDEUR'
                      ? 'Créer ma boutique'
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
            }}
            className="w-full border border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/70 text-white font-semibold text-xs py-3 rounded-xl transition flex items-center justify-center text-center shadow-xs"
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
