'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CircleCheck,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  Pause,
  RotateCcw,
  Store,
  X,
  ExternalLink,
  Settings,
  Edit3,
  Save,
  RotateCcw as ResetIcon,
} from 'lucide-react';
import {
  AdminApiError,
  AdminShop,
  getAdminShops,
  updateAdminShopStatus,
} from '../../services/admin-api';
import {
  getPlatformSettings,
  savePlatformSettings,
  generateValidationApprovalMessage,
  buildWhatsAppUrl,
  formatPhoneForWhatsApp,
  PlatformSettings,
} from '../../services/platformSettingsStore';

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
  const [approvedShopModal, setApprovedShopModal] = useState<AdminShop | null>(null);

  // Platform & WhatsApp settings (dynamic, non-figé)
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(getPlatformSettings());
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState<PlatformSettings>(platformSettings);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // Approval modal editable state
  const [approvalMessage, setApprovalMessage] = useState('');
  const [vendorPhoneInput, setVendorPhoneInput] = useState('');

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
      if (status === 'ACTIVE') {
        const phone = updatedShop.owner.phoneNumber || '';
        setVendorPhoneInput(phone);
        setApprovalMessage(
          generateValidationApprovalMessage({
            shopName: updatedShop.name,
            vendorName: updatedShop.owner.fullName,
            vendorPhone: phone,
          })
        );
        setApprovedShopModal(updatedShop);
      }
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setTempSettings(platformSettings);
                setSettingsSavedSuccess(false);
                setIsSettingsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
              title="Configurer les numéros et modèles WhatsApp"
            >
              <Settings className="h-3.5 w-3.5 text-emerald-700" />
              <span>Paramètres WhatsApp ({platformSettings.superAdminPhone})</span>
            </button>
            <Link href="/" className="hidden text-sm font-semibold text-emerald-800 hover:underline sm:block">Tableau de bord</Link>
          </div>
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

      {/* Modal de Confirmation & Notification WhatsApp au Vendeur (Entièrement personnalisable) */}
      {approvedShopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 my-8 space-y-4">
            <button
              type="button"
              onClick={() => setApprovedShopModal(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shrink-0">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Boutique approuvée avec succès ! 🎉</h2>
                <p className="text-xs text-slate-500 font-medium">Le statut est désormais actif sur la marketplace</p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Boutique :</span>
                <span className="font-bold text-slate-900">{approvedShopModal.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Commerçant :</span>
                <span className="font-bold text-slate-900">{approvedShopModal.owner.fullName}</span>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200">
                <label className="text-slate-600 font-medium whitespace-nowrap">N° WhatsApp Vendeur :</label>
                <input
                  type="tel"
                  value={vendorPhoneInput}
                  onChange={(e) => setVendorPhoneInput(e.target.value)}
                  className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-bold text-slate-900 focus:border-emerald-600 focus:outline-none w-48 text-right"
                  placeholder="Ex: 77 123 45 67"
                />
              </div>
            </div>

            {/* Zone de texte du message modifiable en direct */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Message WhatsApp (Modifiable avant envoi) :</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setApprovalMessage(
                      generateValidationApprovalMessage({
                        shopName: approvedShopModal.name,
                        vendorName: approvedShopModal.owner.fullName,
                        vendorPhone: vendorPhoneInput,
                      })
                    );
                  }}
                  className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-medium"
                >
                  <ResetIcon className="h-3 w-3" />
                  Réinitialiser
                </button>
              </div>
              <textarea
                value={approvalMessage}
                onChange={(e) => setApprovalMessage(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none resize-none leading-relaxed"
                placeholder="Votre message de félicitations et d'activation..."
              />
              <p className="text-[11px] text-slate-500">
                Vous pouvez ajouter des instructions personnalisées avant d&apos;envoyer le message au commerçant.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={buildWhatsAppUrl(vendorPhoneInput, approvalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setApprovedShopModal(null)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 shadow-md shadow-emerald-600/20 transition active:scale-98"
              >
                <MessageCircle className="h-4 w-4 fill-white/20 stroke-[2.2px]" />
                <span>Envoyer au vendeur ({formatPhoneForWhatsApp(vendorPhoneInput)})</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={() => setApprovedShopModal(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Configuration Générale WhatsApp Super Admin (Non figé) */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 my-8 space-y-4">
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shrink-0">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Configuration WhatsApp Super Admin</h2>
                <p className="text-xs text-slate-500 font-medium">Toutes ces coordonnées et modèles sont 100% dynamiques et modifiables.</p>
              </div>
            </div>

            {settingsSavedSuccess && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Paramètres enregistrés et synchronisés avec succès !
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Numéro WhatsApp Super Admin (Validation des boutiques)
                </label>
                <input
                  type="text"
                  value={tempSettings.superAdminPhone}
                  onChange={(e) => setTempSettings({ ...tempSettings, superAdminPhone: e.target.value })}
                  placeholder="Ex: 77 171 90 13"
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 mt-0.5">
                  C&apos;est vers ce numéro WhatsApp que les nouveaux commerçants sont redirigés à la création.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nom d&apos;affichage du Super Admin
                </label>
                <input
                  type="text"
                  value={tempSettings.superAdminName}
                  onChange={(e) => setTempSettings({ ...tempSettings, superAdminName: e.target.value })}
                  placeholder="Ex: Super Admin Malick Buss"
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Numéro de Support Client WhatsApp
                </label>
                <input
                  type="text"
                  value={tempSettings.supportPhone}
                  onChange={(e) => setTempSettings({ ...tempSettings, supportPhone: e.target.value })}
                  placeholder="Ex: 77 171 90 13"
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Modèle du message d&apos;approbation commerçant
                </label>
                <textarea
                  value={tempSettings.validationApprovalMessage}
                  onChange={(e) => setTempSettings({ ...tempSettings, validationApprovalMessage: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none resize-none leading-relaxed"
                />
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Variables disponibles : <code>{'{vendorName}'}</code>, <code>{'{shopName}'}</code>, <code>{'{vendorPhone}'}</code>
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  const saved = savePlatformSettings(tempSettings);
                  setPlatformSettings(saved);
                  setSettingsSavedSuccess(true);
                  setTimeout(() => {
                    setSettingsSavedSuccess(false);
                    setIsSettingsModalOpen(false);
                  }, 800);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 px-4 shadow-md transition"
              >
                <Save className="h-4 w-4" />
                <span>Enregistrer la configuration</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}