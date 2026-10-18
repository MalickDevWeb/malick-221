'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Trash2,
  Minus,
  Plus,
  MessageCircle,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { formatFCFA } from '../../../services/api';
import { CartItem, getCartItems, saveCartItems } from '../../../services/order-flow';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) => {
      const nextItems = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
      saveCartItems(nextItems);
      window.dispatchEvent(new Event('cart-updated'));
      return nextItems;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const nextItems = prev.filter((item) => item.id !== id);
      saveCartItems(nextItems);
      window.dispatchEvent(new Event('cart-updated'));
      return nextItems;
    });
  };

  const totalArticles = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 3000 : 0;
  const total = subtotal + shipping;

  const whatsappMessage = encodeURIComponent(
    `Bonjour Malick Buss 🇸🇳, voici mon panier :\n${items
      .map((item) => `• ${item.title} (x${item.quantity}) : ${formatFCFA(item.price * item.quantity)}`)
      .join('\n')}\n\nSous-total : ${formatFCFA(subtotal)}\nLivraison express Dakar : ${formatFCFA(
      shipping
    )}\nTotal : ${formatFCFA(total)}\n\nJe souhaite finaliser ma commande.`
  );

  return (
    <div className="min-h-[80vh] bg-slate-50/60 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Barre de retour et fil d'Ariane */}
        <div className="flex items-center justify-between">
          <Link
            href="/boutiques"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-amber-600 transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Continuer mes achats</span>
          </Link>

          <span className="text-xs font-semibold text-slate-500">
            {totalArticles} article{totalArticles > 1 ? 's' : ''} dans le panier
          </span>
        </div>

        {/* Titre de page */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Mon Panier d'Achats
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Vérifiez vos articles avant de procéder au paiement sécurisé ou par WhatsApp.
          </p>
        </div>

        {/* Contenu Panier */}
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4 my-8">
            <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200/60 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10 stroke-[1.8px]" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-black text-slate-900">Votre panier est vide</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Parcourez nos boutiques vérifiées pour découvrir des milliers d'articles authentiques à Dakar.
              </p>
            </div>
            <Link
              href="/boutiques"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl transition shadow-md shadow-amber-500/20"
            >
              <span>Découvrir les boutiques</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Colonne Gauche : Liste des Articles */}
            <div className="lg:col-span-8 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex items-center gap-4 shadow-xs transition hover:border-slate-300"
                >
                  {/* Photo de l'article */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 border border-slate-100 overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Détails */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="font-bold text-sm text-slate-900 line-clamp-1">
                          {item.title}
                        </h2>
                        {item.shop && (
                          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                            {item.shop}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                        title="Supprimer l'article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-black text-sm sm:text-base text-slate-900">
                        {formatFCFA(item.price * item.quantity)}
                      </span>

                      {/* Contrôle de quantité */}
                      <div className="flex items-center gap-2.5 bg-slate-100 border border-slate-200/80 px-2.5 py-1 rounded-xl shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-slate-600 hover:text-slate-900 transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5px]" />
                        </button>
                        <span className="text-xs font-bold text-slate-900 min-w-[16px] text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-slate-600 hover:text-slate-900 transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Colonne Droite : Récapitulatif de Commande */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5 sticky top-24">
              <h2 className="text-base font-black text-slate-900 tracking-tight border-b border-slate-100 pb-3">
                Récapitulatif
              </h2>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Sous-total</span>
                  <span className="font-bold text-slate-900">{formatFCFA(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-sky-600" />
                    <span>Livraison express (Dakar)</span>
                  </span>
                  <span className="font-bold text-slate-900">{formatFCFA(shipping)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                  <span className="font-black text-sm text-slate-900">Total à payer</span>
                  <span className="font-black text-xl text-emerald-600">
                    {formatFCFA(total)}
                  </span>
                </div>
              </div>

              {/* Boutons d'Action */}
              <div className="space-y-2.5 pt-2">
                <Link
                  href="/checkout"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-black text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition cursor-pointer"
                >
                  <span>Passer la commande</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.8px]" />
                </Link>

                <a
                  href={`https://wa.me/221770000000?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-500/30 text-emerald-800 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-emerald-600" />
                  <span>Commander sur WhatsApp</span>
                </a>
              </div>

              {/* Badges de Réassurance */}
              <div className="border-t border-slate-100 pt-4 space-y-2 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Paiements sécurisés Wave, Orange Money & Cash</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Livraison express à domicile à Dakar</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Satisfait ou remboursé sous 48h</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
