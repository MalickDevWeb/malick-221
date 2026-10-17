import { notFound } from 'next/navigation';
import { getShopBySlug } from '../../../../services/api';
import { ProductCard } from '../../../../components/client/ProductCard';
import { ShieldCheck, Phone, MapPin } from 'lucide-react';

export default async function ShopDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const shop = await getShopBySlug(params.slug);

  if (!shop) {
    notFound();
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Couverture & Header Boutique */}
      <div className="relative">
        <div className="h-28 w-full bg-slate-200 overflow-hidden">
          <img
            src={shop.bannerUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-4 -mt-10 flex items-end gap-3">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 border-white shadow-md flex-shrink-0">
            <img
              src={shop.logoUrl || 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80'}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 pb-1">
            <h1 className="font-extrabold text-base text-slate-900 flex items-center gap-1 leading-tight">
              {shop.name}
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            </h1>
            <span className="text-[11px] text-emerald-600 font-medium">Boutique Partenaire Agréée</span>
          </div>
        </div>
      </div>

      {/* Description & Infos pratiques */}
      <div className="px-4 space-y-2">
        <p className="text-xs text-slate-600 leading-relaxed">
          {shop.description}
        </p>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            Dakar, Sénégal
          </span>
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            Wave & OM acceptés
          </span>
        </div>
      </div>

      {/* Catalogue de la boutique */}
      <div className="px-4 pt-2">
        <div className="border-t border-slate-200/60 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm text-slate-900">
              Articles de la boutique
            </h2>
            <span className="text-xs text-slate-500">
              {shop.products.length} articles
            </span>
          </div>

          {shop.products.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
              Aucun article publié pour le moment dans cette boutique.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {shop.products.map((product) => (
                <ProductCard key={product.id} product={{ ...product, shop }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
