'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Phone,
  MessageCircle,
  User,
  CheckCircle2,
  X,
  Plus,
  Shield,
  Bell,
  Globe,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<'adresses' | 'parametres' | 'support' | 'deconnexion' | null>(null);

  // Données interactives d'adresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Domicile (Dakar Plateau)',
      address: 'Avenue Léopold Sédar Senghor, Immeuble A, Apt 4',
      city: 'Dakar',
      isDefault: true,
      phone: '+221 77 123 45 67',
    },
    {
      id: 2,
      name: 'Bureau (Almadies)',
      address: 'Route des Almadies, en face Pharmacie des Almadies',
      city: 'Dakar',
      isDefault: false,
      phone: '+221 78 456 78 90',
    },
  ]);

  // Paramètres utilisateur
  const [userName, setUserName] = useState('Malick Buss');
  const [userPhone, setUserPhone] = useState('+221 77 123 45 67');
  const [userEmail, setUserEmail] = useState('client@malickbuss.sn');
  const [notifOrders, setNotifOrders] = useState(true);
  const [notifPromos, setNotifPromos] = useState(true);
  const [language, setLanguage] = useState<'FR' | 'WO'>('FR');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => {
      setSettingsSaved(false);
      setActiveModal(null);
    }, 1200);
  };

  const handleLogout = () => {
    setActiveModal(null);
    router.push('/splash');
  };

  return (
    <div className="w-full bg-[#fafafa] min-h-screen pb-16">
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Header Mon profil */}
        <header className="bg-white rounded-2xl border border-slate-100 px-4 py-3 shadow-2xs flex items-center justify-between">
          <h1 className="font-black text-base md:text-lg text-slate-900">
            Mon profil client
          </h1>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
            Client Vérifié ✓
          </span>
        </header>

        {/* Carte Utilisateur MB */}
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-4 md:p-5 shadow-2xs flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-900 text-amber-400 font-black text-lg md:text-xl flex items-center justify-center shadow-md flex-shrink-0 border-2 border-amber-400/40">
            MB
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="font-black text-sm md:text-base text-slate-900 truncate">
                {userName}
              </h2>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{userPhone}</p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span className="text-amber-600 font-bold">Client fidèle VIP</span>
              <span>•</span>
              <span>Membre depuis 2025</span>
            </div>
          </div>
        </div>

        {/* 2 Raccourcis Rapides Commandes & Favoris */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/commandes"
            className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:border-amber-300 hover:shadow-xs transition group flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 block">Commandes</span>
                <span className="text-[10px] text-slate-400">2 actives</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
          </Link>

          <Link
            href="/favoris"
            className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-2xs hover:border-rose-300 hover:shadow-xs transition group flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-105 transition">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-900 block">Favoris</span>
                <span className="text-[10px] text-slate-400">3 articles</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        {/* Menu Options Interactif */}
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {/* 1. Mes commandes */}
          <Link
            href="/commandes"
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 stroke-[2.2px]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Mes commandes</span>
                <span className="text-[10px] text-slate-400">Suivi d'expédition et historique</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* 2. Mes favoris */}
          <Link
            href="/favoris"
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <Heart className="w-4 h-4 stroke-[2.2px]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Mes favoris</span>
                <span className="text-[10px] text-slate-400">Articles sauvegardés pour plus tard</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* 3. Mes adresses */}
          <button
            onClick={() => setActiveModal('adresses')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin className="w-4 h-4 stroke-[2.2px]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Mes adresses</span>
                <span className="text-[10px] text-slate-400">Dakar Plateau, Almadies (2 adresses)</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 4. Paramètres */}
          <button
            onClick={() => setActiveModal('parametres')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Settings className="w-4 h-4 stroke-[2.2px]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Paramètres du compte</span>
                <span className="text-[10px] text-slate-400">Coordonnées, notifications, langue</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 5. Aide & Support */}
          <button
            onClick={() => setActiveModal('support')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 stroke-[2.2px]" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Aide & support</span>
                <span className="text-[10px] text-slate-400">WhatsApp direct, appel gratuit, FAQ</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* 6. Déconnexion */}
          <button
            onClick={() => setActiveModal('deconnexion')}
            className="w-full p-4 flex items-center justify-between hover:bg-rose-50/50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <LogOut className="w-4 h-4 stroke-[2.2px]" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-600 block">Déconnexion</span>
                <span className="text-[10px] text-slate-400">Quitter la session en cours</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Bannière d'accès Espace Marchand / Vendeur */}
        <div className="pt-2">
          <Link
            href="/vendeur/dashboard"
            className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-sm border border-slate-800 flex items-center justify-between group transition active:scale-[0.98]"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block bg-amber-400/10 w-fit px-2 py-0.5 rounded-md border border-amber-400/20">
                Espace Marchand
              </span>
              <p className="text-xs sm:text-sm font-bold leading-tight">
                Ensemble, faisons grandir vos boutiques !
              </p>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Gérez vos stocks, commandes et commissions en direct.
              </p>
            </div>
            <span className="text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl shadow-md transition flex-shrink-0">
              Ouvrir →
            </span>
          </Link>
        </div>
      </div>

      {/* ================= MODAL 1 : MES ADRESSES ================= */}
      {activeModal === 'adresses' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Mes adresses de livraison</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`p-3.5 rounded-xl border transition ${
                    addr.isDefault
                      ? 'border-emerald-500 bg-emerald-50/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">{addr.name}</span>
                    {addr.isDefault && (
                      <span className="text-[9px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                        Par défaut
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">{addr.address}</p>
                  <p className="text-[11px] text-slate-400 mt-1">📞 {addr.phone}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                alert('Formulaire d’ajout d’adresse validé pour Dakar.');
                setActiveModal(null);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une nouvelle adresse</span>
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL 2 : PARAMÈTRES ================= */}
      {activeModal === 'parametres' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Paramètres du compte</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {settingsSaved ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900">Modifications enregistrées !</h4>
                <p className="text-xs text-slate-500">Votre profil a été mis à jour avec succès.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Numéro de téléphone (Wave & Orange Money)
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                    required
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <span className="text-xs font-bold text-slate-900 block">Notifications SMS & WhatsApp</span>
                  <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                    <span>Mises à jour des commandes</span>
                    <input
                      type="checkbox"
                      checked={notifOrders}
                      onChange={(e) => setNotifOrders(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600"
                    />
                  </label>
                  <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                    <span>Bons plans et réductions</span>
                    <input
                      type="checkbox"
                      checked={notifPromos}
                      onChange={(e) => setNotifPromos(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600"
                    />
                  </label>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Langue préférée</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLanguage('FR')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold ${
                        language === 'FR'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Français 🇫🇷
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('WO')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold ${
                        language === 'WO'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Wolof 🇸🇳
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs transition"
                >
                  Enregistrer les modifications
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ================= MODAL 3 : AIDE & SUPPORT ================= */}
      {activeModal === 'support' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Service Client Malick Buss</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Une question sur une commande, un retour d'article ou une boutique ? Notre équipe basée à Dakar vous répond 7j/7.
            </p>

            <div className="space-y-2.5">
              <a
                href="https://wa.me/221771234567"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 hover:bg-emerald-100 transition"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">WhatsApp Direct</h4>
                  <p className="text-[10px] text-emerald-700">+221 77 123 45 67 • Réponse en 2 min</p>
                </div>
              </a>

              <a
                href="tel:+221771234567"
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 text-slate-800 hover:bg-slate-100 transition"
              >
                <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Appel Téléphonique</h4>
                  <p className="text-[10px] text-slate-500">+221 77 123 45 67 (Numéro non surtaxé)</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 4 : DÉCONNEXION ================= */}
      {activeModal === 'deconnexion' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6 stroke-[2.2px]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-base text-slate-900">Souhaitez-vous vous déconnecter ?</h3>
              <p className="text-xs text-slate-500">
                Vous devrez vous reconnecter pour suivre vos commandes et voir vos favoris.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
