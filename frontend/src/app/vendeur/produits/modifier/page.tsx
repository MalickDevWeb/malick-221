'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Camera,
  Check,
  Upload,
  X,
  AlertCircle,
  Sparkles,
  Trash2,
  FileText,
  Save,
  Tag,
  DollarSign,
  Package,
} from 'lucide-react';
import { VendorPortalShell } from '../../../../components/layout/VendorPortalShell';
import {
  getVendorProductById,
  updateVendorProduct,
  deleteVendorProduct,
  VendorProduct,
} from '../../../../services/productStore';
import { uploadToCloudinary } from '../../../../services/cloudinaryService';

const CATEGORIES = [
  'Vêtements',
  'Chaussures',
  'Accessoires',
  'Beauté & Parfums',
  'High-Tech & Téléphonie',
  'Artisanat Local',
  'Maison & Déco',
];

function EditProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id') || '';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<VendorProduct | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [stock, setStock] = useState('');
  const [condition, setCondition] = useState<'NEUF' | 'TRES_BON_ETAT' | 'BON_ETAT'>('NEUF');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<VendorProduct['status']>('Actif');

  // Images state
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Submit / Delete state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const found = getVendorProductById(productId);
    if (found) {
      setProduct(found);
      setTitle(found.title);
      setCategory(found.category);
      setPrice(found.price.toString());
      setDiscountPrice(found.discountPrice ? found.discountPrice.toString() : '');
      setStock(found.stock.toString());
      setCondition(found.condition || 'NEUF');
      setDescription(found.description || '');
      setStatus(found.status);
      const allImgs = [found.image, ...(found.additionalImages || [])].filter(Boolean);
      setImages(allImgs);
    }
    setLoading(false);
  }, [productId]);

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

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Veuillez saisir le titre du produit.';
    }

    const numPrice = parseFloat(price);
    if (!price || isNaN(numPrice) || numPrice <= 0) {
      newErrors.price = 'Veuillez définir un prix valide en FCFA.';
    }

    const numStock = parseInt(stock, 10);
    if (stock === '' || isNaN(numStock) || numStock < 0) {
      newErrors.stock = 'Veuillez renseigner un stock supérieur ou égal à 0.';
    }

    if (images.length === 0) {
      newErrors.images = 'Veuillez conserver au moins une photo.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !product) return;

    setSubmitting(true);

    updateVendorProduct(product.id, {
      title: title.trim(),
      category,
      price: parseFloat(price),
      discountPrice: discountPrice ? parseFloat(discountPrice) : null,
      stock: parseInt(stock, 10),
      condition,
      description: description.trim() || undefined,
      image: images[0],
      additionalImages: images.slice(1),
      status,
    });

    setSaved(true);
    setTimeout(() => {
      router.push('/vendeur/produits');
    }, 800);
  };

  const handleDelete = () => {
    if (!product) return;
    deleteVendorProduct(product.id);
    router.push('/vendeur/produits');
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-500 font-semibold">Chargement de la fiche article...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-base text-slate-800">Article introuvable</h3>
        <p className="text-xs text-slate-500">
          Ce produit n&apos;existe plus ou a été retiré de votre catalogue.
        </p>
        <Link
          href="/vendeur/produits"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au catalogue</span>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} noValidate className="max-w-4xl mx-auto space-y-6">
      {/* ================= 1. PHOTOS & CLOUDINARY ================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-500" />
              <span>Photos de l&apos;Article</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Gérez les photos hébergées. La première est la vignette principale.
            </p>
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            {images.length}/5 photos
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          {images.length < 5 && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50/30 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition text-slate-500"
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] font-bold text-amber-600">Upload...</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 stroke-[1.8px] mb-1 text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-800">+ Ajouter</span>
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
      </div>

      {/* ================= 2. FICHE TECHNIQUE ================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-500" />
          <span>Informations & Tarification</span>
        </h3>

        <div className="space-y-4">
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
              className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:bg-white focus:border-amber-400 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Catégorie *
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
                Statut de vente
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-400 transition font-medium"
              >
                <option value="Actif">Actif (En vente)</option>
                <option value="Désactivé">Désactivé (Masqué)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                État de l&apos;article
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-400 transition font-medium"
              >
                <option value="NEUF">Neuf</option>
                <option value="TRES_BON_ETAT">Très bon état</option>
                <option value="BON_ETAT">Bon état</option>
              </select>
            </div>
          </div>

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
                className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:bg-white focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Prix d&apos;origine / Barré
              </label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Stock disponible *
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                  clearError('stock');
                }}
                className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:bg-white focus:border-amber-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-400 transition font-medium"
            />
          </div>
        </div>
      </div>

      {/* ================= 3. ZONE DANGER / SUPPRESSION ================= */}
      <div className="bg-rose-50/60 border border-rose-200/80 rounded-3xl p-5 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-rose-900">Zone Critique</h4>
          <p className="text-[11px] text-rose-700 mt-0.5">
            Supprimer définitivement cet article de votre vitrine et de votre inventaire.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 bg-white border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white rounded-full font-bold text-xs transition shadow-2xs flex items-center gap-1.5 shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Supprimer</span>
        </button>
      </div>

      {/* ================= 4. ACTIONS DU BAS ================= */}
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
              <span>Enregistrement...</span>
            </>
          ) : saved ? (
            <>
              <Check className="w-4 h-4 stroke-[3px]" />
              <span>Modifications sauvegardées !</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Enregistrer les modifications</span>
            </>
          )}
        </button>
      </div>

      {/* Modale de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 stroke-[2px]" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-slate-900">Confirmer la suppression ?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Cette action retirera définitivement <strong className="text-slate-800">« {title} »</strong>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-2.5 px-4 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition shadow-xs"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default function EditProductPage() {
  return (
    <VendorPortalShell
      title="Modifier l'Article"
      subtitle="Ajustez les prix, le stock, la description ou mettez à jour les photos Cloudinary."
      breadcrumbs={[
        { label: 'Mes Produits', href: '/vendeur/produits' },
        { label: 'Modifier' },
      ]}
      actionElement={
        <Link
          href="/vendeur/produits"
          className="text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-100 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au catalogue</span>
        </Link>
      }
    >
      <Suspense fallback={<div className="py-20 text-center text-xs text-slate-400">Chargement...</div>}>
        <EditProductForm />
      </Suspense>
    </VendorPortalShell>
  );
}
