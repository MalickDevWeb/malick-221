'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, Heart, Star, MessageCircle, ShoppingBag, Minus, Plus, Check } from 'lucide-react';
import { formatFCFA } from '../../../../services/api';
import { addCartItem } from '../../../../services/order-flow';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const [addedToCart, setAddedToCart] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const images = [
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  ];

  const product = {
    title: 'Veste en jean vintage',
    price: 12000,
    rating: '4.8',
    reviews: '124 avis',
    description: 'Veste en jean vintage, confortable et tendance. Parfaite pour un look casual.',
    badges: ['Homme', 'Vintage', 'Taille : M, L, XL'],
  };

  const whatsappUrl = `https://wa.me/221771234567?text=${encodeURIComponent(
    `Bonjour Malick Buss, je souhaite commander la "${product.title}" (${formatFCFA(product.price)} × ${quantity}). Est-elle disponible ?`
  )}`;

  const handleAddToCart = () => {
    addCartItem({
      id: params.id,
      title: product.title,
      price: product.price,
      quantity,
      image: images[0],
      shop: 'Style & Mode',
    }, false);
    setAddedToCart(true);
    setToastMessage(`✓ ${product.title} ajouté au panier !`);
    setTimeout(() => setAddedToCart(false), 2500);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header Écran 7 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
        </Link>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
            <Heart className="w-4 h-4 text-slate-500" />
          </button>
          <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
            <Share2 className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </header>

      {/* Image Principale & Miniatures */}
      <div className="px-4 space-y-3">
        <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-sm">
          <img
            src={images[selectedImage]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-center gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                selectedImage === idx ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200 opacity-70'
              }`}
            >
              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Informations Produit Écran 7 */}
      <div className="px-4 space-y-3">
        <div>
          <h1 className="text-lg font-black text-slate-900 leading-snug">
            {product.title}
          </h1>
          <div className="text-xl font-extrabold text-slate-900 mt-1">
            {formatFCFA(product.price)}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-400 font-normal">({product.reviews})</span>
        </div>

        {/* Badges horizontaux */}
        <div className="flex flex-wrap gap-2 pt-1">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        <p className="text-xs text-slate-600 leading-relaxed pt-1">
          {product.description}
        </p>

        {/* Sélecteur de quantité `- 1 +` */}
        <div className="pt-2 flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <span className="text-xs font-bold text-slate-700">Quantité</span>
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-slate-600 hover:text-slate-900"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-slate-900 w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-slate-600 hover:text-slate-900"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Boutons d'Action Écran 7 */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98] ${
              addedToCart
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {addedToCart ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Ajouté au panier ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Ajouter au panier</span>
              </>
            )}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white hover:bg-slate-50 text-emerald-700 border border-emerald-600 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Commander sur WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Toast de confirmation */}
      {toastMessage && (
        <div className="fixed bottom-6 left-4 right-4 z-50 max-w-md mx-auto bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="truncate mr-2">{toastMessage}</span>
          <Link
            href="/panier"
            className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1"
          >
            Voir panier →
          </Link>
        </div>
      )}
    </div>
  );
}

