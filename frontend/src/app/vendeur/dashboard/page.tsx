'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Store,
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
  ExternalLink,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  BarChart3,
  Settings,
  Users,
  Star,
  ShieldCheck,
  Send,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Home,
  User,
  ArrowLeft,
  X,
  CreditCard,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { BrandLogo } from '../../../components/ui/BrandLogo';
import { VendorBottomNavigation } from '../../../components/layout/VendorBottomNavigation';
import { getVendorProfile, VendorProfile } from '../../../services/vendorProfileStore';
import { getVendorProducts } from '../../../services/productStore';
import { getVendorNotifications } from '../../../services/notificationStore';

export default function VendorDashboardPage() {
  const [profile, setProfile] = useState<VendorProfile>(getVendorProfile());
  const [prodCount, setProdCount] = useState(0);
  const [unreadNotifs, setUnreadNotifs] = useState(0);

  useEffect(() => {
    const syncAll = () => {
      setProfile(getVendorProfile());
      setProdCount(getVendorProducts().length);
      const notifs = getVendorNotifications();
      setUnreadNotifs(notifs.filter((n) => !n.read).length);
    };

    syncAll();
    window.addEventListener('malick_profile_updated', syncAll);
    window.addEventListener('malick_products_updated', syncAll);
    window.addEventListener('malick_notifications_updated', syncAll);

    return () => {
      window.removeEventListener('malick_profile_updated', syncAll);
      window.removeEventListener('malick_products_updated', syncAll);
      window.removeEventListener('malick_notifications_updated', syncAll);
    };
  }, []);

  const [selectedPeriod, setSelectedPeriod] = useState<'7j' | '30j' | 'an'>('7j');
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const weeklySales = [
    { day: 'Lun', amount: 25000, height: 40, orders: 6 },
    { day: 'Mar', amount: 42000, height: 68, orders: 11 },
    { day: 'Mer', amount: 31500, height: 50, orders: 8 },
    { day: 'Jeu', amount: 52000, height: 82, orders: 14 },
    { day: 'Ven', amount: 38000, height: 60, orders: 9 },
    { day: 'Sam', amount: 65000, height: 100, orders: 18 },
    { day: 'Dim', amount: 48750, height: 76, orders: 12 },
  ];

  const recentOrders = [
    {
      id: '#MB-2025-00123',
      client: 'Awa Diop',
      clientPhone: '+221 77 123 45 67',
      items: 'Ensemble Boubou Soie (x1)',
      amount: 28500,
      time: 'Il y a 14 min',
      status: 'En préparation',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      payment: 'Wave',
    },
    {
      id: '#MB-2025-00122',
      client: 'Moussa Fall',
      clientPhone: '+221 76 987 65 43',
      items: 'Sneakers Dakar Urban (x1)',
      amount: 18500,
      time: 'Il y a 1 h',
      status: 'Livrée',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      payment: 'Orange Money',
    },
    {
      id: '#MB-2025-00121',
      client: 'Fatou Ndiaye',
      clientPhone: '+221 78 555 44 33',
      items: 'Sac à main Cuir Thiès (x1)',
      amount: 15000,
      time: 'Il y a 2 h',
      status: 'En cours',
      statusColor: 'bg-sky-50 text-sky-700 border-sky-200',
      payment: 'Wave',
    },
    {
      id: '#MB-2025-00120',
      client: 'Ibrahima Sarr',
      clientPhone: '+221 70 111 22 33',
      items: 'Chemise Lin Dakar (x2)',
      amount: 24000,
      time: 'Il y a 3 h',
      status: 'Livrée',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      payment: 'Cash',
    },
  ];

  const navMenuItems = [
    { label: 'Tableau de bord', href: '/vendeur/dashboard', icon: BarChart3, active: true },
    { label: 'Mes Produits', href: '/vendeur/produits', icon: Package, badge: prodCount ? String(prodCount) : '28' },
    { label: 'Commandes', href: '/vendeur/commandes', icon: ShoppingBag, badge: '4' },
    { label: 'Ma Boutique', href: '/vendeur/boutique', icon: Store },
    { label: 'Retraits & Finances', href: '/vendeur/retraits', icon: DollarSign, badge: '58 000 F' },
    { label: 'Notifications', href: '/vendeur/notifications', icon: Bell, badge: unreadNotifs > 0 ? String(unreadNotifs) : undefined, alert: unreadNotifs > 0 },
    { label: 'Profil & Sécurité', href: '/vendeur/profil', icon: User },
    { label: 'Support & Aide', href: '/vendeur/support', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex font-sans select-none">
      {/* ================= 1. SIDEBAR DESKTOP PROFESSIONNELLE ================= */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#071328] text-white border-r border-slate-800 flex-shrink-0 z-30 sticky top-0 h-screen justify-between p-5">
        <div className="space-y-6">
          {/* Logo & Espace Boutiquier */}
          <div className="space-y-3">
            <Link href="/" className="hover:opacity-90 transition block">
              <BrandLogo size="md" variant="light" layout="horizontal" />
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 text-xs font-bold tracking-wide">
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>ESPACE BOUTIQUIER</span>
            </div>
          </div>

          {/* Capsule Boutique Actuelle */}
          <div className="bg-[#0c1a35] border border-slate-700/80 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black text-xs shadow-inner flex-shrink-0 overflow-hidden">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.shopName} className="w-full h-full object-cover" />
                ) : (
                  profile.shopName.substring(0, 2).toUpperCase()
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs text-white truncate">{profile.shopName}</h3>
                {profile.isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active & En ligne
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    En attente de validation ⏳
                  </span>
                )}
              </div>
            </div>

            <Link
              href={`/boutiques/${profile.shopSlug || 'style-and-mode'}/produits`}
              target="_blank"
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300 text-[11px] font-semibold rounded-lg transition"
            >
              <span>Voir ma vitrine</span>
              <ArrowUpRight className="w-3 h-3 text-amber-400" />
            </Link>
          </div>

          {/* Menu de Navigation Vendeur */}
          <nav className="space-y-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    item.active
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${item.active ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        item.active
                          ? 'bg-slate-950 text-amber-400'
                          : item.alert
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bas de Sidebar : Profil & Retour Marketplace */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au Marketplace</span>
          </Link>

          <Link href="/vendeur/profil" className="flex items-center gap-3 pt-2 hover:opacity-85 transition">
            <div className="w-9 h-9 rounded-full bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center font-bold text-xs overflow-hidden">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                profile.name.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-xs font-bold text-white truncate">{profile.name}</p>
              <p className="text-[10px] text-slate-400">{profile.badge} 👑</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* ================= 2. PANNEAU PRINCIPAL DU TABLEAU DE BORD ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Desktop & Mobile Responsive */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
          {/* Titre & Message de Bienvenue */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Tableau de bord
              </h1>
              {profile.isVerified ? (
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  Boutique Ouverte 🟢
                </span>
              ) : (
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                  En attente de validation 🟡
                </span>
              )}
            </div>
            <p className="hidden md:block text-xs text-slate-500 font-medium">
              Bonjour {profile.name.split(' ')[0]} 👋, voici le résumé de l&apos;activité de votre boutique aujourd&apos;hui.
            </p>
          </div>

          {/* Raccourcis Actions & Profil */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/vendeur/produits/ajouter"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2 rounded-full transition shadow-xs flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3px]" />
              <span className="hidden sm:inline">Nouveau produit</span>
              <span className="sm:hidden">Ajouter</span>
            </Link>

            <Link
              href={`/boutiques/${profile.shopSlug || 'style-and-mode'}/produits`}
              target="_blank"
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-amber-600 border border-slate-200 rounded-full px-3.5 py-2 hover:bg-slate-50 transition"
            >
              <span>Boutique en direct</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/vendeur/notifications"
              className="relative p-2 text-slate-600 hover:text-amber-600 hover:bg-slate-100 rounded-full transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5 stroke-[2px]" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </Link>

            <Link
              href="/vendeur/profil"
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition"
            >
              <div className="w-7 h-7 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center text-xs font-bold overflow-hidden border border-amber-400/30">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  profile.name.substring(0, 2).toUpperCase()
                )}
              </div>
              <span className="text-xs font-bold text-slate-800 hidden md:inline">
                {profile.shopName} ▾
              </span>
            </Link>
          </div>
        </header>

        {/* Contenu de la page avec grille aérée */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Bannière d'attente de validation Super Admin & WhatsApp */}
          {!profile.isVerified && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 border-amber-400/80 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-white p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20">
                  <Clock className="h-6 w-6 stroke-[2.3px]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-black text-slate-900">
                      Boutique &ldquo;{profile.shopName}&rdquo; en attente d&apos;approbation
                    </h3>
                    <span className="inline-flex rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-900">
                      ⏳ En attente de validation Super Admin
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-2xl">
                    Votre boutique a été transmise au Super Admin. Pour accélérer sa validation et commencer à publier vos produits immédiatement, échangez directement avec le Super Admin sur WhatsApp au <strong>+221 77 171 90 13</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={`https://wa.me/221771719013?text=${encodeURIComponent(
                    `Bonjour Super Admin Malick Buss, je viens de créer ma boutique "${profile.shopName}" (Commerçant: ${profile.name}, Tél: ${profile.phone}). Pouvez-vous vérifier et valider ma boutique s'il vous plaît ? Merci !`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3 text-xs font-black text-white shadow-md shadow-emerald-600/20 transition active:scale-95"
                >
                  <MessageCircle className="h-4 w-4 fill-white/20 stroke-[2.2px]" />
                  <span>Demander validation sur WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
          {/* ================= 3. LES 4 CARTES KPI EXÉCUTIVES ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* KPI 1 : Chiffre d'affaires du jour */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Ventes du jour
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 stroke-[2.2px]" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {formatFCFA(48750)}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <TrendingUp className="w-3 h-3" /> +12%
                  </span>
                  <span className="text-slate-400 font-medium">vs hier</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>Semaine active</span>
                <span className="font-bold text-slate-700">{formatFCFA(187500)}</span>
              </div>
            </motion.div>

            {/* KPI 2 : Commandes reçues */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Commandes reçues
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 stroke-[2.2px]" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  12 <span className="text-xs font-bold text-slate-400">commandes</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="inline-flex items-center gap-0.5 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <TrendingUp className="w-3 h-3" /> +20%
                  </span>
                  <span className="text-slate-400 font-medium">cette semaine</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>À expédier aujourd&apos;hui</span>
                <span className="font-bold text-amber-600">5 colis</span>
              </div>
            </motion.div>

            {/* KPI 3 : Produits en vente */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Produits actifs
                </span>
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                  <Package className="w-5 h-5 stroke-[2.2px]" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  24 <span className="text-xs font-bold text-slate-400">en ligne</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs">
                  <span className="inline-flex items-center gap-0.5 text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/60">
                    +2 cette semaine
                  </span>
                  <span className="text-slate-400 font-medium">en stock</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                <span>En attente de validation</span>
                <span className="font-bold text-slate-700">3 articles</span>
              </div>
            </motion.div>

            {/* KPI 4 : Solde & Commission Wave */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-br from-[#0c1a35] to-[#071328] text-white rounded-2xl border border-amber-400/30 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Solde Retirable
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#1da1f2]/20 text-[#1da1f2] border border-[#1da1f2]/40 font-black text-sm flex items-center justify-center">
                  W
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-white tracking-tight">
                  {formatFCFA(28750)}
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Disponible instantanément</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between">
                <Link
                  href="/vendeur/retraits"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs py-1.5 px-3 rounded-lg flex items-center justify-center gap-1 transition"
                >
                  <span>Demander un retrait</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.5px]" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ================= 4. GRILLE CENTRALE DOUBLE COLONNE (GRAPHIQUE + TÂCHES) ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* COLONNE GAUCHE (8 COLONNES) : GRAPHIQUE DES VENTES & COMMANDES RÉCENTES */}
            <div className="lg:col-span-8 space-y-6">
              {/* Graphique Ventes des 7 derniers jours avec barres interactives */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-amber-500 stroke-[2.2px]" />
                      <span>Évolution des ventes</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Total de la semaine : <strong className="text-slate-900 font-extrabold">{formatFCFA(187500)}</strong> (+18%)
                    </p>
                  </div>

                  <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
                    <button
                      type="button"
                      onClick={() => setSelectedPeriod('7j')}
                      className={`px-3 py-1 rounded-lg transition ${
                        selectedPeriod === '7j'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'hover:text-slate-900'
                      }`}
                    >
                      7 derniers jours
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPeriod('30j')}
                      className={`px-3 py-1 rounded-lg transition ${
                        selectedPeriod === '30j'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'hover:text-slate-900'
                      }`}
                    >
                      30 jours
                    </button>
                  </div>
                </div>

                {/* Barres Graphiques avec Tooltips interactifs */}
                <div className="h-48 flex items-end justify-between pt-6 px-2 sm:px-6 gap-2 sm:gap-4 border-b border-slate-100 pb-2">
                  {weeklySales.map((w, index) => {
                    const isHovered = hoveredDay === index;
                    return (
                      <div
                        key={w.day}
                        onMouseEnter={() => setHoveredDay(index)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer relative"
                      >
                        {/* Tooltip flottant au survol */}
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-10 bg-slate-900 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap z-20"
                          >
                            <span>{formatFCFA(w.amount)}</span>
                            <span className="text-slate-400 block text-[9px]">({w.orders} cmd)</span>
                          </motion.div>
                        )}

                        {/* Colonne de barre */}
                        <div className="w-8 sm:w-11 bg-slate-100/80 rounded-t-xl h-full flex items-end justify-center overflow-hidden p-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${w.height}%` }}
                            transition={{ duration: 0.6, delay: index * 0.05, ease: 'easeOut' }}
                            className={`w-full rounded-t-lg transition-colors ${
                              isHovered
                                ? 'bg-amber-400 shadow-md shadow-amber-400/40'
                                : 'bg-gradient-to-t from-emerald-600 to-emerald-500 group-hover:from-amber-500 group-hover:to-amber-400'
                            }`}
                          />
                        </div>
                        <span className={`text-xs mt-2 font-bold ${isHovered ? 'text-amber-600' : 'text-slate-500'}`}>
                          {w.day}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-emerald-500" />
                      <span>Ventes validées</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-amber-400" />
                      <span>Jour sélectionné</span>
                    </span>
                  </div>
                  <span className="text-slate-400 font-medium">Mise à jour en temps réel</span>
                </div>
              </div>

              {/* Tableau des Commandes Récentes */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-emerald-600 stroke-[2.2px]" />
                      <span>Commandes récentes</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Vos dernières ventes effectuées sur Malick Buss
                    </p>
                  </div>
                  <Link
                    href="/vendeur/commandes"
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    <span>Toutes les commandes</span>
                    <span>→</span>
                  </Link>
                </div>

                {/* Table Responsive */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 font-bold">N° Commande</th>
                        <th className="py-2.5 font-bold">Client</th>
                        <th className="py-2.5 font-bold">Articles</th>
                        <th className="py-2.5 font-bold">Montant</th>
                        <th className="py-2.5 font-bold">Paiement</th>
                        <th className="py-2.5 font-bold">Statut</th>
                        <th className="py-2.5 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 font-extrabold text-slate-900">{order.id}</td>
                          <td className="py-3">
                            <span className="font-bold text-slate-900 block">{order.client}</span>
                            <span className="text-[10px] text-slate-400">{order.time}</span>
                          </td>
                          <td className="py-3 text-slate-600 max-w-[160px] truncate">{order.items}</td>
                          <td className="py-3 font-black text-slate-900">{formatFCFA(order.amount)}</td>
                          <td className="py-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                              {order.payment}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${order.statusColor}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <Link
                              href="/vendeur/commandes"
                              className="text-xs font-bold text-amber-600 hover:text-amber-700 underline"
                            >
                              Détails
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* COLONNE DROITE (4 COLONNES) : ACTIONS PRIORITAIRES & PERFORMANCE */}
            <div className="lg:col-span-4 space-y-6">
              {/* Carte "À faire en priorité" */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 stroke-[2.2px]" />
                    <span>À faire en priorité</span>
                  </h3>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full">
                    3 tâches
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Action 1 */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 hover:bg-amber-50 transition">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">3 produits à valider</h4>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          Complétez la description avant publication
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/vendeur/produits"
                      className="text-[11px] font-bold text-amber-800 hover:text-amber-900 underline flex-shrink-0"
                    >
                      Vérifier
                    </Link>
                  </div>

                  {/* Action 2 */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 hover:bg-emerald-50 transition">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">5 commandes à préparer</h4>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          À remettre au livreur avant 16h
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/vendeur/commandes"
                      className="text-[11px] font-bold text-emerald-800 hover:text-emerald-900 underline flex-shrink-0"
                    >
                      Expédier
                    </Link>
                  </div>

                  {/* Action 3 */}
                  <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-sky-50/70 border border-sky-200/60 hover:bg-sky-50 transition">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Retrait Wave prêt</h4>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          18 500 FCFA disponibles au transfert
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/vendeur/retraits"
                      className="text-[11px] font-bold text-sky-800 hover:text-sky-900 underline flex-shrink-0"
                    >
                      Retirer
                    </Link>
                  </div>
                </div>
              </div>

              {/* Performance & Score de la boutique */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span>Score Boutique Malick Buss</span>
                  </h3>
                  <span className="text-xs font-black text-slate-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    4,9 / 5
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-600 font-semibold mb-1">
                      <span>Taux de satisfaction client</span>
                      <span className="font-bold text-slate-900">98.7%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-2 rounded-full w-[98%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 font-semibold mb-1">
                      <span>Expédition dans les délais (24h)</span>
                      <span className="font-bold text-slate-900">99.4%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-2 rounded-full w-[99%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 font-semibold mb-1">
                      <span>Réactivité aux messages clients</span>
                      <span className="font-bold text-slate-900">&lt; 15 min</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-400 h-2 rounded-full w-[92%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Support Dédié Boutiquier */}
              <div className="bg-gradient-to-br from-[#0c1a35] to-[#071328] rounded-2xl p-5 text-white border border-slate-700 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                    <HelpCircle className="w-5 h-5 stroke-[2.2px]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Besoin d&apos;assistance ?</h4>
                    <p className="text-[11px] text-slate-300">Votre conseiller dédié Dakar est en ligne</p>
                  </div>
                </div>

                <a
                  href="https://wa.me/221771719013?text=Bonjour%20Malick%20Buss%2C%20j%27ai%20besoin%20d%27assistance%20vendeur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-emerald-500/20"
                >
                  <MessageCircle className="w-4 h-4 stroke-[2.5px]" />
                  <span>Contacter sur WhatsApp (77 171 90 13)</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Navigation Mobile Inférieure (Uniquement sur écran &lt; md) */}
      <VendorBottomNavigation activeTab="dashboard" />
    </div>
  );
}
