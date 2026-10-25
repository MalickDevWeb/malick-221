'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Camera,
  Check,
  Upload,
  X,
  AlertCircle,
  Cloud,
  Sparkles,
  Tag,
  DollarSign,
  Package,
  Layers,
  FileText,
} from 'lucide-react';
import { VendorPortalShell } from '../../../../components/layout/VendorPortalShell';
import { addVendorProduct } from '../../../../services/productStore';
import { uploadToCloudinary } from '../../../../services/cloudinaryService';
import { createVendorProduct, VENDOR_ACCESS_TOKEN_KEY, VENDOR_SHOP_ID_KEY, VendorApiError } from '../../../../services/vendorApi';

const SAMPLE_PRESETS = [
  {
    name: 'Boubou Bazin Vert',
    url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sneakers Street',
    url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Robe Brodée',
    url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sac Cuir Thiès',
    url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
  },
];

const CATEGORIES = [
  'Vêtements',
  'Chaussures',
  'Accessoires',
  'Beauté & Parfums',
  'High-Tech & Téléphonie',
  'Artisanat Local',
  'Maison & Déco',
];

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [condition, setCondition] = useState<'NEUF' | 'TRES_BON_ETAT' | 'BON_ETAT'>('NEUF');
  const [description, setDescription] = useState('');

  // Images state
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Validation & Submit State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [published, setPublished] = useState(false);
  const [awaitingModeration, setAwaitingModeration] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    clearError('images');
    setUploading(true);

    try {
      const remainingSlots = 5 - images.length;
      const filesToUpload = Array.from(files).slice(0, remainingSlots);

      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        if (file.size > 8 * 1024 * 1024) {
          alert(`Le fichier ${file.name} dépasse la taille maximale de 8 Mo.`);
          continue;
        }

        const res = await uploadToCloudinary(file, (p) => setUploadProgress(p));
        setImages((prev) => [...prev, res.url]);
      }
    } catch (err) {
      console.error('Erreur téléversement Cloudinary:', err);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addPresetImage = (url: string) => {
    if (images.length >= 5) {
      alert('Vous avez atteint la limite de 5 photos.');
      return;
    }
    clearError('images');
    setImages((prev) => [...prev, url]);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Veuillez saisir le nom ou titre du produit.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Le titre doit comporter au moins 3 caractères.';
    }

    const numPrice = parseFloat(price);
    if (!price || isNaN(numPrice) || numPrice <= 0) {
      newErrors.price = 'Veuillez définir un prix valide en FCFA (> 0).';
    }

    const numStock = parseInt(stock, 10);
    if (stock === '' || isNaN(numStock) || numStock < 0) {
      newErrors.stock = 'Veuillez renseigner un stock supérieur ou égal à 0.';
    }

    if (images.length === 0) {
      newErrors.images = 'Veuillez ajouter au moins une photo pour votre article.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const token = sessionStorage.getItem(VENDOR_ACCESS_TOKEN_KEY);
    const shopId = sessionStorage.getItem(VENDOR_SHOP_ID_KEY);
    if (!token || !shopId) {
      router.push('/vendeur/connexion');
      return;
    }

    setSubmitting(true);
    setSubmissionError('');

    try {
      const created = await createVendorProduct(token, {
        shopId,
        title: title.trim(),
        category,
        basePrice: parseFloat(price),
        ...(discountPrice ? { discountPrice: parseFloat(discountPrice) } : {}),
        stockQuantity: parseInt(stock, 10),
        condition,
        ...(description.trim() ? { description: description.trim() } : {}),
        imageUrl: images[0],
        additionalImageUrls: images.slice(1),
      });

      addVendorProduct({
        id: created.id,
        title: created.title,
        category: created.category,
        price: Number(created.basePrice),
        discountPrice: created.discountPrice === null ? null : Number(created.discountPrice),
        stock: created.stockQuantity,
        status: created.isPublished ? (created.stockQuantity <= 0 ? 'Rupture' : created.stockQuantity <= 5 ? 'Stock Faible' : 'Actif') : 'En attente de validation',
        condition: created.condition,
        description: created.description ?? undefined,
        image: created.imageUrl ?? images[0],
        additionalImages: created.additionalImageUrls,
        shopId,
      });

      setAwaitingModeration(!created.isPublished);
      setPublished(true);
      setTimeout(() => router.push('/vendeur/produits'), 900);
    } catch (cause: any) {
      const msg = cause?.message && typeof cause.message === 'string'
        ? cause.message
        : 'Impossible d’enregistrer le produit. Vérifie la connexion à la plateforme.';
      setSubmissionError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <VendorPortalShell
      title="Publier un Nouveau Produit"
      subtitle="Les produits des boutiques certifiées sont publiés automatiquement. Les autres attendent la validation du Super Admin."
      breadcrumbs={[
        { label: 'Mes Produits', href: '/vendeur/produits' },
        { label: 'Nouveau Produit' },
      ]}
      actionElement={
        <Link
          href="/vendeur/produits"
          className="text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-100 transition whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Retour au catalogue</span>
          <span className="sm:hidden">Retour</span>
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="max-w-4xl mx-auto space-y-6">
        {submissionError && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">{submissionError}</p>}
        {/* ================= 1. SECTION PHOTOS & CLOUDINARY ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-500" />
                <span>Photos du Produit (Cloudinary)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                La première photo sera la couverture principale affichée sur le marketplace.
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              {images.length}/5 photos
            </span>
          </div>

          {/* Grille d'aperçu des photos */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            {/* Bouton d'upload / Dropzone */}
            {images.length < 5 && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-3 text-center cursor-pointer transition ${
                  errors.images
                    ? 'border-rose-400 bg-rose-50/50 text-rose-600'
                    : 'border-slate-300 hover:border-amber-400 hover:bg-amber-50/30 text-slate-500'
                }`}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-bold text-amber-600">
                      {uploadProgress > 0 ? `${uploadProgress}%` : 'Upload...'}
                    </span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-6 h-6 stroke-[1.8px] mb-1.5 text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-800 leading-tight">
                      Importer
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5">JPG, PNG, WebP</span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            )}

            {/* Aperçus des images téléversées */}
            {images.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group shadow-2xs"
              >
                <img src={img} alt={`aperçu ${idx}`} className="w-full h-full object-cover" />

                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-xs">
                    Principale
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-slate-950/70 hover:bg-rose-600 text-white rounded-full flex items-center justify-center transition shadow-xs"
                  title="Supprimer la photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {errors.images && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.images}</span>
            </div>
          )}

          {/* Raccourcis de photos sénégalaises haute résolution pour test instantané */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Ou ajouter un exemple rapide :</span>
            </span>
            {SAMPLE_PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => addPresetImage(p.url)}
                className="text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-amber-100 hover:text-slate-950 px-2.5 py-1 rounded-lg transition"
              >
                + {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= 2. INFORMATIONS PRINCIPALES ================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" />
            <span>Fiche Produit</span>
          </h3>

          <div className="space-y-4">
            {/* Titre */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Titre du produit *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  clearError('title');
                }}
                placeholder="Ex: Ensemble Boubou Brodé Dakar Chic"
                className={`w-full bg-[#f8f9fa] border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition font-medium ${
                  errors.title
                    ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/20'
                    : 'border-slate-200 focus:border-amber-400'
                }`}
              />
              {errors.title && (
                <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            {/* Catégorie & État */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Catégorie principale *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-400 transition font-medium"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  État du produit
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-400 transition font-medium"
                >
                  <option value="NEUF">Neuf (Jamais porté / Scellé)</option>
                  <option value="TRES_BON_ETAT">Très bon état</option>
                  <option value="BON_ETAT">Bon état</option>
                </select>
              </div>
            </div>

            {/* Prix et Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Prix de vente (FCFA) *
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    clearError('price');
                  }}
                  placeholder="25000"
                  className={`w-full bg-[#f8f9fa] border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:bg-white transition ${
                    errors.price
                      ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/20'
                      : 'border-slate-200 focus:border-amber-400'
                  }`}
                />
                {errors.price && (
                  <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.price}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Prix d&apos;origine / Barré (Optionnel)
                </label>
                <input
                  type="number"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder="Ex: 30000"
                  className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Quantité en stock *
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                    clearError('stock');
                  }}
                  placeholder="10"
                  className={`w-full bg-[#f8f9fa] border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:bg-white transition ${
                    errors.stock
                      ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/20'
                      : 'border-slate-200 focus:border-amber-400'
                  }`}
                />
                {errors.stock && (
                  <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.stock}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Description & Caractéristiques
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez les matières, la coupe, les tailles disponibles ou les consignes d'entretien..."
                className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-amber-400 transition font-medium"
              />
            </div>
          </div>
        </div>

        {/* ================= 3. BOUTON DE SOUMISSION ================= */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <Link
            href="/vendeur/produits"
            className="py-3 px-6 rounded-full border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
          >
            Annuler
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-8 rounded-full shadow-lg shadow-amber-400/20 transition flex items-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Publication en cours...</span>
              </>
            ) : published ? (
              <>
                <Check className="w-4 h-4 stroke-[3px]" />
                <span>{awaitingModeration ? 'Produit soumis pour validation' : 'Article publié avec succès !'}</span>
              </>
            ) : (
              <>
                <span>Enregistrer le produit</span>
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </VendorPortalShell>
  );
}
