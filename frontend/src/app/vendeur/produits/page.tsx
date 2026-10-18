'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Edit3,
  Trash2,
  Tag,
  Eye,
  Cloud,
  Check,
  X,
  RefreshCw,
  Power,
  Layers,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { VendorPortalShell } from '../../../components/layout/VendorPortalShell';
import {
  getVendorProducts,
  deleteVendorProduct,
  toggleVendorProductStatus,
  updateVendorProduct,
  VendorProduct,
} from '../../../services/productStore';
import { getCloudinaryConfig, saveCloudinaryConfig } from '../../../services/cloudinaryService';

export default function VendorProductsPage() {
  const [filter, setFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<VendorProduct[]>([]);
  const [productToDelete, setProductToDelete] = useState<VendorProduct | null>(null);
  const [showCloudinaryModal, setShowCloudinaryModal] = useState(false);
  const [cloudConfig, setCloudConfig] = useState({ cloudName: '', uploadPreset: '' });
  const [savedConfigMessage, setSavedConfigMessage] = useState(false);

  // Charger les produits réels depuis le store
  const loadProducts = () => {
    setProducts(getVendorProducts());
  };

  useEffect(() => {
    loadProducts();
    setCloudConfig(getCloudinaryConfig());

    const handleUpdate = () => loadProducts();
    window.addEventListener('malick_products_updated', handleUpdate);
    return () => window.removeEventListener('malick_products_updated', handleUpdate);
  }, []);

  const handleDelete = (id: string) => {
    deleteVendorProduct(id);
    setProductToDelete(null);
    loadProducts();
  };

  const handleToggleStatus = (id: string) => {
    toggleVendorProductStatus(id);
    loadProducts();
  };

  const handleAdjustStock = (id: string, delta: number) => {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;
    const nextStock = Math.max(0, prod.stock + delta);
    updateVendorProduct(id, { stock: nextStock });
    loadProducts();
  };

  const handleSaveCloudinary = (e: React.FormEvent) => {
    e.preventDefault();
    saveCloudinaryConfig(cloudConfig);
    setSavedConfigMessage(true);
    setTimeout(() => {
      setSavedConfigMessage(false);
      setShowCloudinaryModal(false);
    }, 800);
  };

  const filteredProducts = products
    .filter((p) => {
      if (filter === 'Tous') return true;
      if (filter === 'Stock Faible') return p.stock > 0 && p.stock <= 5;
      if (filter === 'Rupture') return p.stock === 0;
      if (filter === 'Désactivé') return p.status === 'Désactivé';
      return p.category === filter;
    })
    .filter((p) => {
      if (!searchTerm.trim()) return true;
      return (
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5 && p.status !== 'Désactivé').length;
  const outOfStockCount = products.filter((p) => p.stock === 0 && p.status !== 'Désactivé').length;

  return (
    <VendorPortalShell
      title="Catalogue & Gestion des Stocks"
      subtitle="Ajoutez des articles avec photos Cloudinary, ajustez vos prix et gérez vos stocks en direct."
      breadcrumbs={[{ label: 'Mes Produits' }]}
      actionElement={
        <div className="flex items-center gap-2">
          {/* Bouton Config Cloudinary */}
          <button
            type="button"
            onClick={() => setShowCloudinaryModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-sky-400/40 bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold transition shadow-2xs"
            title="Configurer Cloudinary pour l'upload d'images"
          >
            <Cloud className="w-3.5 h-3.5 text-sky-600" />
            <span>Cloudinary</span>
          </button>

          {/* Bouton Ajouter un produit */}
          <Link
            href="/vendeur/produits/ajouter"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2 rounded-full transition shadow-xs flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.8px]" />
            <span>Ajouter un produit</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* ================= 1. 4 CARTES KPI PRODUITS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Total Références</span>
            <div className="text-2xl font-black text-slate-900 mt-2">{products.length}</div>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Articles configurés</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Articles en Stock</span>
            <div className="text-2xl font-black text-slate-900 mt-2">
              {products.reduce((acc, p) => acc + p.stock, 0)}
            </div>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">Unités physiques</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">Stock Faible (&le; 5)</span>
            <div className="text-2xl font-black text-amber-600 mt-2">{lowStockCount}</div>
            <span className="text-[11px] text-amber-600 font-semibold block mt-1">À réapprovisionner</span>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 block">En Rupture</span>
            <div className="text-2xl font-black text-rose-600 mt-2">{outOfStockCount}</div>
            <span className="text-[11px] text-rose-600 font-semibold block mt-1">Stock épuisé</span>
          </div>
        </div>

        {/* ================= 2. RECHERCHE ET FILTRES ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par titre de produit ou catégorie..."
                className="w-full bg-[#f4f5f7] focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-full border border-slate-200/80 focus:border-amber-400 focus:outline-none transition"
              />
            </div>

            {/* Filtres par catégories et stock */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {['Tous', 'Vêtements', 'Chaussures', 'Accessoires', 'Stock Faible', 'Rupture', 'Désactivé'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition flex-shrink-0 ${
                    filter === tab
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ================= 3. GRILLE DE PRODUITS RESPONSIVE ================= */}
          {filteredProducts.length === 0 ? (
            <div className="py-14 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-slate-800">Aucun produit dans cette sélection</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Ajoutez un nouvel article ou modifiez vos filtres de recherche.
              </p>
              <Link
                href="/vendeur/produits/ajouter"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-950 rounded-full font-bold text-xs hover:bg-amber-300 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un produit</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between ${
                    item.status === 'Désactivé'
                      ? 'border-slate-200/60 opacity-75 bg-slate-50/50'
                      : 'border-slate-200/90'
                  }`}
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-3.5">
                      {/* Image du produit */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100 relative group">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=400&q=80'}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.image.includes('cloudinary') && (
                          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-sky-500 rounded-full flex items-center justify-center text-white text-[8px]" title="Image hébergée sur Cloudinary">
                            ☁️
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                          {item.category}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <div className="flex items-baseline gap-2 pt-0.5">
                          <span className="text-sm font-black text-slate-900">
                            {formatFCFA(item.price)}
                          </span>
                          {item.discountPrice && (
                            <span className="text-[11px] text-slate-400 line-through">
                              {formatFCFA(item.discountPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stock & Statut */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500 font-medium text-[11px]">Stock :</span>
                        {/* Contrôles de stock rapide (- / +) */}
                        <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 text-xs">
                          <button
                            type="button"
                            onClick={() => handleAdjustStock(item.id, -1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 font-bold transition"
                            title="Diminuer stock"
                          >
                            -
                          </button>
                          <span
                            className={`px-2 font-black ${
                              item.stock === 0
                                ? 'text-rose-600'
                                : item.stock <= 5
                                ? 'text-amber-600'
                                : 'text-slate-900'
                            }`}
                          >
                            {item.stock}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAdjustStock(item.id, 1)}
                            className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 font-bold transition"
                            title="Augmenter stock"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Badge Statut */}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          item.status === 'Actif'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === 'Stock Faible'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : item.status === 'Rupture'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions du bas */}
                  <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/boutiques/style-and-mode/produits`}
                      target="_blank"
                      className="text-[11px] font-semibold text-slate-600 hover:text-amber-600 transition flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Vitrine</span>
                    </Link>

                    <div className="flex items-center gap-1.5">
                      {/* Activer / Désactiver */}
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item.id)}
                        className={`p-1.5 rounded-lg transition ${
                          item.status === 'Désactivé'
                            ? 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                            : 'text-slate-500 hover:text-amber-600 hover:bg-amber-50'
                        }`}
                        title={item.status === 'Désactivé' ? 'Réactiver le produit' : 'Désactiver le produit'}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>

                      {/* Modifier */}
                      <Link
                        href={`/vendeur/produits/modifier?id=${item.id}`}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-slate-200/50 rounded-lg transition"
                        title="Modifier"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>

                      {/* Supprimer */}
                      <button
                        type="button"
                        onClick={() => setProductToDelete(item)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Supprimer définitivement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= MODALE CONFIRMATION DE SUPPRESSION ================= */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 stroke-[2px]" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-slate-900">Supprimer cet article ?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Êtes-vous sûr de vouloir retirer <strong className="text-slate-800">« {productToDelete.title} »</strong> de votre catalogue ?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => handleDelete(productToDelete.id)}
                className="py-2.5 px-4 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition shadow-xs"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODALE CONFIGURATION CLOUDINARY ================= */}
      {showCloudinaryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setShowCloudinaryModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Configuration Cloudinary</h3>
                <p className="text-[11px] text-slate-500">Téléversement cloud haute résolution</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Pour téléverser vos photos directement sur votre compte Cloudinary, entrez votre <strong>Cloud Name</strong> et votre <strong>Upload Preset (Unsigned)</strong>.
            </p>

            <form onSubmit={handleSaveCloudinary} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Cloud Name (Nom du Cloud)
                </label>
                <input
                  type="text"
                  value={cloudConfig.cloudName}
                  onChange={(e) => setCloudConfig({ ...cloudConfig, cloudName: e.target.value })}
                  placeholder="Ex: malick-buss ou dakar-fashion"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Upload Preset (Preset Non Signé)
                </label>
                <input
                  type="text"
                  value={cloudConfig.uploadPreset}
                  onChange={(e) => setCloudConfig({ ...cloudConfig, uploadPreset: e.target.value })}
                  placeholder="Ex: ml_default ou malick_preset"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200/70 p-3 rounded-xl text-[11px] text-amber-800 leading-relaxed">
                💡 <em>Note :</em> Si vous laissez vide ou si vous n&apos;avez pas encore de compte, le système utilise automatiquement le <strong>moteur résilient intégré</strong> pour afficher immédiatement vos images sans aucune coupure.
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCloudinaryModal(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  {savedConfigMessage ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5px]" />
                      <span>Enregistré !</span>
                    </>
                  ) : (
                    <span>Enregistrer</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </VendorPortalShell>
  );
}
