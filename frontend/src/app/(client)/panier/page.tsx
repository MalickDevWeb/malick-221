'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, Minus, Plus, MessageCircle, ArrowRight } from 'lucide-react';
import { formatFCFA } from '../../../services/api';

export default function CartPage() {
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'Veste en jean vintage',
      price: 12000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: '2',
      title: 'Hoodie Nike',
      price: 15000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: '3',
      title: 'Sneakers',
      price: 18000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80',
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 3000 : 0;
  const total = subtotal + shipping;

  const whatsappMessage = `Bonjour Malick Buss, voici mon panier :\n${items
    .map((item) => `- ${item.title} (x${item.quantity}) : ${formatFCFA(item.price * item.quantity)}`)
    .join('\n')}\nLivraison : ${formatFCFA(shipping)}\nTotal : ${formatFCFA(total)}\nJe souhaite finaliser ma commande.`;

  return (
    <div className="space-y-4 pb-8">
      {/* Header Écran 8 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Mon panier</h1>
        </Link>
        <span className="text-xs text-slate-400 font-medium">{items.length} articles</span>
      </header>

      {/* Liste des Articles Écran 8 */}
      <div className="px-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex items-center gap-3"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-xs text-slate-900 truncate">
                {item.title}
              </h2>
              <span className="font-bold text-xs text-slate-900 block mt-0.5">
                {formatFCFA(item.price)}
              </span>

              <div className="flex items-center gap-2.5 mt-2">
                <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-slate-900 w-3 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-slate-600 hover:text-slate-900"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-slate-400 hover:text-rose-500 p-2"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Récapitulatif Total & Boutons d'Action Écran 8 */}
      <div className="px-4 pt-2">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3">
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Sous-total</span>
              <span className="font-semibold text-slate-900">{formatFCFA(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Livraison estimée</span>
              <span className="font-semibold text-slate-900">{formatFCFA(shipping)}</span>
            </div>
            <div className="border-t border-slate-100 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
              <span>Total</span>
              <span className="text-emerald-600 font-black">{formatFCFA(total)}</span>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <Link
              href="/checkout"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98]"
            >
              <span>Valider la commande (Écran 9)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/221771234567?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Commander sur WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
