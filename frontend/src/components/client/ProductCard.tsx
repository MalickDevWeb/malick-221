import Link from 'next/link';
import { Product, formatFCFA } from '../../services/api';
import { MessageCircle, ShoppingBag } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const discount = product.discountPrice ? Number(product.discountPrice) : null;
  const base = Number(product.basePrice);

  const conditionLabels: Record<string, { label: string; color: string }> = {
    NEUF: { label: 'Neuf', color: 'bg-emerald-100 text-emerald-800' },
    TRES_BON_ETAT: { label: 'Très bon état', color: 'bg-blue-100 text-blue-800' },
    BON_ETAT: { label: 'Bon état', color: 'bg-amber-100 text-amber-800' },
  };

  const conditionInfo = conditionLabels[product.condition] || { label: product.condition, color: 'bg-slate-100 text-slate-800' };

  // Message WhatsApp pré-rempli selon les spécifications
  const whatsappUrl = `https://wa.me/221771234567?text=${encodeURIComponent(
    `Bonjour, je suis intéressé par l'article "${product.title}" sur Malick Buss (Réf: ${product.id}). Est-il toujours disponible ?`
  )}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="relative aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
        <img
          src={`https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80`}
          alt={product.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${conditionInfo.color}`}>
            {conditionInfo.label}
          </span>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between gap-2">
        <div>
          {product.shop && (
            <Link
              href={`/boutiques/${product.shop.slug}`}
              className="text-[11px] text-slate-500 hover:text-emerald-600 block truncate"
            >
              {product.shop.name}
            </Link>
          )}
          <h3 className="font-semibold text-xs text-slate-900 line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </div>

        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-sm text-slate-900">
              {formatFCFA(discount || base)}
            </span>
            {discount && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatFCFA(base)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5 mt-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-1.5 rounded-lg text-[11px] font-medium transition"
              title="Discuter sur WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              className="flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white py-1.5 rounded-lg text-[11px] font-medium transition shadow-sm"
              title="Ajouter au panier"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Panier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
