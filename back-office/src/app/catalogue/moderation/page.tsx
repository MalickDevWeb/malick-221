'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, EyeOff, LoaderCircle, Search, X } from 'lucide-react';
import {
  AdminApiError,
  AdminProduct,
  getAdminProducts,
  updateAdminProductVisibility,
} from '../../../services/admin-api';

type VisibilityFilter = 'ALL' | 'PUBLISHED' | 'HIDDEN';
type PendingDecision = { product: AdminProduct; isPublished: boolean } | null;

function formatPrice(value: number | string) {
  return new Intl.NumberFormat('fr-SN', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 })
    .format(Number(value));
}

export default function ProductModerationPage() {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [filter, setFilter] = useState<VisibilityFilter>('HIDDEN');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [decision, setDecision] = useState<PendingDecision>(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('super-admin-token');
    if (!token) {
      router.replace('/connexion');
      return;
    }

    getAdminProducts(token)
      .then(setProducts)
      .catch((cause: unknown) => {
        if (cause instanceof AdminApiError && (cause.status === 401 || cause.status === 403)) {
          sessionStorage.removeItem('super-admin-token');
          sessionStorage.removeItem('super-admin-name');
          router.replace('/connexion');
          return;
        }
        setError('Impossible de charger les produits. Vérifie la connexion à l’API.');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const visibleProducts = products.filter((product) => {
    const matchesFilter = filter === 'ALL'
      || (filter === 'PUBLISHED' && product.isPublished)
      || (filter === 'HIDDEN' && !product.isPublished);
    const searchText = `${product.title} ${product.shop.name} ${product.shop.owner.fullName}`.toLowerCase();
    return matchesFilter && searchText.includes(search.trim().toLowerCase());
  });

  async function saveDecision() {
    const token = sessionStorage.getItem('super-admin-token');
    if (!token || !decision || reason.trim().length < 3) return;

    setSavingId(decision.product.id);
    setError('');
    try {
      const updated = await updateAdminProductVisibility(
        token,
        decision.product.id,
        decision.isPublished,
        reason.trim(),
      );
      setProducts((current) => current.map((product) => product.id === updated.id ? updated : product));
      setDecision(null);
      setReason('');
    } catch {
      setError('La décision n’a pas pu être enregistrée. Réessaie.');
    } finally {
      setSavingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f4ef] text-slate-950">
      <header className="border-b border-slate-200 bg-white px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <Link href="/" aria-label="Retour au tableau de bord" className="rounded-md p-2 text-slate-600 hover:bg-slate-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <p className="text-xs font-semibold text-emerald-800">Super Administration</p>
            <h1 className="text-xl font-black">Modération des produits</h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-7 md:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">{visibleProducts.length} produit{visibleProducts.length === 1 ? '' : 's'}</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher produit ou boutique"
                className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-700 sm:w-64"
              />
            </label>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as VisibilityFilter)}
              aria-label="Filtrer les produits"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-700"
            >
              <option value="HIDDEN">Non publiés</option>
              <option value="PUBLISHED">Publiés</option>
              <option value="ALL">Tous</option>
            </select>
          </div>
        </div>

        {error && <p role="alert" className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}

        <div className="overflow-hidden border-y border-slate-200 bg-white">
          <div className="hidden grid-cols-[minmax(200px,1.4fr)_minmax(170px,1fr)_120px_120px_150px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-bold uppercase text-slate-500 md:grid">
            <span>Produit</span><span>Boutique / vendeur</span><span>Prix</span><span>Visibilité</span><span>Action</span>
          </div>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-500"><LoaderCircle className="h-4 w-4 animate-spin" /> Chargement des produits…</div>
          ) : visibleProducts.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500">Aucun produit pour ce filtre.</div>
          ) : visibleProducts.map((product) => (
            <article key={product.id} className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0 md:grid-cols-[minmax(200px,1.4fr)_minmax(170px,1fr)_120px_120px_150px] md:items-center md:gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{product.title}</p>
                <p className="truncate text-xs text-slate-500">{product.stockQuantity} en stock</p>
              </div>
              <div className="min-w-0 text-xs">
                <p className="truncate font-semibold">{product.shop.name}</p>
                <p className="truncate text-slate-500">{product.shop.owner.fullName}</p>
              </div>
              <p className="text-sm font-semibold">{formatPrice(product.discountPrice ?? product.basePrice)}</p>
              <span className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-bold ${product.isPublished ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
                {product.isPublished ? 'Publié' : 'Non publié'}
              </span>
              <button
                type="button"
                disabled={savingId === product.id}
                onClick={() => {
                  setReason('');
                  setDecision({ product, isPublished: !product.isPublished });
                }}
                className={`inline-flex w-fit items-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold disabled:opacity-50 ${product.isPublished ? 'border border-slate-300 text-slate-700 hover:bg-slate-50' : 'bg-emerald-700 text-white hover:bg-emerald-800'}`}
              >
                {product.isPublished ? <EyeOff className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
                {product.isPublished ? 'Masquer' : 'Publier'}
              </button>
            </article>
          ))}
        </div>
      </section>

      {decision && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <form
            onSubmit={(event) => { event.preventDefault(); void saveDecision(); }}
            className="w-full max-w-md space-y-4 rounded-lg bg-white p-5 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="decision-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="decision-title" className="text-base font-black">{decision.isPublished ? 'Publier le produit' : 'Masquer le produit'}</h2>
                <p className="mt-1 text-sm text-slate-600">{decision.product.title}</p>
              </div>
              <button type="button" onClick={() => setDecision(null)} aria-label="Annuler" className="rounded-md p-1 text-slate-500 hover:bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            <label className="block text-sm font-semibold" htmlFor="decision-reason">Motif obligatoire</label>
            <textarea
              id="decision-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              minLength={3}
              maxLength={500}
              required
              rows={3}
              className="w-full rounded-md border border-slate-300 p-3 text-sm outline-none focus:border-emerald-700"
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setDecision(null)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">Annuler</button>
              <button type="submit" disabled={reason.trim().length < 3 || savingId === decision.product.id} className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-bold text-white disabled:opacity-50">
                {savingId === decision.product.id ? 'Enregistrement…' : 'Confirmer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}