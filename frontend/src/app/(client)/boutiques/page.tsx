import Link from 'next/link';
import { getShops } from '../../../services/api';
import { Store, ShieldCheck, ArrowRight } from 'lucide-react';

export default async function ShopsListPage() {
  const shops = await getShops();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Store className="w-5 h-5 text-emerald-600" />
        <h1 className="text-lg font-bold text-slate-900">
          Toutes les boutiques
        </h1>
      </div>
      <p className="text-xs text-slate-600">
        Découvrez les meilleurs vendeurs indépendants de Dakar partenaires de Malick Buss.
      </p>

      <div className="space-y-3">
        {shops.map((shop) => (
          <Link
            key={shop.id}
            href={`/boutiques/${shop.slug}`}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
              <img
                src={shop.logoUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=200&q=80'}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-sm text-slate-900 flex items-center gap-1 truncate">
                {shop.name}
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              </h2>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                {shop.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {shop._count?.products || 0} articles
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-0.5">
                  Visiter <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
