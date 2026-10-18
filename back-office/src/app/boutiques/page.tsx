'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CircleCheck, LoaderCircle, Pause, RotateCcw, Store, X } from 'lucide-react';
import {
  AdminApiError,
  AdminShop,
  getAdminShops,
  updateAdminShopStatus,
} from '../../services/admin-api';

const STATUS_LABELS: Record<AdminShop['status'], string> = {
  PENDING_VERIFICATION: 'À vérifier',
  ACTIVE: 'Active',
  SUSPENDED: 'Suspendue',
  REJECTED: 'Refusée',
};

const STATUS_STYLES: Record<AdminShop['status'], string> = {
  PENDING_VERIFICATION: 'bg-amber-50 text-amber-800 border-amber-200',
  ACTIVE: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  SUSPENDED: 'bg-slate-100 text-slate-700 border-slate-200',
  REJECTED: 'bg-rose-50 text-rose-800 border-rose-200',
};

export default function AdminShopsPage() {
  const router = useRouter();
  const [shops, setShops] = useState<AdminShop[]>([]);
  const [filter, setFilter] = useState<'ALL' | AdminShop['status']>('ALL');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('super-admin-token');
    if (!token) {
      router.replace('/connexion');
      return;
    }

    getAdminShops(token)
      .then(setShops)
      .catch((cause: unknown) => {
        if (cause instanceof AdminApiError && (cause.status === 401 || cause.status === 403)) {
          sessionStorage.removeItem('super-admin-token');
          sessionStorage.removeItem('super-admin-name');
          router.replace('/connexion');
          return;
        }
        setError('Impossible de charger les boutiques. Vérifie la connexion à l’API.');
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function changeStatus(shop: AdminShop, status: AdminShop['status']) {
    const token = sessionStorage.getItem('super-admin-token');
    if (!token) {
      router.replace('/connexion');
      return;
    }

    setUpdatingId(shop.id);
    setError('');
    try {
      const updatedShop = await updateAdminShopStatus(token, shop.id, status);
      setShops((current) => current.map((item) => item.id === updatedShop.id ? updatedShop : item));
    } catch (cause) {
      if (cause instanceof AdminApiError && (cause.status === 401 || cause.status === 403)) {
        sessionStorage.removeItem('super-admin-token');
        sessionStorage.removeItem('super-admin-name');
        router.replace('/connexion');
        return;
      }
      setError('La modification du statut a échoué. Réessaie.');
    } finally {
      setUpdatingId(null);
    }
  }

  const visibleShops = filter === 'ALL' ? shops : shops.filter((shop) => shop.status === filter);

  return (
    <main className="min-h-screen bg-[#f3f4ef] text-slate-950">
      <header className="border-b border-slate-200 bg-white px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Retour au tableau de bord" className="rounded-md p-2 text-slate-600 hover:bg-slate-100">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <p className="text-xs font-semibold text-emerald-800">Super Administration</p>
              <h1 className="text-xl font-black">Gestion des boutiques</h1>
            </div>
          </div>
          <Link href="/" className="hidden text-sm font-semibold text-emerald-800 hover:underline sm:block">Tableau de bord</Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-7 md:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Store className="h-4 w-4" />
            <span>{shops.length} boutique{shops.length === 1 ? '' : 's'}</span>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            Statut
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as typeof filter)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-700"
            >
              <option value="ALL">Tous</option>
              <option value="PENDING_VERIFICATION">À vérifier</option>
              <option value="ACTIVE">Actives</option>
              <option value="SUSPENDED">Suspendues</option>
              <option value="REJECTED">Refusées</option>
            </select>
          </label>
        </div>

        {error && <p role="alert" className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}

        <div className="overflow-hidden border-y border-slate-200 bg-white">
          <div className="hidden grid-cols-[minmax(180px,1.3fr)_minmax(200px,1.2fr)_100px_130px_190px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-bold uppercase text-slate-500 md:grid">
            <span>Boutique</span><span>Vendeur</span><span>Produits</span><span>Statut</span><span>Actions</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500"><LoaderCircle className="h-4 w-4 animate-spin" /> Chargement des boutiques…</div>
          ) : visibleShops.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500">Aucune boutique pour ce filtre.</div>
          ) : (
            visibleShops.map((shop) => (
              <article key={shop.id} className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0 md:grid-cols-[minmax(180px,1.3fr)_minmax(200px,1.2fr)_100px_130px_190px] md:items-center md:gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{shop.name}</p>
                  <p className="truncate text-xs text-slate-500">/{shop.slug}</p>
                </div>
                <div className="min-w-0 text-xs">
                  <p className="truncate font-semibold text-slate-800">{shop.owner.fullName}</p>
                  <p className="truncate text-slate-500">{shop.owner.email || shop.owner.phoneNumber}</p>
                </div>
                <p className="text-xs text-slate-600">{shop._count.products} produit{shop._count.products === 1 ? '' : 's'}</p>
                <span className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-bold ${STATUS_STYLES[shop.status]}`}>
                  {STATUS_LABELS[shop.status]}
                </span>
                <div className="flex flex-wrap gap-2">
                  {shop.status === 'PENDING_VERIFICATION' && (
                    <>
                      <button disabled={updatingId === shop.id} onClick={() => changeStatus(shop, 'ACTIVE')} title="Approuver" aria-label={`Approuver ${shop.name}`} className="inline-flex items-center gap-1 rounded-md bg-emerald-700 px-2.5 py-2 text-[11px] font-bold text-white hover:bg-emerald-800 disabled:opacity-50">
                        <CircleCheck className="h-3.5 w-3.5" /> Approuver
                      </button>
                      <button disabled={updatingId === shop.id} onClick={() => changeStatus(shop, 'REJECTED')} title="Refuser" aria-label={`Refuser ${shop.name}`} className="inline-flex items-center gap-1 rounded-md border border-rose-200 px-2.5 py-2 text-[11px] font-bold text-rose-800 hover:bg-rose-50 disabled:opacity-50">
                        <X className="h-3.5 w-3.5" /> Refuser
                      </button>
                    </>
                  )}
                  {shop.status === 'ACTIVE' && (
                    <button disabled={updatingId === shop.id} onClick={() => changeStatus(shop, 'SUSPENDED')} title="Suspendre" aria-label={`Suspendre ${shop.name}`} className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                      <Pause className="h-3.5 w-3.5" /> Suspendre
                    </button>
                  )}
                  {shop.status === 'SUSPENDED' && (
                    <button disabled={updatingId === shop.id} onClick={() => changeStatus(shop, 'ACTIVE')} title="Réactiver" aria-label={`Réactiver ${shop.name}`} className="inline-flex items-center gap-1 rounded-md border border-emerald-200 px-2.5 py-2 text-[11px] font-bold text-emerald-800 hover:bg-emerald-50 disabled:opacity-50">
                      <RotateCcw className="h-3.5 w-3.5" /> Réactiver
                    </button>
                  )}
                  {updatingId === shop.id && <LoaderCircle className="h-4 w-4 animate-spin text-slate-400" />}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}