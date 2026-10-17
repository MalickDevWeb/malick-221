import Link from 'next/link';
import { Store, Percent, AlertTriangle, Users, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header Back-Office */}
      <header className="border-b border-slate-800 bg-slate-900 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-md shadow-emerald-950">
            MB
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">Malick Buss — Super Administration</h1>
            <p className="text-xs text-slate-400">Marketplace Multi-Boutiques • Région Sénégal</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs px-3 py-1 rounded-full font-medium">
            PostgreSQL 16 • En ligne
          </span>
          <span className="text-xs text-slate-400">Devise : <strong>FCFA (XOF)</strong></span>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Métriques Clés */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Indicateurs de Performance Plateforme</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase">Boutiques Actives</span>
                <Store className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-black text-white">2</p>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% conformes KYC
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase">Commissions Exigibles</span>
                <Percent className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-black text-emerald-400">42 500 FCFA</p>
              <span className="text-xs text-slate-400 font-medium">
                Taux moyen : 10.0%
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase">Dossiers KYC en Attente</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-3xl font-black text-amber-400">1</p>
              <span className="text-xs text-amber-400/90 font-medium">
                Vérification d'identité requise
              </span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase">Litiges / Réclamations</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <p className="text-3xl font-black text-rose-400">0</p>
              <span className="text-xs text-slate-400 font-medium">
                Aucun litige ouvert
              </span>
            </div>
          </div>
        </div>

        {/* Section Boutiques & Commission */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des Boutiques */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Boutiques Partenaires Récentes</h3>
                <p className="text-xs text-slate-400">Suivi des agréments et volumes de vente</p>
              </div>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-lg">
                2 Partenaires agréés
              </span>
            </div>

            <div className="divide-y divide-slate-800">
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-white">
                    KF
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      Keur Friperie Dakar
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <p className="text-xs text-slate-400">Sandaga / Plateau • Wave: +221 77 123 45 67</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-900">
                    Active • 10% com.
                  </span>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-white">
                    DS
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      Dakar Streetwear
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </h4>
                    <p className="text-xs text-slate-400">Almadies / Ngor • Orange Money: +221 77 234 56 78</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-900">
                    Active • 10% com.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grille des Commissions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Grille Tarifaire Plateforme</h3>
              <p className="text-xs text-slate-400">Taux de commissionnement par univers</p>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Friperie & Vêtements</h4>
                  <p className="text-[11px] text-slate-400">Hors frais de livraison</p>
                </div>
                <span className="text-sm font-black text-emerald-400">10.0%</span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Streetwear & Marques</h4>
                  <p className="text-[11px] text-slate-400">Sur article après remise</p>
                </div>
                <span className="text-sm font-black text-emerald-400">10.0%</span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Électronique & Tech</h4>
                  <p className="text-[11px] text-slate-400">Plafond max configurable</p>
                </div>
                <span className="text-sm font-black text-emerald-400">8.0%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
