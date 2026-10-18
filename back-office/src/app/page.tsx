'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Crown,
  LayoutDashboard,
  Store,
  Users,
  Package,
  ShoppingBag,
  Percent,
  UserCheck,
  Settings,
  TrendingUp,
  LogOut,
} from 'lucide-react';
import { formatFCFA } from '../../../frontend/src/services/api';
import { AdminApiError, AdminDashboardData, getAdminDashboard } from '../services/admin-api';

export default function AdminScreen13Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [adminName, setAdminName] = useState('Super Admin');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('super-admin-token');
    if (!token) {
      router.replace('/connexion');
      return;
    }

    setAdminName(sessionStorage.getItem('super-admin-name') || 'Super Admin');
    getAdminDashboard(token)
      .then(setData)
      .catch((error: unknown) => {
        if (error instanceof AdminApiError && (error.status === 401 || error.status === 403)) {
          sessionStorage.removeItem('super-admin-token');
          sessionStorage.removeItem('super-admin-name');
          router.replace('/connexion');
          return;
        }
        setLoadError('Impossible de charger les données. Vérifie que l’API est démarrée puis actualise la page.');
      })
      .finally(() => setLoading(false));
  }, [router]);

  function logout() {
    sessionStorage.removeItem('super-admin-token');
    sessionStorage.removeItem('super-admin-name');
    router.replace('/connexion');
  }

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'shops', label: 'Boutiques', icon: Store },
    { id: 'vendors', label: 'Vendeurs', icon: Users },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingBag },
    { id: 'commissions', label: 'Commissions', icon: Percent },
    { id: 'users', label: 'Utilisateurs', icon: UserCheck },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Menu Latéral Gauche Écran 13 */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header avec Couronne Dorée */}
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Crown className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white leading-tight">
                Espace administrateur
              </h1>
              <span className="text-[10px] text-slate-400 block">{adminName}</span>
            </div>
          </div>

          {/* Liste des Liens de Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const className = `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`;

                if (item.id === 'shops') {
                  return <Link key={item.id} href="/boutiques" className={className}><Icon className="w-4 h-4 stroke-[2px]" /><span>{item.label}</span></Link>;
                }

                return (
                  <button key={item.id} disabled={item.id !== 'dashboard'} className={`${className} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400`}>
                    <Icon className="w-4 h-4 stroke-[2px]" />
                    <span>{item.label}</span>
                  </button>
                );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-2">
          <span className="text-[11px] text-slate-500">Sénégal • FCFA</span>
          <button onClick={logout} title="Se déconnecter" aria-label="Se déconnecter" className="p-2 text-slate-400 hover:text-white">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Contenu Principal Écran 13 */}
      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Tableau de bord</h2>
          <span className="bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium">
            {loading ? 'Chargement…' : 'Données à jour'}
          </span>
        </div>

        {/* 4 Cartes de KPI Écran 13 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total des ventes
            </span>
            <div className="text-xl font-black text-emerald-400">
              {formatFCFA(data?.metrics.salesToday ?? 0)}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">
              Ventes encaissées aujourd’hui
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Nombre de boutiques
            </span>
            <div className="text-xl font-black text-white">{data?.metrics.activeShops ?? 0}</div>
            <span className="text-[10px] text-amber-300 font-semibold">
              {data?.metrics.pendingShops ?? 0} en attente de validation
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Commandes aujourd'hui
            </span>
            <div className="text-xl font-black text-white">{data?.metrics.ordersToday ?? 0}</div>
            <span className="text-[10px] text-slate-400 font-semibold">
              {data?.metrics.vendors ?? 0} vendeurs inscrits
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Commissions du jour
            </span>
            <div className="text-xl font-black text-amber-400">
              {formatFCFA(data?.metrics.commissionsToday ?? 0)}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">
              {data?.metrics.products ?? 0} produits au catalogue
            </span>
          </div>
        </div>

        {/* Graphique / Aperçu des Transactions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Activité récente de la marketplace</h3>
              <p className="text-xs text-slate-400">Dernières commandes enregistrées</p>
            </div>
          </div>

          {loadError && <p role="alert" className="rounded-lg border border-rose-900 bg-rose-950/40 px-3 py-2 text-xs text-rose-200">{loadError}</p>}

          <div className="space-y-3 pt-2">
            {(data?.recentOrders ?? []).map((order) => (
              <div
                key={order.id}
                className="bg-slate-800/60 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-white">Commande {order.orderNumber}</h4>
                  <span className="text-[11px] text-slate-400">{order.shopName} · {new Date(order.createdAt).toLocaleString('fr-FR')}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-xs text-white block">{formatFCFA(order.amount)}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">{order.status}</span>
                </div>
              </div>
            ))}
            {!loading && !loadError && data?.recentOrders.length === 0 && (
              <p className="py-6 text-center text-xs text-slate-400">Aucune commande enregistrée.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
