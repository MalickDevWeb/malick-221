'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  X,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageCircle,
  ShoppingBag,
} from 'lucide-react';
import { formatFCFA } from '../../services/api';
import { CartItem, getCartItems, saveCartItems } from '../../services/order-flow';
import { resolveShopContact } from '../../services/vendorProfileStore';

export function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);

  // Synchroniser les articles à l'ouverture et lors de toute mise à jour du panier
  const refreshItems = () => {
    setItems(getCartItems());
  };

  useEffect(() => {
    refreshItems();
  }, [isOpen]);

  useEffect(() => {
    const handleCartUpdate = () => {
      refreshItems();
    };
    window.addEventListener('storage', handleCartUpdate);
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => {
      window.removeEventListener('storage', handleCartUpdate);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  // Bloquer le scroll d'arrière-plan quand le tiroir est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateQuantity = (id: string, delta: number) => {
    const current = getCartItems();
    const nextItems = current.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    saveCartItems(nextItems);
    setItems(nextItems);
  };

  const removeItem = (id: string) => {
    const current = getCartItems();
    const nextItems = current.filter((item) => item.id !== id);
    saveCartItems(nextItems);
    setItems(nextItems);
  };

  const totalArticles = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 3000 : 0;
  const total = subtotal + shipping;

  const shopContact = resolveShopContact(items[0]?.shop);

  const whatsappMessage = encodeURIComponent(
    `Bonjour ${shopContact.name} 🇸🇳, voici mon panier sur Malick Buss :\n${items
      .map((item) => `• ${item.title} (x${item.quantity}) : ${formatFCFA(item.price * item.quantity)}`)
      .join('\n')}\n\nSous-total : ${formatFCFA(subtotal)}\nLivraison express Dakar : ${formatFCFA(
      shipping
    )}\nTotal : ${formatFCFA(total)}\n\nJe souhaite finaliser ma commande avec vous.`
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* 1. Backdrop sombre avec flou */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 2. Tiroir latéral coulissant (Slide-over) */}
      <div
        className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header du Panier */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xs">
              <ShoppingCart className="w-4 h-4 stroke-[2.2px]" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-sm">Mon Panier</h2>
              <span className="text-[11px] font-bold text-slate-500">
                {totalArticles} article{totalArticles > 1 ? 's' : ''} au total
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200/80 text-slate-400 hover:text-slate-700 flex items-center justify-center transition hover:bg-slate-100 shadow-2xs cursor-pointer"
            aria-label="Fermer le panier"
          >
            <X className="w-4 h-4 stroke-[2.5px]" />
          </button>
        </div>

        {/* Corps : Liste des Articles */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-500 shadow-inner">
                <ShoppingBag className="w-8 h-8 stroke-[1.8px]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">Votre panier est vide</h3>
                <p className="text-xs text-slate-500 max-w-[220px] leading-relaxed">
                  Découvrez nos boutiques vérifiées et faites vos achats à Dakar.
                </p>
              </div>
              <Link
                href="/boutiques"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
              >
                <span>Explorer les boutiques</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="group bg-slate-50 hover:bg-white border border-slate-200/70 hover:border-slate-300 rounded-2xl p-3 flex items-center gap-3.5 transition-all shadow-2xs"
              >
                {/* Image du produit */}
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-100 overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Infos du produit */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.shop && (
                    <span className="text-[10px] font-semibold text-slate-400 block truncate">
                      {item.shop}
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-slate-900">
                      {formatFCFA(item.price * item.quantity)}
                    </span>

                    {/* Compteur de quantité */}
                    <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-lg px-2 py-1 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-slate-500 hover:text-slate-900 transition cursor-pointer"
                      >
                        <Minus className="w-3 h-3 stroke-[2.5px]" />
                      </button>
                      <span className="text-xs font-bold text-slate-900 min-w-[14px] text-center select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-slate-500 hover:text-slate-900 transition cursor-pointer"
                      >
                        <Plus className="w-3 h-3 stroke-[2.5px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer : Récapitulatif et Boutons d'Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/90 space-y-3.5">
            {/* Lignes de calcul */}
            <div className="space-y-1.5 text-xs">
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
              <div className="border-t border-slate-200/80 pt-2 flex justify-between items-baseline">
                <span className="font-black text-sm text-slate-900">Total TTC</span>
                <span className="font-black text-base text-emerald-600">
                  {formatFCFA(total)}
                </span>
              </div>
            </div>

            {/* Boutons d'Action */}
            <div className="space-y-2">
              {/* Valider la commande */}
              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-black text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition cursor-pointer"
              >
                <span>Valider ma commande</span>
                <ArrowRight className="w-4 h-4 stroke-[2.8px]" />
              </Link>

              {/* Commander sur WhatsApp */}
              <a
                href={`https://wa.me/${shopContact.phone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-500/30 text-emerald-800 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-emerald-600" />
                <span>Commander sur WhatsApp ({shopContact.name})</span>
              </a>
            </div>

            {/* Badges de réassurance */}
            <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Paiements Wave & OM</span>
              </span>
              <span>•</span>
              <span>Cash à la livraison</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
